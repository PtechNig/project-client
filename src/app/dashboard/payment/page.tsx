// app/dashboard/certificates/payment/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FiCheckCircle, FiCreditCard, FiDownload } from 'react-icons/fi';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CertificatePaymentPage = () => {
  const certificate = {
    id: 'cert_123',
    name: 'Python Fundamentals Certification',
    description: 'Certificate of completion for Python Fundamentals course',
    price: 49.99,
    currency: 'USD'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Certificate Payment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certificate Details */}
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
        
        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <Elements stripe={stripePromise}>
            <PaymentForm certificate={certificate} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = ({ certificate }: { certificate: any }) => {
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
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(certificate.price * 100), // Convert to cents
          currency: certificate.currency,
          certificateId: certificate.id
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        // Record the successful payment in your database
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
    } catch (err) {
      setPaymentError('An error occurred during payment processing');
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
            // Generate and download certificate
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