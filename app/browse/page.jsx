'use client';

import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { muslimResources } from '../data/muslimResources';
import { nonMuslimResources } from '../data/nonMuslimResources';
import { revertResources } from '../data/revertResources';

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);

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
  };

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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-foreground">
            BROWSE
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search a topic or resource..."
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
                          className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-foreground/20 transition-all duration-300 text-foreground/80 hover:text-primary"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Resource Cards */}
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#c4b5a0] rounded-2xl aspect-square hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <p className="text-gray-800 font-semibold text-lg">Resource {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center py-8">
              <button className="text-foreground/80 hover:text-foreground font-semibold text-lg transition-all duration-300 hover:scale-105">
                LOAD MORE . . .
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}