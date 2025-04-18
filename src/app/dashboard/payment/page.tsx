'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FiCheckCircle, FiCreditCard, FiDownload } from 'react-icons/fi';

// Move stripePromise outside the component to avoid recreating it
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Certificate = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
};

const CertificatePaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    // Simulate loading certificate data
    // In a real app, you might fetch this from an API
    const loadCertificate = async () => {
      try {
        // Replace with actual data fetching if needed
        const certData: Certificate = {
          id: 'cert_123',
          name: 'Python Fundamentals Certification',
          description: 'Certificate of completion for Python Fundamentals course',
          price: 49.99,
          currency: 'USD'
        };
        setCertificate(certData);
      } catch (error) {
        console.error('Error loading certificate:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Certificate Not Available</h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load the certificate information. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Certificate Payment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CertificateDetails certificate={certificate} />
        
        <div className="bg-white p-6 rounded-lg shadow">
          <Elements stripe={stripePromise}>
            <PaymentForm certificate={certificate} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

const CertificateDetails = ({ certificate }: { certificate: Certificate }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">{certificate.name}</h2>
    <p className="text-gray-600 mb-4">{certificate.description}</p>
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Certificate Fee:</span>
        <span className="font-bold">${certificate.price.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total:</span>
        <span className="text-xl font-bold">${certificate.price.toFixed(2)}</span>
      </div>
    </div>
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium text-blue-800 mb-2">What you&apos;ll get:</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" />
          <span>Official digital certificate</span>
        </li>
        <li className="flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" />
          <span>Printable PDF version</span>
        </li>
        <li className="flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" />
          <span>Verification URL</span>
        </li>
      </ul>
    </div>
  </div>
);

const PaymentForm = ({ certificate }: { certificate: Certificate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(certificate.price * 100),
          currency: certificate.currency,
          certificateId: certificate.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        setPaymentSuccess(true);
        await fetch('/api/record-certificate-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            certificateId: certificate.id,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100
          }),
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <FiCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
        <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
        <p className="mb-6">Your certificate is now available for download.</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center mx-auto"
          onClick={() => {
            window.location.href = `/api/download-certificate?certId=${certificate.id}`;
          }}
        >
          <FiDownload className="mr-2" />
          Download Certificate
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiCreditCard className="mr-2" />
        Payment Details
      </h2>
      
      <div className="mb-6">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {paymentError && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{paymentError}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay $${certificate.price.toFixed(2)}`}
      </button>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Your payment is secure and encrypted.</p>
      </div>
    </form>
  );
};

export default CertificatePaymentPage;