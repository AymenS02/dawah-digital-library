'use client';

import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizSaveWarning, setQuizSaveWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          gender: formData.gender
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Check if there are pending quiz results to save
      const pendingQuizResults = sessionStorage.getItem('pendingQuizResults');
      if (pendingQuizResults) {
        try {
          const quizData = JSON.parse(pendingQuizResults);
          // Save quiz results with the new user's token
          const quizResponse = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify({
              ...quizData,
              isAnonymous: false // Now it's linked to the user
            })
          });
          
          if (!quizResponse.ok) {
            setQuizSaveWarning(true);
            console.error('Failed to save quiz results');
          }
          
          // Clear the pending results
          sessionStorage.removeItem('pendingQuizResults');
        } catch (quizError) {
          console.error('Error saving quiz results:', quizError);
          setQuizSaveWarning(true);
          // Don't block registration if quiz save fails
        }
      }

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">CREATE ACCOUNT</h1>
          <p className="text-foreground/70">Join our community today</p>
        </div>

        {/* Registration Form */}
        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {quizSaveWarning && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-5 h-5" />
              <span>Account created successfully, but there was an issue saving your quiz results. You can retake the quiz anytime.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">First Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Last Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold mb-2">Gender (Optional)</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-6 py-4 bg-foreground/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-semibold mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-foreground px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span>CREATING ACCOUNT...</span>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>CREATE ACCOUNT</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-foreground/70">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
