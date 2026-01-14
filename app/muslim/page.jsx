'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Lock, AlertCircle } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import Image from 'next/image';

// Component to render a resource link
const ResourceLink = ({ resource }) => {
  if (resource.url) {
    return (
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        <span className="text-sm">{resource.title}</span>
      </a>
    );
  }
  return <p className="text-sm text-foreground/80">{resource.title}</p>;
};

// Component to render a list of resources
const ResourceList = ({ resources, title }) => (
  <div className="mb-6">
    {title && <h4 className="font-semibold text-foreground mb-3">{title}</h4>}
    <ul className="space-y-2 ml-4">
      {resources.map((resource, index) => (
        <li key={index} className="flex flex-col gap-1">
          <ResourceLink resource={resource} />
          {resource.author && <p className="text-xs text-foreground/60 ml-6">By: {resource.author}</p>}
          {resource.description && <p className="text-xs text-foreground/60 ml-6">{resource.description}</p>}
        </li>
      ))}
    </ul>
  </div>
);

// Access Request Form Component
const AccessRequestForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ subject: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/access-request/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Access request submitted successfully! An admin will review your request.');
        setFormData({ subject: '', reason: '' });
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || 'Failed to submit request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-foreground">Request Access to Students of Knowledge Resources</h4>
      </div>
      <p className="text-sm text-foreground/70 mb-4">
        To access these advanced resources, please submit a request explaining why you need access.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Subject *</label>
          <input
            type="text"
            placeholder="Brief subject line (max 200 characters)"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            maxLength={200}
            required
            className="w-full px-4 py-3 bg-foreground/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Reason for Access *</label>
          <textarea
            placeholder="Please explain why you want access to these resources (max 1000 characters)"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            maxLength={1000}
            rows={6}
            required
            className="w-full px-4 py-3 bg-foreground/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <p className="text-xs text-foreground/60 mt-1">{formData.reason.length}/1000 characters</p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary hover:bg-primary/90 text-foreground px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default function MuslimsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [user, setUser] = useState(null);
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    hasPendingRequest: false,
    latestRequest: null
  });
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      checkAccessStatus();
    } else {
      setCheckingAccess(false);
    }
  }, []);

  const checkAccessStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/access-request/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAccessStatus(data);
      }
    } catch (error) {
      console.error('Failed to check access status:', error);
    } finally {
      setCheckingAccess(false);
    }
  };

  const handleRequestSuccess = () => {
    checkAccessStatus();
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    setOpenSection(null); // Reset section when changing dropdowns
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mt-42 min-h-screen text-foreground">
      {/* Background calligraphy image */}
      <div className="absolute top-3/4 left-1/2 -translate-y-[60%] pointer-events-none opacity-10 z-[-10]">
        <Image src="/homepage/cali-bg.svg" alt="Decorative calligraphy" width={800} height={800} className="object-contain" />
      </div>
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Dropdowns */}
            <div className="space-y-6 font-palanquin mx-4">
              {/* General Level */}
              <div className="bg-foreground backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => toggleDropdown('general')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-foreground/90 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-3xl font-bold text-background">General Level</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'general' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openDropdown === 'general' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20 max-h-[600px] overflow-y-auto">
                    <h3 className="text-lg font-bold text-foreground mb-4">{muslimResources.generalMuslims.title}</h3>
                    
                    {/* Fiqh Pathway */}
                    <div className="mb-6">
                      <button
                        onClick={() => toggleSection('fiqh')}
                        className="w-full flex items-center justify-between text-left mb-2"
                      >
                        <h4 className="font-bold text-foreground">{muslimResources.generalMuslims.pathways.fiqh.title}</h4>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'fiqh' ? 'rotate-180' : ''}`} />
                      </button>
                      {openSection === 'fiqh' && (
                        <ResourceList resources={muslimResources.generalMuslims.pathways.fiqh.resources} />
                      )}
                    </div>

                    {/* Tazkiyah Pathway */}
                    <div className="mb-6">
                      <button
                        onClick={() => toggleSection('tazkiyah')}
                        className="w-full flex items-center justify-between text-left mb-2"
                      >
                        <div>
                          <h4 className="font-bold text-foreground">{muslimResources.generalMuslims.pathways.tazkiyah.title}</h4>
                          <p className="text-xs text-foreground/60">{muslimResources.generalMuslims.pathways.tazkiyah.subtitle}</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'tazkiyah' ? 'rotate-180' : ''}`} />
                      </button>
                      {openSection === 'tazkiyah' && (
                        <div className="ml-2">
                          {muslimResources.generalMuslims.pathways.tazkiyah.topics.map((topic, index) => (
                            <div key={index} className="mb-4">
                              <h5 className="font-semibold text-sm text-foreground mb-2">{topic.title}</h5>
                              <ResourceList resources={topic.resources} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Aqidah Pathway */}
                    <div className="mb-6">
                      <button
                        onClick={() => toggleSection('aqidah')}
                        className="w-full flex items-center justify-between text-left mb-2"
                      >
                        <div>
                          <h4 className="font-bold text-foreground">{muslimResources.generalMuslims.pathways.aqidah.title}</h4>
                          <p className="text-xs text-foreground/60">{muslimResources.generalMuslims.pathways.aqidah.subtitle}</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'aqidah' ? 'rotate-180' : ''}`} />
                      </button>
                      {openSection === 'aqidah' && (
                        <div className="ml-2">
                          {muslimResources.generalMuslims.pathways.aqidah.topics.map((topic, index) => (
                            <div key={index} className="mb-4">
                              <h5 className="font-semibold text-sm text-foreground mb-2">{topic.title}</h5>
                              <ResourceList resources={topic.resources} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Students of Knowledge */}
              <div className="bg-foreground backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => toggleDropdown('students')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-foreground/90 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-2xl font-bold text-background">Students of Knowledge</span>
                    {!user && <Lock className="w-5 h-5 text-background" />}
                    {user && !accessStatus.hasAccess && <Lock className="w-5 h-5 text-background" />}
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'students' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openDropdown === 'students' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20 max-h-[600px] overflow-y-auto">
                    {!user ? (
                      // Not logged in
                      <div className="text-center py-8">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-foreground mb-2">Authentication Required</h3>
                        <p className="text-foreground/70 mb-6">
                          Please log in to request access to Students of Knowledge resources.
                        </p>
                        <div className="flex gap-4 justify-center">
                          <a
                            href="/login"
                            className="bg-primary hover:bg-primary/90 text-foreground px-6 py-3 rounded-lg font-bold transition-all"
                          >
                            Log In
                          </a>
                          <a
                            href="/register"
                            className="bg-foreground/10 hover:bg-foreground/20 text-foreground px-6 py-3 rounded-lg font-bold transition-all"
                          >
                            Sign Up
                          </a>
                        </div>
                      </div>
                    ) : checkingAccess ? (
                      // Checking access status
                      <div className="text-center py-8">
                        <p className="text-foreground/70">Checking access status...</p>
                      </div>
                    ) : accessStatus.hasAccess ? (
                      // Has access - show content
                      <>
                        <h3 className="text-lg font-bold text-foreground mb-2">{muslimResources.studentsOfKnowledge.title}</h3>
                        <p className="text-sm text-foreground/60 mb-4">{muslimResources.studentsOfKnowledge.subtitle}</p>

                        {muslimResources.studentsOfKnowledge.components.map((component, index) => (
                          <div key={index} className="mb-6">
                            <h4 className="font-bold text-foreground mb-2">{component.title}</h4>
                            {component.subtitle && <p className="text-xs text-foreground/60 mb-2">{component.subtitle}</p>}

                            {component.resources && <ResourceList resources={component.resources} />}

                            {component.usulPathways && (
                              <div className="ml-2">
                                <h5 className="font-semibold text-sm mb-2">{component.usulPathways.title}</h5>
                                <ResourceList resources={component.usulPathways.items} />
                              </div>
                            )}

                            {component.madhahib && (
                              <div className="ml-2">
                                <h5 className="font-semibold text-sm mb-2">{component.madhahib.title}</h5>
                                {component.madhahib.schools.map((school, i) => (
                                  <div key={i} className="mb-2">
                                    <p className="font-medium text-sm">{school.name}</p>
                                    {school.url && (
                                      <a href={school.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary/80">
                                        {school.url}
                                      </a>
                                    )}
                                    {school.texts && (
                                      <ul className="ml-4 text-xs text-foreground/70">
                                        {school.texts.map((text, j) => (
                                          <li key={j}>• <a href={text.url} target="_blank" rel="noopener noreferrer">{text.title}</a></li>
                                        ))}
                                      </ul>
                                    )}
                                    {school.resources && <ResourceList resources={school.resources} />}
                                  </div>
                                ))}
                              </div>
                            )}

                            {component.items && <ResourceList resources={component.items} />}
                          </div>
                        ))}
                      </>

                    ) : accessStatus.hasPendingRequest ? (
                      // Has pending request
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-foreground mb-2">Request Pending</h3>
                        <p className="text-foreground/70 mb-4">
                          Your access request is being reviewed by an administrator.
                        </p>
                        {accessStatus.latestRequest && (
                          <div className="bg-foreground/5 rounded-lg p-4 mt-4 max-w-md mx-auto text-left">
                            <p className="text-sm text-foreground/70">
                              <strong>Subject:</strong> {accessStatus.latestRequest.subject}
                            </p>
                            <p className="text-sm text-foreground/70 mt-2">
                              <strong>Submitted:</strong> {new Date(accessStatus.latestRequest.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      // No access - show request form
                      <AccessRequestForm onSuccess={handleRequestSuccess} />
                    )}
                  </div>
                )}
              </div>

              {/* Struggling with Faith */}
              <div className="bg-foreground backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
  <button
    onClick={() => toggleDropdown('struggling')}
    className="w-full px-8 py-6 flex items-center justify-between hover:bg-foreground/90 transition-colors duration-300"
  >
    <div className="flex items-center gap-3">
      <span className="text-lg md:text-2xl font-bold text-background">Struggling with Faith?</span>
      <ChevronDown 
        className={`w-5 h-5 text-background transition-transform duration-300 ${
          openDropdown === 'struggling' ? 'rotate-180' : ''
        }`}
      />
    </div>
  </button>

  {openDropdown === 'struggling' && (
    <div className="px-8 py-6 bg-background border-t border-foreground/20 max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-bold text-foreground mb-4">{muslimResources.strugglingWithFaith.title}</h3>
      
      {muslimResources.strugglingWithFaith.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h4 className="font-bold text-foreground mb-3">{section.title}</h4>
          {section.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="mb-4 ml-2">
              <h5 className="font-semibold text-sm text-foreground mb-2">{topic.title}</h5>
              {topic.resources && topic.resources.length > 0 ? (
                <ResourceList resources={topic.resources} />
              ) : (
                <p className="text-xs text-foreground/60">No resources available</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )}
</div>

            </div>

            {/* Right Side - Title */}
            <div className="text-center lg:text-right">
              <h1 className="relative font-proxima text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
              <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">
                MUSLIMS
              </span>
              <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">
                MUSLIMS
              </span>
              <span className="relative">
                MUSLIMS
              </span>
              </h1>

            </div>
          </div>
        </div>
      </div>

      {/* Structure Overview Section */}
      <div className="relative py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-proxima text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-wide text-foreground">
              STRUCTURE OVERVIEW
            </h2>
            <h3 className="font-proxima text-primary text-2xl sm:text-3xl mb-8">GENERAL LEVEL</h3>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>

          {/* Three Pathways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 font-palanquin">
            {/* Aqidah Pathway */}
            <div className="space-y-4">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center mb-6 text-background">Aqidah Pathway</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Foundations of Tawhid</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Qadr & Divine Will</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Problem of Evil</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Epistemology</p>
                </div>
              </div>
            </div>

            {/* Fiqh Pathway */}
            <div className="space-y-4">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center mb-6 text-background">Fiqh Pathway</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Madhahib</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Usul al-Fiqh Resources</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Practical Fiqh Issues</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Differences in opinions</p>
                </div>
              </div>
            </div>

            {/* Tazkiyah Pathway */}
            <div className="space-y-4">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center mb-6 text-background">Tazkiyah Pathway</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Attachment to Dunya</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Increasing Khushu</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Developing Ikhlas</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Adhkar Routines</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-8">
            <button onClick={() => window.location.href = '/browse'} className="font-palanquin bg-primary hover:bg-primary/90 text-foreground px-16 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl">
              DIGITAL LIBRARY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}