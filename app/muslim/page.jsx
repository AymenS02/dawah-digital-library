'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';

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

export default function MuslimsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    setOpenSection(null); // Reset section when changing dropdowns
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
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
                    <span className="text-xl font-bold text-background">Students of Knowledge</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-background transition-transform duration-300 ${
                        openDropdown === 'students' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openDropdown === 'students' && (
                  <div className="px-8 py-6 bg-background border-t border-foreground/20 max-h-[600px] overflow-y-auto">
                    <h3 className="text-lg font-bold text-foreground mb-2">{muslimResources.studentsOfKnowledge.title}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{muslimResources.studentsOfKnowledge.subtitle}</p>
                    
                    {muslimResources.studentsOfKnowledge.components.map((component, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="font-bold text-foreground mb-2">{component.title}</h4>
                        {component.subtitle && <p className="text-xs text-foreground/60 mb-2">{component.subtitle}</p>}
                        
                        {component.resources && <ResourceList resources={component.resources} />}
                        {component.institutions && (
                          <ul className="space-y-1 ml-4">
                            {component.institutions.map((inst, i) => (
                              <li key={i} className="text-sm text-foreground/80">• {inst}</li>
                            ))}
                          </ul>
                        )}
                        {component.madhahib && (
                          <div className="ml-2">
                            <h5 className="font-semibold text-sm mb-2">{component.madhahib.title}</h5>
                            {component.madhahib.schools.map((school, i) => (
                              <div key={i} className="mb-2">
                                <p className="font-medium text-sm">{school.name}</p>
                                {school.url && <a href={school.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary/80">{school.url}</a>}
                                {school.texts && (
                                  <ul className="ml-4 text-xs text-foreground/70">
                                    {school.texts.map((text, j) => <li key={j}>• {text}</li>)}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {component.usulResources && (
                          <div className="ml-2">
                            <h5 className="font-semibold text-sm mb-2">{component.usulResources.title}</h5>
                            <ResourceList resources={component.usulResources.items} />
                          </div>
                        )}
                        {component.practicalFiqh && (
                          <div className="ml-2">
                            <h5 className="font-semibold text-sm mb-2">{component.practicalFiqh.title}</h5>
                            <ResourceList resources={component.practicalFiqh.items} />
                            {component.practicalFiqh.commonQuestions && (
                              <div className="mt-3">
                                <p className="font-medium text-sm mb-1">Common Questions:</p>
                                <ResourceList resources={component.practicalFiqh.commonQuestions} />
                              </div>
                            )}
                          </div>
                        )}
                        {component.differenceOfOpinion && (
                          <div className="ml-2">
                            <h5 className="font-semibold text-sm mb-2">{component.differenceOfOpinion.title}</h5>
                            <ResourceList resources={component.differenceOfOpinion.items} />
                          </div>
                        )}
                        {component.items && <ResourceList resources={component.items} />}
                      </div>
                    ))}
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
                            {topic.resources.length > 0 && <ResourceList resources={topic.resources} />}
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