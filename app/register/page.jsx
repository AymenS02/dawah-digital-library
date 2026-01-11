'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    gender: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizSaveWarning, setQuizSaveWarning] = useState(false);

  /* ---------- Gender dropdown ---------- */
  const [genderOpen, setGenderOpen] = useState(false);
  const genderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genderRef.current && !genderRef.current.contains(e.target)) {
        setGenderOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const pendingQuizResults = sessionStorage.getItem('pendingQuizResults');
      if (pendingQuizResults) {
        try {
          await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({
              ...JSON.parse(pendingQuizResults),
              isAnonymous: false,
            }),
          });
          sessionStorage.removeItem('pendingQuizResults');
        } catch {
          setQuizSaveWarning(true);
        }
      }

      router.push('/');
    } catch {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            CREATE ACCOUNT
          </h1>
          <p className="text-foreground/70">Join our community today</p>
        </div>

        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {quizSaveWarning && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-5 h-5" />
              Quiz results couldn’t be saved. You can retake it anytime.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    required
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Gender (Custom Dropdown) */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Gender (Optional)
              </label>

              <div ref={genderRef} className="relative">
                <button
                  type="button"
                  onClick={() => setGenderOpen(!genderOpen)}
                  className="w-full px-6 py-4 bg-foreground/10 rounded-lg text-left focus:ring-2 focus:ring-primary"
                >
                  {formData.gender
                    ? formData.gender.charAt(0).toUpperCase() +
                      formData.gender.slice(1)
                    : 'Prefer not to say'}
                </button>

                {genderOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-background border border-foreground/10 rounded-lg shadow-xl overflow-hidden">
                    {[
                      { label: 'Prefer not to say', value: '' },
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Other', value: 'other' },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, gender: opt.value });
                          setGenderOpen(false);
                        }}
                        className="w-full px-6 py-3 text-left hover:bg-primary/10"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    required
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    required
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-6 py-4 bg-foreground/10 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary py-4 rounded-lg font-bold transition hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
