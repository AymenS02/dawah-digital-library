'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function MuslimsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Dropdowns */}
            <div className="space-y-6">
              {/* General Level */}
              <div className="bg-foreground backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => toggleDropdown('general')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-foreground/90 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-background">General Level</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'general' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <ExternalLink className="w-5 h-5 text-background/60" />
                </button>
                {openDropdown === 'general' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20">
                    <p className="text-foreground">Content for General Level Muslims...</p>
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
                    <span className="text-xl font-bold text-background">Students of Knowledge</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'students' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <ExternalLink className="w-5 h-5 text-background/60" />
                </button>
                {openDropdown === 'students' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20">
                    <p className="text-foreground">Content for Students of Knowledge...</p>
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
                    <span className="text-xl font-bold text-background">Struggling with Faith?</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'struggling' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <ExternalLink className="w-5 h-5 text-background/60" />
                </button>
                {openDropdown === 'struggling' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20">
                    <p className="text-foreground">Content for those struggling with faith...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Title */}
            <div className="text-center lg:text-right">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
                MUSLIMS
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Structure Overview Section */}
      <div className="relative py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-wide text-foreground">
              STRUCTURE OVERVIEW
            </h2>
            <h3 className="text-2xl sm:text-3xl text-foreground/80 mb-8">GENERAL LEVEL</h3>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>

          {/* Three Pathways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
            <button className="bg-primary hover:bg-primary/90 text-foreground px-16 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl">
              DIGITAL LIBRARY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}