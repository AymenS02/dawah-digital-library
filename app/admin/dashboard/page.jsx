'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Ban, ClipboardList, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { quizQuestions } from '../../data/quizData';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [responding, setResponding] = useState(null);
  const [view, setView] = useState('requests'); // 'requests', 'quiz', or 'subscriptions'
  const [quizResponses, setQuizResponses] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [reminders, setReminders] = useState({ subscriptions: [], urgentCount: 0, totalCount: 0 });
  const [expandedSubscription, setExpandedSubscription] = useState(null);
  const [editingSubscription, setEditingSubscription] = useState(null);

  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    setUser(userData);
    fetchRequests();
    fetchQuizResponses();
    fetchSubscriptions();
    fetchReminders();
  }, [filter, subscriptionFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/access-request/list?status=${filter}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
      } else {
        console.error('Failed to fetch requests');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizResponses = async () => {
    try {
      setQuizLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/quiz/anonymous', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuizResponses(data.responses);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Failed to fetch quiz responses:', errorData.message);
        alert(`Failed to fetch quiz responses: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching quiz responses:', error);
      alert('Network error: Unable to fetch quiz responses. Please check your connection.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleRespond = async (requestId, action) => {
    try {
      setResponding(requestId);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/access-request/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requestId, action })
      });

      if (response.ok) {
        // Refresh the list
        fetchRequests();
        alert(`Request ${action} successfully`);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to respond to request');
      }
    } catch (error) {
      console.error('Error responding to request:', error);
      alert('Failed to respond to request');
    } finally {
      setResponding(null);
    }
  };

  const handleRevoke = async (requestId, action) => {
    const actionText = action === 'suspended' ? 'suspend' : 'delete';
    if (!confirm(`Are you sure you want to ${actionText} this approved request? The user will lose their access.`)) {
      return;
    }

    try {
      setResponding(requestId);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/access-request/revoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requestId, action })
      });

      if (response.ok) {
        // Refresh the list
        fetchRequests();
        const actionMessage = action === 'suspended' ? 'suspended' : 'deleted';
        alert(`Access request ${actionMessage} and user access revoked successfully`);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to revoke request');
      }
    } catch (error) {
      console.error('Error revoking request:', error);
      alert('Failed to revoke request');
    } finally {
      setResponding(null);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setSubscriptionLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/subscription/list?status=${subscriptionFilter}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data.subscriptions);
      } else {
        console.error('Failed to fetch subscriptions');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/reminders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleUpdateSubscription = async (subscriptionId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subscriptionId, ...updates })
      });

      if (response.ok) {
        fetchSubscriptions();
        fetchReminders();
        setEditingSubscription(null);
        alert('Subscription updated successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update subscription');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription');
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

  const getDaysUntilExpiration = (endDate) => {
    if (!endDate) return null;
    const now = new Date();
    const end = new Date(endDate);
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* View Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setView('requests')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              view === 'requests' 
                ? 'bg-primary text-foreground' 
                : 'bg-foreground/10 hover:bg-foreground/20'
            }`}
          >
            Access Requests
          </button>
          <button
            onClick={() => setView('quiz')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              view === 'quiz' 
                ? 'bg-primary text-foreground' 
                : 'bg-foreground/10 hover:bg-foreground/20'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            Anonymous Quiz Responses
          </button>
          <button
            onClick={() => setView('subscriptions')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 relative ${
              view === 'subscriptions' 
                ? 'bg-primary text-foreground' 
                : 'bg-foreground/10 hover:bg-foreground/20'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            Subscriptions
            {reminders.urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {reminders.urgentCount}
              </span>
            )}
          </button>
        </div>

        {view === 'requests' ? (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setFilter('pending')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === 'pending' 
                    ? 'bg-primary text-foreground' 
                    : 'bg-foreground/10 hover:bg-foreground/20'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === 'approved' 
                    ? 'bg-primary text-foreground' 
                    : 'bg-foreground/10 hover:bg-foreground/20'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('denied')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === 'denied' 
                    ? 'bg-primary text-foreground' 
                    : 'bg-foreground/10 hover:bg-foreground/20'
                }`}
              >
                Denied
              </button>
              <button
                onClick={() => setFilter('suspended')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === 'suspended' 
                    ? 'bg-primary text-foreground' 
                    : 'bg-foreground/10 hover:bg-foreground/20'
                }`}
              >
                Suspended
              </button>
            </div>

            {/* Requests List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">No {filter} requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request._id} className="bg-foreground/5 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {request.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                          {request.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {request.status === 'denied' && <XCircle className="w-5 h-5 text-red-500" />}
                          {request.status === 'suspended' && <Ban className="w-5 h-5 text-orange-500" />}
                          <h3 className="font-bold text-lg">{request.subject}</h3>
                        </div>
                        <p className="text-sm text-foreground/70 mb-2">
                          From: {request.user.firstName} {request.user.lastName} ({request.user.email})
                        </p>
                        <p className="text-sm text-foreground/70 mb-3">
                          Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                        
                        <button
                          onClick={() => setExpandedRequest(expandedRequest === request._id ? null : request._id)}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          {expandedRequest === request._id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View Details
                            </>
                          )}
                        </button>
                        
                        {expandedRequest === request._id && (
                          <div className="mt-4 p-4 bg-background/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Reason:</h4>
                            <p className="text-foreground/80 whitespace-pre-wrap">{request.reason}</p>
                          </div>
                        )}
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleRespond(request._id, 'approved')}
                            disabled={responding === request._id}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRespond(request._id, 'denied')}
                            disabled={responding === request._id}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                          >
                            Deny
                          </button>
                        </div>
                      )}

                      {request.status === 'approved' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleRevoke(request._id, 'suspended')}
                            disabled={responding === request._id}
                            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleRevoke(request._id, 'denied')}
                            disabled={responding === request._id}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : view === 'quiz' ? (
          <>
            {/* Quiz Responses View */}
            {quizLoading ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">Loading quiz responses...</p>
              </div>
            ) : quizResponses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">No anonymous quiz responses found</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-foreground/70 mb-4">Total anonymous responses: {quizResponses.length}</p>
                {quizResponses.map((response) => (
                  <div key={response._id} className="bg-foreground/5 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{response.score}%</span>
                          </div>
                          <div className="px-3 py-1 bg-primary/20 rounded-full">
                            <span className="text-sm font-semibold capitalize">{response.category}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/70 mb-3">
                          Submitted: {new Date(response.createdAt).toLocaleDateString()} at {new Date(response.createdAt).toLocaleTimeString()}
                        </p>
                        
                        <button
                          onClick={() => setExpandedQuiz(expandedQuiz === response._id ? null : response._id)}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          {expandedQuiz === response._id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide Answers
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View Answers
                            </>
                          )}
                        </button>
                        
                        {expandedQuiz === response._id && (
                          <div className="mt-4 p-4 bg-background/50 rounded-lg">
                            <h4 className="font-semibold mb-3">Quiz Answers:</h4>
                            <div className="space-y-3 text-sm">
                              {quizQuestions.map((question, index) => {
                                const answer = response.answers[question.id];
                                if (!answer || (Array.isArray(answer) && answer.length === 0)) return null;
                                
                                return (
                                  <div key={question.id} className="border-b border-foreground/10 pb-2">
                                    <p className="font-semibold text-foreground/90 mb-1">{question.question}</p>
                                    <p className="text-foreground/70 ml-2">
                                      {Array.isArray(answer) ? answer.join(', ') : answer}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Subscriptions View */}
            {/* Reminder Banner */}
            {reminders.urgentCount > 0 && (
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-500">
                    {reminders.urgentCount} subscription{reminders.urgentCount > 1 ? 's' : ''} expiring soon or expired!
                  </p>
                  <p className="text-sm text-foreground/70">
                    Please review the subscriptions below and contact the users.
                  </p>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8 flex-wrap">
              {['all', 'pending', 'active', 'expired', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSubscriptionFilter(status)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                    subscriptionFilter === status 
                      ? 'bg-primary text-foreground' 
                      : 'bg-foreground/10 hover:bg-foreground/20'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Subscriptions List */}
            {subscriptionLoading ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">Loading subscriptions...</p>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/70">No {subscriptionFilter !== 'all' ? subscriptionFilter : ''} subscriptions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => {
                  const daysUntil = getDaysUntilExpiration(subscription.endDate);
                  const isUrgent = daysUntil !== null && daysUntil <= 3;
                  const isExpired = daysUntil !== null && daysUntil < 0;
                  
                  return (
                    <div 
                      key={subscription._id} 
                      className={`bg-foreground/5 rounded-lg p-6 ${
                        isUrgent ? 'ring-2 ring-red-500/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            {subscription.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                            {subscription.status === 'active' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {subscription.status === 'expired' && <XCircle className="w-5 h-5 text-red-500" />}
                            {subscription.status === 'cancelled' && <Ban className="w-5 h-5 text-gray-500" />}
                            
                            <h3 className="font-bold text-lg">${subscription.amount}/month</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                              subscription.status === 'active' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                              subscription.status === 'pending' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                              subscription.status === 'expired' ? 'bg-red-500/20 text-red-700 dark:text-red-300' :
                              'bg-gray-500/20 text-gray-700 dark:text-gray-300'
                            }`}>
                              {subscription.status}
                            </span>
                            
                            {isUrgent && !isExpired && (
                              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-700 dark:text-red-300">
                                Expires in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                              </span>
                            )}
                            {isExpired && (
                              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-700 dark:text-red-300">
                                Expired {Math.abs(daysUntil)} day{Math.abs(daysUntil) !== 1 ? 's' : ''} ago
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-foreground/70 mb-2">
                            User: {subscription.user.firstName} {subscription.user.lastName} ({subscription.user.email})
                          </p>
                          
                          <div className="grid md:grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-foreground/60">Start Date</p>
                              <p className="text-sm font-semibold">{formatDate(subscription.startDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground/60">End Date</p>
                              <p className="text-sm font-semibold">{formatDate(subscription.endDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground/60">Created</p>
                              <p className="text-sm font-semibold">{formatDate(subscription.createdAt)}</p>
                            </div>
                          </div>
                          
                          {subscription.notes && (
                            <div className="mt-3 p-3 bg-background/50 rounded-lg">
                              <p className="text-xs text-foreground/60 mb-1">Notes</p>
                              <p className="text-sm text-foreground/80">{subscription.notes}</p>
                            </div>
                          )}
                          
                          <button
                            onClick={() => setExpandedSubscription(expandedSubscription === subscription._id ? null : subscription._id)}
                            className="flex items-center gap-2 text-primary hover:underline mt-3"
                          >
                            {expandedSubscription === subscription._id ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Actions
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                Show Actions
                              </>
                            )}
                          </button>
                          
                          {expandedSubscription === subscription._id && (
                            <div className="mt-4 p-4 bg-background/50 rounded-lg">
                              {editingSubscription === subscription._id ? (
                                <div className="space-y-4">
                                  <h4 className="font-semibold mb-3">Update Subscription</h4>
                                  <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    handleUpdateSubscription(subscription._id, {
                                      status: formData.get('status'),
                                      startDate: formData.get('startDate'),
                                      endDate: formData.get('endDate'),
                                      notes: formData.get('notes')
                                    });
                                  }}>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">Status</label>
                                        <select 
                                          name="status" 
                                          defaultValue={subscription.status}
                                          className="w-full px-3 py-2 bg-background border-2 border-foreground/20 rounded-lg"
                                        >
                                          <option value="pending">Pending</option>
                                          <option value="active">Active</option>
                                          <option value="expired">Expired</option>
                                          <option value="cancelled">Cancelled</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">Start Date</label>
                                        <input 
                                          type="date" 
                                          name="startDate" 
                                          defaultValue={subscription.startDate ? new Date(subscription.startDate).toISOString().split('T')[0] : ''}
                                          className="w-full px-3 py-2 bg-background border-2 border-foreground/20 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">End Date</label>
                                        <input 
                                          type="date" 
                                          name="endDate" 
                                          defaultValue={subscription.endDate ? new Date(subscription.endDate).toISOString().split('T')[0] : ''}
                                          className="w-full px-3 py-2 bg-background border-2 border-foreground/20 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">Notes</label>
                                        <textarea 
                                          name="notes" 
                                          defaultValue={subscription.notes}
                                          rows="2"
                                          className="w-full px-3 py-2 bg-background border-2 border-foreground/20 rounded-lg resize-none"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <button 
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-foreground rounded-lg font-semibold hover:opacity-90"
                                      >
                                        Save Changes
                                      </button>
                                      <button 
                                        type="button"
                                        onClick={() => setEditingSubscription(null)}
                                        className="px-4 py-2 bg-foreground/10 rounded-lg font-semibold hover:bg-foreground/20"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              ) : (
                                <div className="flex gap-2 flex-wrap">
                                  <button
                                    onClick={() => setEditingSubscription(subscription._id)}
                                    className="px-4 py-2 bg-primary text-foreground rounded-lg font-semibold hover:opacity-90"
                                  >
                                    Edit Subscription
                                  </button>
                                  
                                  {subscription.status === 'pending' && (
                                    <button
                                      onClick={() => handleUpdateSubscription(subscription._id, { 
                                        status: 'active',
                                        startDate: new Date().toISOString(),
                                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                                      })}
                                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                                    >
                                      Activate (30 days)
                                    </button>
                                  )}
                                  
                                  {subscription.status === 'active' && (
                                    <>
                                      <button
                                        onClick={() => handleUpdateSubscription(subscription._id, { status: 'expired' })}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
                                      >
                                        Mark Expired
                                      </button>
                                      <button
                                        onClick={() => handleUpdateSubscription(subscription._id, { status: 'cancelled' })}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
