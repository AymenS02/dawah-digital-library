'use client';

import React, { useState } from 'react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">WELCOME BACK</h1>
          <p className="text-foreground/70">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-foreground px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span>SIGNING IN...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>SIGN IN</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-foreground/70">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary hover:underline font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
