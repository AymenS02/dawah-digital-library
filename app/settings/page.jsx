'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Mail, Phone, Trash2, AlertCircle, CheckCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [emailForm, setEmailForm] = useState({ newEmail: '' });
  const [phoneForm, setPhoneForm] = useState({ newPhone: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      router.push('/login');
      return;
    }
    
    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/account/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update email');
        setLoading(false);
        return;
      }

      // Update local storage
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccess('Email updated successfully!');
      setEmailForm({ newEmail: '' });
      setLoading(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/account/update-phone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(phoneForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update phone number');
        setLoading(false);
        return;
      }

      // Update local storage
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccess('Phone number updated successfully!');
      setPhoneForm({ newPhone: '' });
      setLoading(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to delete account');
        setLoading(false);
        return;
      }

      // Clear local storage and redirect to home
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">ACCOUNT SETTINGS</h1>
          <p className="text-foreground/70">Manage your account information</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        {/* User Info Card */}
        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">YOUR INFORMATION</h2>
          <div className="space-y-3 text-foreground/80">
            <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || 'Not provided'}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            {user.gender && <p><span className="font-semibold">Gender:</span> {user.gender}</p>}
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 bg-foreground/10 hover:bg-foreground/20 text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            LOGOUT
          </button>
        </div>

        {/* Update Email */}
        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            UPDATE EMAIL
          </h2>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">New Email Address</label>
              <input
                type="email"
                placeholder="new.email@example.com"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ newEmail: e.target.value })}
                required
                className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'UPDATING...' : 'UPDATE EMAIL'}
            </button>
          </form>
        </div>

        {/* Update Phone */}
        <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-primary" />
            UPDATE PHONE NUMBER
          </h2>
          <form onSubmit={handleUpdatePhone} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">New Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (234) 567-890"
                value={phoneForm.newPhone}
                onChange={(e) => setPhoneForm({ newPhone: e.target.value })}
                required
                className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'UPDATING...' : 'UPDATE PHONE'}
            </button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-500">
            <Trash2 className="w-6 h-6" />
            DANGER ZONE
          </h2>
          <p className="text-foreground/70 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              DELETE ACCOUNT
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-500 font-semibold">Are you absolutely sure?</p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'DELETING...' : 'YES, DELETE MY ACCOUNT'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-foreground/10 hover:bg-foreground/20 text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
