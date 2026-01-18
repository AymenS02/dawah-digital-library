'use client';

import React, { useState } from 'react';
import { ExternalLink, UserPlus, BookOpen, Smartphone, Users, Hand } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import { nonMuslimResources } from '../data/nonMuslimResources';
import { revertResources } from '../data/revertResources';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');

  const resourceData = {
    'NON-MUSLIMS': {
      resources: [
        { icon: <UserPlus className="w-16 h-16" />, title: 'Book a private info meeting?', href: '/contact' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Guided Reading List', href: '/non-muslim' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download', href: '/apps' },
      ],
    },
    MUSLIMS: {
      resources: [
        { icon: <Users className="w-16 h-16" />, title: 'Finding Muslim Friends' },
        { icon: <Hand className="w-16 h-16" />, title: "Simple Du'a Collection" },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Local Community Directory' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download', href: '/apps' },
        { icon: <UserPlus className="w-16 h-16" />, title: 'Book a private info meeting?', href: '/contact' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Guided Reading List', href: '/muslim' },
      ],
    },
    'NEW REVERTS': {
      resources: [
        { icon: <Users className="w-16 h-16" />, title: 'Finding Muslim Friends', href: '/revert' },
        { icon: <Hand className="w-16 h-16" />, title: "Simple Du'a Collection", href: '/revert' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Local Community Directory', href: '/revert' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download', href: '/apps' },
      ],
    },
  };

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="bg-foreground/90 backdrop-blur-sm py-4 px-4 sticky top-26 z-40">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 md:gap-16">
          <button
            onClick={() => setSelectedCategory('NON-MUSLIMS')}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'NON-MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            NON-MUSLIMS
          </button>
          <button
            onClick={() => setSelectedCategory('MUSLIMS')}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            MUSLIMS
          </button>
          <button
            onClick={() => setSelectedCategory('NEW REVERTS')}
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
        <div className="max-w-7xl mx-auto">
          <h1 className="relative font-proxima text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">RESOURCES</span>
            <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">RESOURCES</span>
            <span className="relative">RESOURCES</span>
          </h1>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">CONTACT US</h2>
          <div className="space-y-3 text-foreground/80 font-palanquin">
            <p className="text-lg">
              <span className="font-semibold">
                Dawah E-Mail:{' '}
                <a href="mailto:dawah@macmsa.com" className="text-primary hover:underline">
                  dawah@macmsa.com
                </a>
              </span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">
                Admin E-Mail:{' '}
                <a href="mailto:somasabori7662@gmail.com" className="text-primary hover:underline">
                  somasabori7662@gmail.com
                </a>
              </span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">MSA Website:</span>{' '}
              <a href="https://macmsa.com" className="text-primary hover:underline">
                macmsa.com
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">MSA Instagram:</span>{' '}
              <a href="https://instagram.com/macmsa" className="text-primary hover:underline">
                @macmsa
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Da&apos;wah Instagram:</span>{' '}
              <a href="https://instagram.com/macmsa_dawah" className="text-primary hover:underline">
                @macmsa_dawah
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Tazkiyah Instagram:</span>{' '}
              <a href="https://www.instagram.com/tazkiyah_/" className="text-primary hover:underline">
                @tazkiyah_
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Resources Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16 font-palanquin">
        {/* Resource cards grid driven by selectedCategory */}
        <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resourceData[selectedCategory].resources.map((resource, index) => (
              <div
                key={index}
                onClick={() => {
                  if (resource.href) {
                    window.location.href = resource.href;
                  }
                }}
                className="bg-foreground/20 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-foreground/20 hover:border-primary/50"
              >
                <div className="bg-foreground/10 p-6 rounded-full mb-6 group-hover:bg-foreground/20 transition-all duration-300">
                  <div className="text-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* MUSLIMS category detailed content */}
        {selectedCategory === 'MUSLIMS' && (
          <div className="space-y-8">
            {/* Tazkiyah Pathway */}
            {muslimResources.generalMuslims.pathways.tazkiyah && (
              <div className="mb-8 bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {muslimResources.generalMuslims.pathways.tazkiyah.title}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {muslimResources.generalMuslims.pathways.tazkiyah.subtitle}
                </p>
                {muslimResources.generalMuslims.pathways.tazkiyah.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{topic.title}</h4>
                    <div className="space-y-2 ml-4">
                      {topic.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <div>
                            <span>{resource.title || 'Resource'}</span>
                            {resource.author && <span className="text-sm"> - {resource.author}</span>}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aqidah Pathway */}
            {muslimResources.generalMuslims.pathways.aqidah && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {muslimResources.generalMuslims.pathways.aqidah.title}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {muslimResources.generalMuslims.pathways.aqidah.subtitle}
                </p>
                {muslimResources.generalMuslims.pathways.aqidah.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{topic.title}</h4>
                    <div className="space-y-2 ml-4">
                      {topic.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <div>
                            <span>{resource.title || 'Resource'}</span>
                            {resource.author && <span className="text-sm"> - {resource.author}</span>}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Students of Knowledge Section */}
            <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl mb-2 font-barlow text-primary">
                {muslimResources.studentsOfKnowledge.title}
              </h2>
              <p className="text-foreground/70 mb-6">{muslimResources.studentsOfKnowledge.subtitle}</p>
              {muslimResources.studentsOfKnowledge.components.map((component, index) => (
                <div key={index} className="mb-6 bg-foreground/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{component.title}</h3>
                  {component.subtitle && (
                    <p className="text-foreground/70 mb-3">{component.subtitle}</p>
                  )}
                  {component.resources && (
                    <div className="space-y-2 ml-4">
                      {component.resources.map((resource, resIndex) => (
                        <div key={resIndex}>
                          {resource.url ? (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                            >
                              <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                              <div>
                                <span>{resource.title}</span>
                                {resource.author && (
                                  <span className="text-sm"> - {resource.author}</span>
                                )}
                                {resource.description && (
                                  <p className="text-sm text-foreground/60">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          ) : (
                            <div className="flex items-start gap-2 text-foreground/80 p-2">
                              <span className="w-4 h-4 mt-1 flex-shrink-0">•</span>
                              <div>
                                <span>{resource.title}</span>
                                {resource.description && (
                                  <p className="text-sm text-foreground/60">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Muslims Struggling with Faith Section */}
            <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                {muslimResources.strugglingWithFaith.title}
              </h2>
              {muslimResources.strugglingWithFaith.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                  {section.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {topic.title}
                      </h4>
                      {topic.resources && topic.resources.length > 0 && (
                        <div className="space-y-2 ml-4">
                          {topic.resources.map((resource, resIndex) => (
                            <a
                              key={resIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                            >
                              <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                              <span>{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NON-MUSLIMS category detailed content */}
        {selectedCategory === 'NON-MUSLIMS' && (
          <div className="space-y-8">
            {/* Islam Section */}
            {nonMuslimResources.islam && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.islam.title}
                </h2>
                {nonMuslimResources.islam.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                    <div className="space-y-2 ml-4">
                      {section.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Christianity Section */}
            {nonMuslimResources.christianity && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.christianity.title}
                </h2>
                {nonMuslimResources.christianity.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                    <div className="space-y-2 ml-4">
                      {section.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Atheism/Agnosticism Section */}
            {nonMuslimResources.atheismAgnosticism && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.atheismAgnosticism.title}
                </h2>
                {nonMuslimResources.atheismAgnosticism.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                    <div className="space-y-2 ml-4">
                      {section.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Misconceptions Section */}
            {nonMuslimResources.misconceptions && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.misconceptions.title}
                </h2>
                {nonMuslimResources.misconceptions.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                    <div className="space-y-2 ml-4">
                      {section.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other Religions Section */}
            {nonMuslimResources.otherReligions && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.otherReligions.title}
                </h2>

                {nonMuslimResources.otherReligions.hinduism && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {nonMuslimResources.otherReligions.hinduism.title}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.hinduism.resources.map(
                        (resource, resIndex) => (
                          <a
                            key={resIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                          >
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{resource.title}</span>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}

                {nonMuslimResources.otherReligions.spirituality && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {nonMuslimResources.otherReligions.spirituality.title}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.spirituality.resources.map(
                        (resource, resIndex) => (
                          <a
                            key={resIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                          >
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{resource.title}</span>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}

                {nonMuslimResources.otherReligions.judaism && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {nonMuslimResources.otherReligions.judaism.title}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.judaism.resources.map(
                        (resource, resIndex) => (
                          <a
                            key={resIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                          >
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{resource.title}</span>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Desires/Ideologies Section */}
            {nonMuslimResources.desiresIdeologies && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.desiresIdeologies.title}
                </h2>
                {nonMuslimResources.desiresIdeologies.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{topic.title}</h3>
                    <div className="space-y-2 ml-4">
                      {topic.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Guided Reading List */}
            {nonMuslimResources.guidedReading && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {nonMuslimResources.guidedReading.title}
                </h2>
                {nonMuslimResources.guidedReading.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                    <div className="space-y-2 ml-4">
                      {section.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NEW REVERTS category detailed content */}
        {selectedCategory === 'NEW REVERTS' && (
          <div className="space-y-8">
            {/* Revert Starter Package */}
            {revertResources.starterPackage && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">
                  {revertResources.starterPackage.title}
                </h2>
                {revertResources.starterPackage.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                    {section.categories &&
                      section.categories.map((category, catIndex) => (
                        <div key={catIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-foreground mb-3">
                            {category.title}
                          </h4>
                          <div className="space-y-2 ml-4">
                            {category.resources.map((resource, resIndex) => (
                              <a
                                key={resIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                              >
                                <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>{resource.title}</span>
                              </a>
                            ))}
                          </div>
                          {category.categories &&
                            category.categories.map((subCategory, subCatIndex) => (
                              <div key={subCatIndex} className="mt-4 ml-4">
                                <h5 className="text-md font-semibold text-foreground mb-2">
                                  {subCategory.title}
                                </h5>
                                <div className="space-y-2 ml-4">
                                  {subCategory.resources.map((resource, resIndex) => (
                                    <a
                                      key={resIndex}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                                    >
                                      <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                                      <span>{resource.title}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    {section.resources && (
                      <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                        <div className="space-y-2 ml-4">
                          {section.resources.map((resource, resIndex) => (
                            <a
                              key={resIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                            >
                              <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                              <span>{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}