'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Lock, AlertCircle, ChevronDown } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import Image from 'next/image';

// Simple resource link/list components
const ResourceLink = ({ resource }) => {
  if (resource.url) {
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <span className="text-sm">{resource.title}</span>
      </a>
    );
  }
  return <p className="text-sm text-foreground/80">{resource.title}</p>;
};

const ResourceList = ({ resources, title }) => (
  <div className="mb-4">
    {title && <h4 className="font-semibold text-foreground mb-2">{title}</h4>}
    <ul className="space-y-2 ml-4">
      {resources.map((resource, index) => (
        <li key={index} className="flex flex-col gap-1">
          <ResourceLink resource={resource} />
          {resource.author && (
            <p className="text-xs text-foreground/60 ml-6">By: {resource.author}</p>
          )}
          {resource.description && (
            <p className="text-xs text-foreground/60 ml-6">{resource.description}</p>
          )}
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
    <div className="rounded-lg p-6 bg-background/80 border border-foreground/10">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-foreground">
          Request Access to Students of Knowledge Resources
        </h4>
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
          <p className="text-xs text-foreground/60 mt-1">
            {formData.reason.length}/1000 characters
          </p>
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
  const [selectedLevel, setSelectedLevel] = useState('general'); // 'general' | 'students' | 'struggling'
  const structureRef = useRef(null);

  const [user, setUser] = useState(null);
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    hasPendingRequest: false,
    latestRequest: null,
  });
  const [checkingAccess, setCheckingAccess] = useState(true);

  // which card is open in each section
  const [openGeneralTopic, setOpenGeneralTopic] = useState(null);      // 'aqidah' | 'fiqh' | 'tazkiyah' | null
  const [openStudentsCard, setOpenStudentsCard] = useState(null);      // key
  const [openStrugglingCard, setOpenStrugglingCard] = useState(null);  // key

  useEffect(() => {
    const storedUser =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null;
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
          Authorization: `Bearer ${token}`,
        },
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

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    if (structureRef.current) {
      structureRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSelected = (level) => selectedLevel === level;

  const toggleGeneralTopic = (topicKey) => {
    setOpenGeneralTopic((prev) => (prev === topicKey ? null : topicKey));
  };

  const toggleStudentsCard = (key) => {
    setOpenStudentsCard((prev) => (prev === key ? null : key));
  };

  const toggleStrugglingCard = (key) => {
    setOpenStrugglingCard((prev) => (prev === key ? null : key));
  };

  const { generalMuslims, studentsOfKnowledge, strugglingWithFaith } =
    muslimResources;

  return (
    <div className="mt-42 min-h-screen text-foreground">
      {/* Background calligraphy image */}
      <div className="absolute top-3/4 left-1/2 -translate-y-[60%] pointer-events-none opacity-10 z-[-10]">
        <Image
          src="/homepage/cali-bg.svg"
          alt="Decorative calligraphy"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>

      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Three buttons */}
            <div className="space-y-4 font-palanquin mx-4">
              {/* GENERAL LEVEL */}
              <button
                onClick={() => handleSelectLevel('general')}
                className={`
                  w-full flex items-center justify-between
                  rounded-2xl px-8 py-5
                  text-left
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:ring-offset-background
                  shadow-md
                  ${
                    isSelected('general')
                      ? 'bg-primary text-foreground shadow-lg scale-[1.02]'
                      : 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="text-sm uppercase tracking-[0.18em] opacity-80">
                    Primary Path
                  </span>
                  <span className="text-xl md:text-2xl font-bold">
                    General Level
                  </span>
                </div>
                <span
                  className={`
                    inline-flex items-center justify-center
                    rounded-full px-4 py-2 text-xs font-semibold
                    border
                    ${
                      isSelected('general')
                        ? 'border-foreground/40 bg-foreground/10'
                        : 'border-background/20 bg-background/10'
                    }
                  `}
                >
                  Explore
                </span>
              </button>

              {/* STUDENTS OF KNOWLEDGE */}
              <button
                onClick={() => handleSelectLevel('students')}
                className={`
                  w-full flex items-center justify-between
                  rounded-2xl px-8 py-5
                  text-left
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:ring-offset-background
                  shadow-md
                  ${
                    isSelected('students')
                      ? 'bg-primary text-foreground shadow-lg scale-[1.02]'
                      : 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm uppercase tracking-[0.18em] opacity-80">
                      Advanced
                    </span>
                    <Lock className="w-4 h-4 opacity-90" />
                  </div>
                  <span className="text-lg md:text-2xl font-bold">
                    Students of Knowledge
                  </span>
                </div>
                <span
                  className={`
                    inline-flex items-center justify-center
                    rounded-full px-4 py-2 text-xs font-semibold
                    border
                    ${
                      isSelected('students')
                        ? 'border-foreground/40 bg-foreground/10'
                        : 'border-background/20 bg-background/10'
                    }
                  `}
                >
                  View Track
                </span>
              </button>

              {/* STRUGGLING WITH FAITH? */}
              <button
                onClick={() => handleSelectLevel('struggling')}
                className={`
                  w-full flex items-center justify-between
                  rounded-2xl px-8 py-5
                  text-left
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:ring-offset-background
                  shadow-md
                  ${
                    isSelected('struggling')
                      ? 'bg-background text-foreground shadow-lg scale-[1.02] border border-primary/40'
                      : 'bg-background/90 text-foreground border border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="text-sm uppercase tracking-[0.18em] text-red-400/80">
                    Support
                  </span>
                  <span className="text-lg md:text-xl font-semibold">
                    Struggling with Faith?
                  </span>
                </div>
                <span
                  className={`
                    inline-flex items-center justify-center
                    rounded-full px-4 py-2 text-xs font-semibold
                    ${
                      isSelected('struggling')
                        ? 'bg-primary/10 text-primary border border-primary/60'
                        : 'bg-transparent text-foreground/70 border border-foreground/20'
                    }
                  `}
                >
                  Get Help
                </span>
              </button>
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
                <span className="relative">MUSLIMS</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Structure Overview Section */}
      <div ref={structureRef} className="relative py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-proxima text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-wide text-foreground">
              STRUCTURE OVERVIEW
            </h2>
            <h3 className="font-proxima text-primary text-2xl sm:text-3xl mb-8">
              {selectedLevel === 'general' && 'GENERAL LEVEL'}
              {selectedLevel === 'students' && 'STUDENTS OF KNOWLEDGE'}
              {selectedLevel === 'struggling' && 'STRUGGLING WITH FAITH'}
            </h3>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>

          {/* GENERAL LEVEL – rounded cards + chevron + animation */}
          {selectedLevel === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-palanquin mb-12">
              {/* Aqidah Card */}
              <div
                className={`
                  rounded-2xl border transition-all duration-200 cursor-pointer
                  bg-background/80 backdrop-blur-sm
                  ${
                    openGeneralTopic === 'aqidah'
                      ? 'border-primary/60 shadow-xl'
                      : 'border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                  }
                `}
                onClick={() => toggleGeneralTopic('aqidah')}
              >
                <div className="px-6 py-5 flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                      Aqidah Pathway
                    </p>
                    <h3 className="text-xl font-bold text-foreground">
                      {generalMuslims.pathways.aqidah.title}
                    </h3>
                    {generalMuslims.pathways.aqidah.subtitle && (
                      <p className="text-xs text-foreground/60 mt-1">
                        {generalMuslims.pathways.aqidah.subtitle}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/70 transition-transform duration-200 ${
                      openGeneralTopic === 'aqidah' ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <div
                  className={`
                    border-t border-foreground/10 overflow-hidden transition-all duration-300
                    ${
                      openGeneralTopic === 'aqidah'
                        ? 'max-h-[800px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  <div className="px-6 py-4">
                    {generalMuslims.pathways.aqidah.topics?.map((topic, idx) => (
                      <div key={idx} className="mb-4">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {topic.title}
                        </h4>
                        {topic.resources && topic.resources.length > 0 ? (
                          <ResourceList resources={topic.resources} />
                        ) : (
                          <p className="text-xs text-foreground/60">
                            No resources available.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fiqh Card */}
              <div
                className={`
                  rounded-2xl border transition-all duration-200 cursor-pointer
                  bg-background/80 backdrop-blur-sm
                  ${
                    openGeneralTopic === 'fiqh'
                      ? 'border-primary/60 shadow-xl'
                      : 'border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                  }
                `}
                onClick={() => toggleGeneralTopic('fiqh')}
              >
                <div className="px-6 py-5 flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                      Fiqh Pathway
                    </p>
                    <h3 className="text-xl font-bold text-foreground">
                      {generalMuslims.pathways.fiqh.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/70 transition-transform duration-200 ${
                      openGeneralTopic === 'fiqh' ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <div
                  className={`
                    border-t border-foreground/10 overflow-hidden transition-all duration-300
                    ${
                      openGeneralTopic === 'fiqh'
                        ? 'max-h-[800px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  <div className="px-6 py-4">
                    {generalMuslims.pathways.fiqh.resources &&
                    generalMuslims.pathways.fiqh.resources.length > 0 ? (
                      <ResourceList resources={generalMuslims.pathways.fiqh.resources} />
                    ) : (
                      <p className="text-xs text-foreground/60">
                        No resources available.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tazkiyah Card */}
              <div
                className={`
                  rounded-2xl border transition-all duration-200 cursor-pointer
                  bg-background/80 backdrop-blur-sm
                  ${
                    openGeneralTopic === 'tazkiyah'
                      ? 'border-primary/60 shadow-xl'
                      : 'border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                  }
                `}
                onClick={() => toggleGeneralTopic('tazkiyah')}
              >
                <div className="px-6 py-5 flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                      Tazkiyah Pathway
                    </p>
                    <h3 className="text-xl font-bold text-foreground">
                      {generalMuslims.pathways.tazkiyah.title}
                    </h3>
                    {generalMuslims.pathways.tazkiyah.subtitle && (
                      <p className="text-xs text-foreground/60 mt-1">
                        {generalMuslims.pathways.tazkiyah.subtitle}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/70 transition-transform duration-200 ${
                      openGeneralTopic === 'tazkiyah' ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <div
                  className={`
                    border-t border-foreground/10 overflow-hidden transition-all duration-300
                    ${
                      openGeneralTopic === 'tazkiyah'
                        ? 'max-h-[800px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  <div className="px-6 py-4">
                    {generalMuslims.pathways.tazkiyah.topics?.map((topic, idx) => (
                      <div key={idx} className="mb-4">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {topic.title}
                        </h4>
                        {topic.resources && topic.resources.length > 0 ? (
                          <ResourceList resources={topic.resources} />
                        ) : (
                          <p className="text-xs text-foreground/60">
                            No resources available.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS OF KNOWLEDGE – rounded cards + chevron + animation */}
          {selectedLevel === 'students' && (
            <div className="font-palanquin mb-12">
              {checkingAccess ? (
                <p className="text-center text-foreground/70">
                  Checking access status...
                </p>
              ) : !user ? (
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Authentication Required
                  </h3>
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
              ) : accessStatus.hasAccess ? (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">
                    {studentsOfKnowledge.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-8 text-center">
                    {studentsOfKnowledge.subtitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studentsOfKnowledge.components.map((component, index) => {
                      const key = `component-${index}`;
                      const isOpen = openStudentsCard === key;

                      return (
                        <div
                          key={key}
                          className={`
                            rounded-2xl border transition-all duration-200 cursor-pointer
                            bg-background/80 backdrop-blur-sm
                            ${
                              isOpen
                                ? 'border-primary/60 shadow-xl'
                                : 'border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                            }
                          `}
                          onClick={() => toggleStudentsCard(key)}
                        >
                          <div className="px-6 py-5 flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-1">
                              <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                                Students Track
                              </p>
                              <h3 className="text-lg font-bold text-foreground">
                                {component.title}
                              </h3>
                              {component.subtitle && (
                                <p className="text-xs text-foreground/60 mt-1">
                                  {component.subtitle}
                                </p>
                              )}
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-foreground/70 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </div>

                          <div
                            className={`
                              border-t border-foreground/10 overflow-hidden transition-all duration-300
                              ${
                                isOpen
                                  ? 'max-h-[900px] opacity-100'
                                  : 'max-h-0 opacity-0'
                              }
                            `}
                          >
                            <div className="px-6 py-4">
                              {component.resources && (
                                <ResourceList resources={component.resources} />
                              )}

                              {component.usulPathways && (
                                <div className="mt-4">
                                  <h5 className="font-semibold text-sm mb-2">
                                    {component.usulPathways.title}
                                  </h5>
                                  <ResourceList
                                    resources={component.usulPathways.items}
                                  />
                                </div>
                              )}

                              {component.madhahib && (
                                <div className="mt-4">
                                  <h5 className="font-semibold text-sm mb-2">
                                    {component.madhahib.title}
                                  </h5>
                                  {component.madhahib.schools.map((school, i) => (
                                    <div key={i} className="mb-3">
                                      <p className="font-medium text-sm">
                                        {school.name}
                                      </p>
                                      {school.url && (
                                        <a
                                          href={school.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:text-primary/80"
                                        >
                                          {school.url}
                                        </a>
                                      )}
                                      {school.texts && (
                                        <ul className="ml-4 text-xs text-foreground/70">
                                          {school.texts.map((text, j) => (
                                            <li key={j}>
                                              •{' '}
                                              <a
                                                href={text.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {text.title}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                      {school.resources && (
                                        <ResourceList resources={school.resources} />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {component.items && (
                                <div className="mt-4">
                                  <ResourceList resources={component.items} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : accessStatus.hasPendingRequest ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Request Pending
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Your access request is being reviewed by an administrator.
                  </p>
                  {accessStatus.latestRequest && (
                    <div className="bg-foreground/5 rounded-lg p-4 mt-4 max-w-md mx-auto text-left">
                      <p className="text-sm text-foreground/70">
                        <strong>Subject:</strong> {accessStatus.latestRequest.subject}
                      </p>
                      <p className="text-sm text-foreground/70 mt-2">
                        <strong>Submitted:</strong>{' '}
                        {new Date(
                          accessStatus.latestRequest.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <AccessRequestForm onSuccess={handleRequestSuccess} />
              )}
            </div>
          )}

          {/* STRUGGLING WITH FAITH – rounded cards + chevron + animation */}
          {selectedLevel === 'struggling' && (
            <div className="font-palanquin mb-12">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">
                {strugglingWithFaith.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strugglingWithFaith.sections.map((section, sectionIndex) => {
                  const key = `struggle-${sectionIndex}`;
                  const isOpen = openStrugglingCard === key;

                  return (
                    <div
                      key={key}
                      className={`
                        rounded-2xl border transition-all duration-200 cursor-pointer
                        bg-background/80 backdrop-blur-sm
                        ${
                          isOpen
                            ? 'border-primary/60 shadow-xl'
                            : 'border-foreground/10 hover:border-primary/40 hover:shadow-lg'
                        }
                      `}
                      onClick={() => toggleStrugglingCard(key)}
                    >
                      <div className="px-6 py-5 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-red-400/80">
                            Faith Challenges
                          </p>
                          <h4 className="font-bold text-foreground mt-1">
                            {section.title}
                          </h4>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-foreground/70 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      <div
                        className={`
                          border-t border-foreground/10 overflow-hidden transition-all duration-300
                          ${
                            isOpen
                              ? 'max-h-[900px] opacity-100'
                              : 'max-h-0 opacity-0'
                          }
                        `}
                      >
                        <div className="px-6 py-4">
                          {section.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="mb-4">
                              <h5 className="font-semibold text-sm text-foreground mb-2">
                                {topic.title}
                              </h5>
                              {topic.resources && topic.resources.length > 0 ? (
                                <ResourceList resources={topic.resources} />
                              ) : (
                                <p className="text-xs text-foreground/60">
                                  No resources available
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => (window.location.href = '/browse')}
              className="font-palanquin bg-primary hover:bg-primary/90 text-foreground px-16 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl"
            >
              DIGITAL LIBRARY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}