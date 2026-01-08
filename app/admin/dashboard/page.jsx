'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Ban } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [responding, setResponding] = useState(null);

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
  }, [filter]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Admin Dashboard</h1>
        
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
      </div>
    </div>
  );
}
