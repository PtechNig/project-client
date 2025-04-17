// app/login/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
             <div className="fixed inset-0 -z-10">
                <Image
                  src="/onboarding.jpeg" 
                  alt="Background"
                  fill
                  className="object-cover blur-md"
                  quality={100}
                  priority
                />
                 <div className="absolute inset-0 bg-[#0063A4]/50"></div>
                </div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-[#0063A4] mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00426D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00426D]"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-md transition duration-500 cursor-pointer bg-[#0063A4] hover:bg-[#6cc4ff] "
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-[#FF0B80] font-medium">Register</Link>
        </p>

        <p className="text-center text-sm mt-4">
          <Link href="#" className="text-[#0063A4] font-medium">Forgot Password</Link>
        </p>
      </div>
    </section>
  );
}
