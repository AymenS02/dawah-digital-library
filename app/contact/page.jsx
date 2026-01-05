'use client';

import React, { useState } from 'react';
import { Mail, Globe, Instagram, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground">
            CONTACT US
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
            Have questions or need guidance? We're here to help you on your journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">
                GET IN TOUCH
              </h2>
              <p className="text-foreground/70 mb-8">
                Whether you're curious about Islam, seeking resources, or need support, our team is ready to assist you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-all duration-300">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href="mailto:contact@example.com" className="text-foreground/70 hover:text-primary transition-colors">
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-all duration-300">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-all duration-300">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">MSA Website</h3>
                  <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                    www.example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-all duration-300">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Social Media</h3>
                  <div className="space-y-1">
                    <a href="https://instagram.com/example_msa" target="_blank" rel="noopener noreferrer" className="block text-foreground/70 hover:text-primary transition-colors">
                      MSA Instagram: @example_msa
                    </a>
                    <a href="https://instagram.com/example_dawah" target="_blank" rel="noopener noreferrer" className="block text-foreground/70 hover:text-primary transition-colors">
                      Da'wah Instagram: @example_dawah
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-all duration-300">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-foreground/70">
                    123 Learning Street<br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 md:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              SEND US A MESSAGE
            </h2>
            <p className="text-foreground/70 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Email *</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Subject *</label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Message *</label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-foreground px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-foreground/5 py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              OFFICE HOURS
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-foreground/5 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-foreground">Weekdays</h3>
              <p className="text-foreground/70">9:00 AM - 5:00 PM</p>
            </div>
            <div className="text-center p-6 bg-foreground/5 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-foreground">Weekends</h3>
              <p className="text-foreground/70">10:00 AM - 2:00 PM</p>
            </div>
            <div className="text-center p-6 bg-foreground/5 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-foreground">Response Time</h3>
              <p className="text-foreground/70">Within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}