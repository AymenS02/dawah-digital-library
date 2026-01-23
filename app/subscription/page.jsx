'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function SubscriptionPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 1) {
      setMessage({ type: 'error', text: 'Please enter a valid amount (minimum $1)' });
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });
      
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          notes
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setAmount('');
        setNotes('');
        // Refresh subscription status
        fetchSubscriptionStatus();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
      setMessage({ type: 'error', text: 'Failed to submit subscription. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'expired':
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Subscription Service</h1>
        
        <p className="text-lg text-foreground/80 mb-8">
          Support the Dawah Digital Library with a monthly subscription. Choose your contribution amount and help us maintain and expand our resources.
        </p>

        {/* Current Subscription Status */}
        {loading ? (
          <div className="bg-foreground/5 rounded-lg p-6 mb-8">
            <p className="text-foreground/70">Loading subscription status...</p>
          </div>
        ) : subscription ? (
          <div className="bg-foreground/5 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(subscription.status)}
              <h2 className="text-2xl font-bold">Current Subscription</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Amount</p>
                <p className="text-xl font-semibold">${subscription.amount}/month</p>
              </div>
              
              <div>
                <p className="text-sm text-foreground/70 mb-1">Status</p>
                <p className="text-xl font-semibold capitalize">{subscription.status}</p>
              </div>
              
              {subscription.startDate && (
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Start Date</p>
                  <p className="text-lg">{formatDate(subscription.startDate)}</p>
                </div>
              )}
              
              {subscription.endDate && (
                <div>
                  <p className="text-sm text-foreground/70 mb-1">End Date</p>
                  <p className="text-lg">{formatDate(subscription.endDate)}</p>
                </div>
              )}
            </div>

            {subscription.notes && (
              <div className="mt-4 p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-foreground/70 mb-1">Notes</p>
                <p className="text-foreground/90">{subscription.notes}</p>
              </div>
            )}
          </div>
        ) : null}

        {/* Subscription Form */}
        {!subscription || subscription.status === 'expired' || subscription.status === 'cancelled' ? (
          <div className="bg-foreground/5 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Choose Your Subscription Amount</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold mb-2">
                  Monthly Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <p className="text-sm text-foreground/60 mt-2">Minimum: $1.00</p>
              </div>

              {/* Suggested Amounts */}
              <div>
                <p className="text-sm font-semibold mb-3">Suggested amounts:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[5, 10, 25, 50].map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      type="button"
                      onClick={() => setAmount(suggestedAmount.toString())}
                      className="px-4 py-3 bg-primary/20 hover:bg-primary/30 rounded-lg font-semibold transition-colors"
                    >
                      ${suggestedAmount}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  placeholder="Any additional information or special requests..."
                  className="w-full px-4 py-3 bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:outline-none resize-none"
                />
              </div>

              {message.text && (
                <div className={`p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 text-green-700 dark:text-green-300' 
                    : 'bg-red-500/20 text-red-700 dark:text-red-300'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-primary text-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Subscription Request'}
              </button>
            </form>
          </div>
        ) : subscription.status === 'pending' ? (
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg p-6 text-center">
            <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Subscription Pending</h3>
            <p className="text-foreground/70">
              Your subscription request is being reviewed by an administrator. You&apos;ll be notified once it&apos;s approved.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
