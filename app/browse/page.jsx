'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, ExternalLink, BookOpen, Video, FileText } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import { nonMuslimResources } from '../data/nonMuslimResources';
import { revertResources } from '../data/revertResources';

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to flatten resources from nested structures
  const flattenResources = (data, category, topic = null, subtopic = null) => {
    const resources = [];
    
    if (Array.isArray(data)) {
      data.forEach(resource => {
        if (resource.url || resource.title) {
          resources.push({
            ...resource,
            category,
            topic,
            subtopic
          });
        }
      });
    }
    
    return resources;
  };

  // Extract all resources for each category
  const getAllResources = useMemo(() => {
    const allResources = {
      'MUSLIMS': [],
      'NON-MUSLIMS': [],
      'NEW REVERTS': []
    };

    // Muslims resources
    // Fiqh Pathway
    if (muslimResources.generalMuslims.pathways.fiqh.resources) {
      allResources['MUSLIMS'].push(...flattenResources(
        muslimResources.generalMuslims.pathways.fiqh.resources,
        'General Muslims - Fiqh Pathway',
        'Fiqh Resources'
      ));
    }

    // Tazkiyah Pathway
    muslimResources.generalMuslims.pathways.tazkiyah.topics.forEach(topic => {
      if (topic.resources) {
        allResources['MUSLIMS'].push(...flattenResources(
          topic.resources,
          'General Muslims - Tazkiyah Pathway',
          topic.title
        ));
      }
    });

    // Aqidah Pathway
    muslimResources.generalMuslims.pathways.aqidah.topics.forEach(topic => {
      if (topic.resources) {
        allResources['MUSLIMS'].push(...flattenResources(
          topic.resources,
          'General Muslims - \'Aqidah Pathway',
          topic.title
        ));
      }
    });

    // Students of Knowledge
    muslimResources.studentsOfKnowledge.components.forEach(component => {
      if (component.resources) {
        allResources['MUSLIMS'].push(...flattenResources(
          component.resources,
          'Students of Knowledge',
          component.title
        ));
      }
    });

    // Struggling with Faith
    muslimResources.strugglingWithFaith.sections.forEach(section => {
      section.topics.forEach(topic => {
        if (topic.resources) {
          allResources['MUSLIMS'].push(...flattenResources(
            topic.resources,
            `Struggling with Faith - ${section.title}`,
            topic.title
          ));
        }
      });
    });

    // Non-Muslims resources
    Object.entries(nonMuslimResources).forEach(([key, categoryData]) => {
      if (categoryData.sections) {
        categoryData.sections.forEach(section => {
          if (section.resources) {
            allResources['NON-MUSLIMS'].push(...flattenResources(
              section.resources,
              categoryData.title,
              section.title
            ));
          }
        });
      }
      if (categoryData.topics) {
        categoryData.topics.forEach(topic => {
          if (topic.resources) {
            allResources['NON-MUSLIMS'].push(...flattenResources(
              topic.resources,
              categoryData.title,
              topic.title
            ));
          }
        });
      }
    });

    // Revert resources
    revertResources.starterPackage.sections.forEach(section => {
      if (section.resources) {
        allResources['NEW REVERTS'].push(...flattenResources(
          section.resources,
          section.title
        ));
      }
      if (section.categories) {
        section.categories.forEach(subcat => {
          if (subcat.resources) {
            allResources['NEW REVERTS'].push(...flattenResources(
              subcat.resources,
              section.title,
              subcat.title
            ));
          }
          if (subcat.categories) {
            subcat.categories.forEach(subsubcat => {
              if (subsubcat.resources) {
                allResources['NEW REVERTS'].push(...flattenResources(
                  subsubcat.resources,
                  section.title,
                  subcat.title,
                  subsubcat.title
                ));
              }
            });
          }
        });
      }
    });

    return allResources;
  }, []);

  // Build category data from the resource files
  const categoryData = {
    'NON-MUSLIMS': {
      sidebar: [
        { 
          name: 'Islam', 
          subtopics: nonMuslimResources.islam.sections.map(s => s.title) 
        },
        { 
          name: 'Christianity', 
          subtopics: nonMuslimResources.christianity.sections.map(s => s.title) 
        },
        { 
          name: 'Atheism/Agnosticism', 
          subtopics: nonMuslimResources.atheismAgnosticism.sections.map(s => s.title) 
        },
        { 
          name: 'Popular Misconceptions', 
          subtopics: nonMuslimResources.misconceptions.sections.map(s => s.title) 
        },
        { 
          name: 'Hinduism/Buddhism', 
          subtopics: [] 
        },
        { 
          name: 'Judaism', 
          subtopics: [] 
        },
        { 
          name: 'Spirituality', 
          subtopics: [] 
        },
        { 
          name: 'Desires/Isms', 
          subtopics: nonMuslimResources.desiresIdeologies.topics.map(t => t.title) 
        }
      ]
    },
    'MUSLIMS': {
      sidebar: [
        { 
          name: 'General Muslims - Fiqh Pathway', 
          subtopics: [] 
        },
        { 
          name: 'General Muslims - Tazkiyah Pathway', 
          subtopics: muslimResources.generalMuslims.pathways.tazkiyah.topics.map(t => t.title) 
        },
        { 
          name: 'General Muslims - \'Aqidah Pathway', 
          subtopics: muslimResources.generalMuslims.pathways.aqidah.topics.map(t => t.title) 
        },
        { 
          name: 'Students of Knowledge', 
          subtopics: muslimResources.studentsOfKnowledge.components.map(c => c.title) 
        },
        { 
          name: 'Struggling with Faith - Societal Pressure', 
          subtopics: muslimResources.strugglingWithFaith.sections[0].topics.map(t => t.title) 
        },
        { 
          name: 'Struggling with Faith - Desires & Addictions', 
          subtopics: muslimResources.strugglingWithFaith.sections[1].topics.map(t => t.title) 
        },
        { 
          name: 'Struggling with Faith - Community', 
          subtopics: muslimResources.strugglingWithFaith.sections[2].topics.map(t => t.title) 
        }
      ]
    },
    'NEW REVERTS': {
      sidebar: revertResources.starterPackage.sections.map(section => ({
        name: section.title,
        subtopics: section.categories ? section.categories.map(c => c.title) : []
      }))
    }
  };

  const toggleSidebarItem = (index) => {
    setSelectedSidebarItem(selectedSidebarItem === index ? null : index);
    setSelectedSubtopic(null); // Reset subtopic when changing sidebar item
  };

  const selectSubtopic = (subtopic) => {
    setSelectedSubtopic(subtopic);
  };

  // Filter resources based on category, sidebar selection, subtopic, and search
  const filteredResources = useMemo(() => {
    let resources = getAllResources[selectedCategory] || [];

    // Filter by sidebar item
    if (selectedSidebarItem !== null) {
      const sidebarItemName = categoryData[selectedCategory].sidebar[selectedSidebarItem].name;
      resources = resources.filter(r => r.category === sidebarItemName);
    }

    // Filter by subtopic
    if (selectedSubtopic) {
      resources = resources.filter(r => r.topic === selectedSubtopic);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      resources = resources.filter(r => 
        (r.title && r.title.toLowerCase().includes(query)) ||
        (r.author && r.author.toLowerCase().includes(query)) ||
        (r.topic && r.topic.toLowerCase().includes(query)) ||
        (r.category && r.category.toLowerCase().includes(query))
      );
    }

    return resources;
  }, [selectedCategory, selectedSidebarItem, selectedSubtopic, searchQuery, getAllResources, categoryData]);

  // Get resource type icon
  const getResourceIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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
              setSelectedSidebarItem(null);
              setSelectedSubtopic(null);
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
              setSelectedSidebarItem(null);
              setSelectedSubtopic(null);
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
              setSelectedSidebarItem(null);
              setSelectedSubtopic(null);
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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-foreground">
            BROWSE
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search a topic or resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full bg-foreground text-background placeholder-background/60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-background/60" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 bg-foreground/10 rounded-2xl p-6 h-fit sticky top-32">
            <h3 className="text-xl font-bold mb-4 text-foreground">SELECT A CATEGORY</h3>
            <div className="space-y-2">
              {categoryData[selectedCategory].sidebar.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleSidebarItem(index)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-foreground/20 transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="font-semibold text-foreground group-hover:text-primary">{item.name}</span>
                    {item.subtopics.length > 0 && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          selectedSidebarItem === index ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                  {selectedSidebarItem === index && item.subtopics.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.subtopics.map((subtopic, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => selectSubtopic(subtopic)}
                          className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                            selectedSubtopic === subtopic
                              ? 'bg-foreground/30 text-primary font-semibold'
                              : 'hover:bg-foreground/20 text-foreground/80 hover:text-primary'
                          }`}
                        >
                          {subtopic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Content Grid */}
          <div className="flex-1">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg">
                  {searchQuery.trim() 
                    ? 'No resources found matching your search.' 
                    : 'Select a category from the sidebar to view resources.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#c4b5a0] rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[200px]"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                              {resource.title || 'Untitled Resource'}
                            </h3>
                            {resource.author && (
                              <p className="text-gray-600 text-sm mb-2">
                                by {resource.author}
                              </p>
                            )}
                          </div>
                          {resource.type && (
                            <div className="ml-2 text-gray-700">
                              {getResourceIcon(resource.type)}
                            </div>
                          )}
                        </div>
                        {resource.topic && (
                          <p className="text-gray-600 text-xs mb-1 line-clamp-1">
                            Topic: {resource.topic}
                          </p>
                        )}
                        {resource.category && (
                          <p className="text-gray-600 text-xs line-clamp-1">
                            Category: {resource.category}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-end mt-4 text-gray-700">
                        <span className="text-sm mr-2">View Resource</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
                
                {/* Results count */}
                <div className="text-center py-4">
                  <p className="text-foreground/60">
                    Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}