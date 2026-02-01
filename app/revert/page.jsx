'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Users, Hand, Book, Smartphone, ArrowDown, ChevronDown, ExternalLink } from 'lucide-react';
import { revertResources } from '../data/revertResources';
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
const ResourceList = ({ resources }) => (
  <ul className="space-y-2 ml-4">
    {resources.map((resource, index) => (
      <li key={index} className="flex flex-col gap-1">
        <ResourceLink resource={resource} />
        {resource.author && <p className="text-xs text-foreground/60 ml-6">By: {resource.author}</p>}
        {resource.description && <p className="text-xs text-foreground/60 ml-6">{resource.description}</p>}
        {resource.source && <p className="text-xs text-foreground/60 ml-6">Source: {resource.source}</p>}
      </li>
    ))}
  </ul>
);

export default function NewRevertsPage() {
  const [expandedSection, setExpandedSection] = useState(null);
  const sectionRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, revertResources.starterPackage.sections.length);
  }, []);

  const scrollToSection = (sectionIndex) => {
    setExpandedSection(sectionIndex);
    
    // Wait for the section to expand before scrolling
    setTimeout(() => {
      if (sectionRefs.current[sectionIndex]) {
        const element = sectionRefs.current[sectionIndex];
        const offset = 100; // Offset from top of viewport
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex);
  };

  return (
    <div className="font-palanquin mt-42 min-h-screen text-white">
          {/* Background calligraphy image */}
          <div className="absolute top-3/4 left-1/2 -translate-y-[60%] pointer-events-none opacity-10 z-[-10]">
            <Image src="/homepage/allah.svg" alt="Decorative calligraphy" width={800} height={800} className="object-contain" />
          </div>
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">
              NEW REVERTS
            </span>
            <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">
              NEW REVERTS
            </span>
            <span className="relative">
              NEW REVERTS
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Begin your journey with foundational knowledge and practical guidance
          </p>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-12">
        {/* Foundation of Tawhid */}
        <div onClick={() => scrollToSection(0)} className="group">
          <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
            <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl font-bold text-gray-800">1</span>
            </div>
            <h3 className="text-xl text-background font-bold mb-3">Foundations of Tawhid</h3>
            <p className="text-sm text-background">Understanding the oneness of Allah</p>
          </div>
        </div>

        {/* Fiqh Basics */}
        <div onClick={() => scrollToSection(2)} className="group">
          <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
            <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl font-bold text-gray-800">2</span>
            </div>
            <h3 className="text-xl text-background font-bold mb-3">Fiqh Basics</h3>
            <p className="text-sm text-background">Essential Islamic jurisprudence</p>
          </div>
        </div>

        {/* Learning Salah */}
        <div onClick={() => scrollToSection(2)} className="group">
          <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
            <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl font-bold text-gray-800">3</span>
            </div>
            <h3 className="text-xl text-background font-bold mb-3">Learning Salah</h3>
            <p className="text-sm text-background mb-4">Master the daily prayer</p>
            <div className="flex gap-2 mt-auto">
              <span className="bg-background px-3 py-1 rounded-full text-xs">For Men</span>
              <span className="bg-background px-3 py-1 rounded-full text-xs">For Women</span>
            </div>
          </div>
        </div>

        {/* Prophetic Character */}
        <div onClick={() => scrollToSection(3)} className="group">
          <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
            <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl font-bold text-gray-800">4</span>
            </div>
            <h3 className="text-xl text-background font-bold mb-3">Prophetic Character</h3>
            <p className="text-sm text-background">Learn from the best example</p>
          </div>
        </div>
      </div>

      {/* Section Overview */}
      <div className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-wide">
              YOUR LEARNING PATH
            </h2>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>
          
          {/* Detailed Resources Section */}
          <div className="max-w-5xl mx-auto space-y-4 mb-12">
            {revertResources.starterPackage.sections.map((section, sectionIndex) => (
              <div 
                key={sectionIndex} 
                ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10"
              >
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                    {section.title}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                      expandedSection === sectionIndex ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSection === sectionIndex && (
                  <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                    {section.resources && <ResourceList resources={section.resources} />}
                    {section.categories && (
                      <div className="space-y-4">
                        {section.categories.map((category, catIndex) => (
                          <div key={catIndex}>
                            <h4 className="font-semibold text-foreground mb-2">{category.title}</h4>
                            <ResourceList resources={category.resources} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>


          {/* CTA Section */}
          <div className="text-center py-8">
            <ArrowDown className="w-8 h-8 mx-auto mb-4 animate-bounce text-[#c4b5a0]" />
            <h3 className="font-palanquin font-bold text-2xl sm:text-3xl mb-6">
              EXPLORE ALL TOPICS IN DETAIL
            </h3>
            <button className="bg-primary hover:bg-primary/90 text-foreground px-16 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl">
              DIGITAL LIBRARY
            </button>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="relative py-16 px-4 mt-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-wide">
              ADDITIONAL RESOURCES
            </h2>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Finding Muslim Friends */}
            {/* <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Users className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Finding Muslim Friends</h3>
              <p className="text-sm text-background">Connect with your local community</p>
            </div> */}

            {/* Simple Du'a Collection */}
            <div onClick={() => (window.location.href = '/browse')} className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Hand className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Simple Du&apos;a Collection</h3>
              <p className="text-sm text-background">Daily supplications to memorize</p>
            </div>

            {/* Local Community Directory */}
            {/* <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Book className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Local Community Directory</h3>
              <p className="text-sm text-background">Find mosques and Islamic centers</p>
            </div> */}

            {/* Helpful Apps to Download */}
            <div onClick={() => (window.location.href = '/apps')} className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Smartphone className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Helpful Apps to Download</h3>
              <p className="text-sm text-background">Essential mobile tools for Muslims</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}