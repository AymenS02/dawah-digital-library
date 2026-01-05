'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { faqData, commonTopics, dawahResources } from '../data/faqData';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [expandedDawahSection, setExpandedDawahSection] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleDawahSection = (section) => {
    setExpandedDawahSection(expandedDawahSection === section ? null : section);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', comment: '' });
  };

  // Get the correct FAQ data based on selected category
  const getCurrentFAQData = () => {
    switch(selectedCategory) {
      case 'NON-MUSLIMS':
        return faqData.nonMuslims;
      case 'NEW REVERTS':
        return faqData.newReverts;
      default:
        return faqData.muslims;
    }
  };

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="bg-foreground/90 backdrop-blur-sm py-4 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 md:gap-16">
          <button
            onClick={() => {
              setSelectedCategory('NON-MUSLIMS');
              setOpenFAQ(null);
            }}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'NON-MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            NON-MUSLIMS
          </button>
          <button
            onClick={() => {
              setSelectedCategory('MUSLIMS');
              setOpenFAQ(null);
            }}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            MUSLIMS
          </button>
          <button
            onClick={() => {
              setSelectedCategory('NEW REVERTS');
              setOpenFAQ(null);
            }}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'NEW REVERTS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            NEW REVERTS
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tight text-foreground">
            FAQS
          </h1>
          
          {/* FAQ Accordions */}
          <div className="space-y-4">
            {getCurrentFAQData().map((faq, index) => (
              <div key={index} className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                    <p className="text-foreground/80 mb-4">{faq.answer}</p>
                    {faq.links && faq.links.length > 0 && (
                      <div className="space-y-2">
                        {faq.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 underline transition-colors duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{link.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Topics Section */}
      <div className="relative py-16 px-4 mt-12 bg-foreground/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-foreground">
            {commonTopics.title}
          </h2>
          <p className="text-lg text-foreground/80 mb-6">{commonTopics.intro}</p>
          
          <div className="space-y-6">
            {commonTopics.categories.map((category, index) => (
              <div key={index} className="bg-background rounded-lg p-6 border border-foreground/10">
                <h3 className="text-xl font-bold text-foreground mb-3">{category.title}</h3>
                <p className="text-foreground/80 whitespace-pre-line">{category.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Da'wah Section */}
      <div className="relative py-16 px-4 mt-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-foreground">
            {dawahResources.title}
          </h2>
          
          {/* Main Da'wah Resources */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Main Resources</h3>
            <ul className="space-y-2">
              {dawahResources.mainResources.map((resource, index) => (
                <li key={index} className="flex flex-col gap-1 ml-4">
                  <p className="text-foreground">• {resource.title}</p>
                  {resource.author && <p className="text-sm text-foreground/60 ml-4">By: {resource.author}</p>}
                  {resource.source && <p className="text-sm text-foreground/60 ml-4">{resource.source}</p>}
                </li>
              ))}
            </ul>
          </div>

          {/* Da'wah Methodology */}
          <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 mb-4">
            <button
              onClick={() => toggleDawahSection('methodology')}
              className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                {dawahResources.methodology.title}
              </h3>
              <ChevronDown
                className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                  expandedDawahSection === 'methodology' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedDawahSection === 'methodology' && (
              <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                <ul className="space-y-2">
                  {dawahResources.methodology.resources.map((resource, index) => (
                    <li key={index} className="flex flex-col gap-1 ml-4">
                      <p className="text-foreground">• {resource.title}</p>
                      {resource.author && <p className="text-sm text-foreground/60 ml-4">By: {resource.author}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dua'at (Callers) */}
          <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 mb-4">
            <button
              onClick={() => toggleDawahSection('callers')}
              className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                {dawahResources.callers.title}
              </h3>
              <ChevronDown
                className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                  expandedDawahSection === 'callers' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedDawahSection === 'callers' && (
              <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10 max-h-[500px] overflow-y-auto">
                <ul className="space-y-2">
                  {dawahResources.callers.resources.map((resource, index) => (
                    <li key={index} className="flex flex-col gap-1 ml-4">
                      <p className="text-foreground">• {resource.title}</p>
                      {resource.author && <p className="text-sm text-foreground/60 ml-4">By: {resource.author}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Others */}
          <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
            <button
              onClick={() => toggleDawahSection('others')}
              className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                {dawahResources.others.title}
              </h3>
              <ChevronDown
                className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                  expandedDawahSection === 'others' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedDawahSection === 'others' && (
              <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                <ul className="space-y-2">
                  {dawahResources.others.resources.map((resource, index) => (
                    <li key={index} className="flex flex-col gap-1 ml-4">
                      <p className="text-foreground">• {resource.title}</p>
                      {resource.author && <p className="text-sm text-foreground/60 ml-4">By: {resource.author}</p>}
                      {resource.note && <p className="text-sm text-foreground/60 ml-4">{resource.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative py-16 px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-foreground">
            HAVE YOUR OWN QUESTION?
          </h2>
          
          <div className="space-y-6">
            <input
              type="text"
              placeholder="NAME..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            
            <input
              type="email"
              placeholder="EMAIL..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            
            <textarea
              placeholder="LEAVE YOUR COMMENT HERE..."
              rows={8}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
            />
            
            <button
              onClick={handleSubmit}
              className="bg-foreground text-background px-12 py-4 rounded-lg font-bold hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}