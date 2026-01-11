'use client';

import React, { useState } from 'react';
import { Users, BookOpen, ArrowDown, ChevronDown, ExternalLink } from 'lucide-react';
import { nonMuslimResources } from '../data/nonMuslimResources';
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

export default function NonMuslimsPage() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setExpandedSection(null);
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex);
  };
  return (
    <div className="mt-42 min-h-screen text-foreground">
          {/* Background calligraphy image */}
          <div className="absolute top-3/4 left-1/2 -translate-y-[60%] pointer-events-none opacity-10 z-[-10]">
            <Image src="/homepage/cali-bg.svg" alt="Decorative calligraphy" width={800} height={800} className="object-contain" />
          </div>
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="relative font-palanquin text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground">
            <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">
              NON-MUSLIMS
            </span>
            <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">
              NON-MUSLIMS
            </span>
            <span className="relative">
              NON-MUSLIMS
            </span>
          </h1>
        </div>
      </div>

      {/* Section Overview */}
      <div className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-palanquin text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-wide text-primary">
              SECTION OVERVIEW
            </h2>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto mb-12"></div>
          </div>
          
          {/* Main Category Dropdowns */}
          <div className="max-w-5xl mx-auto space-y-4 mb-12">
            {/* Islam Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('islam')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {nonMuslimResources.islam.title}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'islam' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'islam' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10 max-h-[600px] overflow-y-auto">
                  {nonMuslimResources.islam.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                      {section.resources.length > 0 && <ResourceList resources={section.resources} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Christianity Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('christianity')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {nonMuslimResources.christianity.title}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'christianity' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'christianity' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                  {nonMuslimResources.christianity.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                      <ResourceList resources={section.resources} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Atheism/Agnosticism Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('atheism')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {nonMuslimResources.atheismAgnosticism.title}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'atheism' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'atheism' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10 max-h-[600px] overflow-y-auto">
                  {nonMuslimResources.atheismAgnosticism.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                      {section.resources.length > 0 && <ResourceList resources={section.resources} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Misconceptions Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('misconceptions')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {nonMuslimResources.misconceptions.title}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'misconceptions' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'misconceptions' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10 max-h-[600px] overflow-y-auto">
                  {nonMuslimResources.misconceptions.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                      {section.resources.length > 0 && <ResourceList resources={section.resources} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other Religions Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('otherReligions')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  Other Religions
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'otherReligions' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'otherReligions' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{nonMuslimResources.otherReligions.hinduism.title}</h4>
                      {nonMuslimResources.otherReligions.hinduism.resources.length > 0 && <ResourceList resources={nonMuslimResources.otherReligions.hinduism.resources} />}
                      {nonMuslimResources.otherReligions.hinduism.resources.length === 0 && <p className="text-sm text-foreground/60 ml-4">Resources coming soon</p>}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{nonMuslimResources.otherReligions.judaism.title}</h4>
                      {nonMuslimResources.otherReligions.judaism.resources.length > 0 && <ResourceList resources={nonMuslimResources.otherReligions.judaism.resources} />}
                      {nonMuslimResources.otherReligions.judaism.resources.length === 0 && <p className="text-sm text-foreground/60 ml-4">Resources coming soon</p>}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{nonMuslimResources.otherReligions.spirituality.title}</h4>
                      {nonMuslimResources.otherReligions.spirituality.resources.length > 0 && <ResourceList resources={nonMuslimResources.otherReligions.spirituality.resources} />}
                      {nonMuslimResources.otherReligions.spirituality.resources.length === 0 && <p className="text-sm text-foreground/60 ml-4">Resources coming soon</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desires/Ideologies Section */}
            <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={() => toggleCategory('ideologies')}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {nonMuslimResources.desiresIdeologies.title}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                    expandedCategory === 'ideologies' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedCategory === 'ideologies' && (
                <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                  {nonMuslimResources.desiresIdeologies.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">{topic.title}</h4>
                      {topic.resources.length === 0 && <p className="text-sm text-foreground/60 ml-4">Resources coming soon</p>}
                      {topic.resources.length > 0 && <ResourceList resources={topic.resources} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Topic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Islam */}
            <div className="space-y-3">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center text-background">ISLAM</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Why is Islam true?</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Concepts of the Quran</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Women in Islam</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Islamic Law</p>
                </div>
              </div>
            </div>

            {/* Christianity */}
            <div className="space-y-3">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center text-background">CHRISTIANITY</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Jesus in Islam</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Trinity</p>
                </div>
              </div>
            </div>

            {/* Atheism */}
            <div className="space-y-3">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center text-background">ATHEISM</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Morality</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Epistemology</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Science and revelation</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Evolution</p>
                </div>
              </div>
            </div>

            {/* Popular Misconceptions */}
            <div className="space-y-3">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-center text-background">POPULAR MISCONCEPTIONS</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Problem of Evil</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Jihad</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Slavery</p>
                </div>
                <div className="bg-foreground/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-foreground transition-all duration-300 text-center cursor-pointer">
                  <p className="font-semibold text-background">Hadith</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-8">
            <ArrowDown className="w-8 h-8 mx-auto mb-4 animate-bounce text-[#c4b5a0]" />
            <h3 className="text-2xl sm:text-3xl font-light mb-6 text-foreground">
              EXPLORE ALL THE TOPICS<br />BELOW
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
            <h2 className="font-proxima text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-wide text-foreground">
              ADDITIONAL RESOURCES
            </h2>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Book a private info meeting */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Users className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Book a private info<br />meeting?</h3>
            </div>

            {/* Guided Reading List */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <BookOpen className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Guided Reading List</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}