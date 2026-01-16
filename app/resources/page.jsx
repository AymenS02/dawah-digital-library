'use client';

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import { nonMuslimResources } from '../data/nonMuslimResources';
import { revertResources } from '../data/revertResources';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="bg-foreground/90 backdrop-blur-sm py-4 px-4 sticky top-16 z-40">
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
            <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">
              RESOURCES
            </span>
            <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">
              RESOURCES
            </span>
            <span className="relative">
              RESOURCES
            </span>
          </h1>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">CONTACT US</h2>
          <div className="space-y-3 text-foreground/80 font-palanquin">
            <p className="text-lg">
              <span className="font-semibold">E-Mail:</span> contact@example.com
            </p>
            <p className="text-lg">
              <span className="font-semibold">MSA Website:</span> www.example.com
            </p>
            <p className="text-lg">
              <span className="font-semibold">MSA Instagram:</span> @example_msa
            </p>
            <p className="text-lg">
              <span className="font-semibold">Da&apos;wah Instagram:</span> @example_dawah
            </p>
          </div>
        </div>
      </div>

      {/* Resources Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16 font-palanquin">
        {selectedCategory === 'MUSLIMS' && (
          <div className="space-y-8">
            {/* General Muslims Section */}
            <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{muslimResources.generalMuslims.title}</h2>
              
              {/* Fiqh Pathway */}
              {muslimResources.generalMuslims.pathways.fiqh && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{muslimResources.generalMuslims.pathways.fiqh.title}</h3>
                  <div className="space-y-2">
                    {muslimResources.generalMuslims.pathways.fiqh.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded hover:bg-foreground/5"
                      >
                        <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">{resource.title}</span>
                          {resource.author && <span className="text-sm"> - {resource.author}</span>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tazkiyah Pathway */}
              {muslimResources.generalMuslims.pathways.tazkiyah && (
                <div className="mb-8 bg-foreground/5 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{muslimResources.generalMuslims.pathways.tazkiyah.title}</h3>
                  <p className="text-foreground/70 mb-4">{muslimResources.generalMuslims.pathways.tazkiyah.subtitle}</p>
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
                <div className="bg-foreground/5 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{muslimResources.generalMuslims.pathways.aqidah.title}</h3>
                  <p className="text-foreground/70 mb-4">{muslimResources.generalMuslims.pathways.aqidah.subtitle}</p>
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
            </div>

            {/* Students of Knowledge Section */}
            <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl mb-2 font-barlow text-primary">{muslimResources.studentsOfKnowledge.title}</h2>
              <p className="text-foreground/70 mb-6">{muslimResources.studentsOfKnowledge.subtitle}</p>
              {muslimResources.studentsOfKnowledge.components.map((component, index) => (
                <div key={index} className="mb-6 bg-foreground/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{component.title}</h3>
                  {component.subtitle && <p className="text-foreground/70 mb-3">{component.subtitle}</p>}
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
                                {resource.author && <span className="text-sm"> - {resource.author}</span>}
                                {resource.description && <p className="text-sm text-foreground/60">{resource.description}</p>}
                              </div>
                            </a>
                          ) : (
                            <div className="flex items-start gap-2 text-foreground/80 p-2">
                              <span className="w-4 h-4 mt-1 flex-shrink-0">•</span>
                              <div>
                                <span>{resource.title}</span>
                                {resource.description && <p className="text-sm text-foreground/60">{resource.description}</p>}
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
              <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{muslimResources.strugglingWithFaith.title}</h2>
              {muslimResources.strugglingWithFaith.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                  {section.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">{topic.title}</h4>
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

        {selectedCategory === 'NON-MUSLIMS' && (
          <div className="space-y-8">
            {/* Islam Section */}
            {nonMuslimResources.islam && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.islam.title}</h2>
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
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.christianity.title}</h2>
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
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.atheismAgnosticism.title}</h2>
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
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.misconceptions.title}</h2>
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
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.otherReligions.title}</h2>
                
                {nonMuslimResources.otherReligions.hinduism && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{nonMuslimResources.otherReligions.hinduism.title}</h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.hinduism.resources.map((resource, resIndex) => (
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

                {nonMuslimResources.otherReligions.spirituality && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{nonMuslimResources.otherReligions.spirituality.title}</h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.spirituality.resources.map((resource, resIndex) => (
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

                {nonMuslimResources.otherReligions.judaism && (
                  <div className="mb-6 bg-foreground/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{nonMuslimResources.otherReligions.judaism.title}</h3>
                    <div className="space-y-2 ml-4">
                      {nonMuslimResources.otherReligions.judaism.resources.map((resource, resIndex) => (
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
            )}

            {/* Desires/Ideologies Section */}
            {nonMuslimResources.desiresIdeologies && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.desiresIdeologies.title}</h2>
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
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{nonMuslimResources.guidedReading.title}</h2>
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

        {selectedCategory === 'NEW REVERTS' && (
          <div className="space-y-8">
            {/* Revert Starter Package */}
            {revertResources.starterPackage && (
              <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl mb-6 font-barlow text-primary">{revertResources.starterPackage.title}</h2>
                {revertResources.starterPackage.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="mb-6 bg-foreground/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-foreground mb-3">{category.title}</h4>
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
                        {category.categories && category.categories.map((subCategory, subCatIndex) => (
                          <div key={subCatIndex} className="mt-4 ml-4">
                            <h5 className="text-md font-semibold text-foreground mb-2">{subCategory.title}</h5>
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