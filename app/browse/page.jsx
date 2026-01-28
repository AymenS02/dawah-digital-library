'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Video,
  FileText
} from 'lucide-react';

import { muslimResources } from '../data/muslimResources';
import { nonMuslimResources } from '../data/nonMuslimResources';
import { revertResources } from '../data/revertResources';

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    hasPendingRequest: false,
    latestRequest: null,
  });
  const [checkingAccess, setCheckingAccess] = useState(true);

  const checkAccessStatus = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCheckingAccess(false);
        return;
      }
      
      const response = await fetch('/api/access-request/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAccessStatus(data);
      }
    } catch (error) {
      console.error('Failed to check access status:', error);
    } finally {
      setCheckingAccess(false);
    }
  }, []);

  useEffect(() => {
    checkAccessStatus();
  }, [checkAccessStatus]);

  /* -------------------- Helpers -------------------- */

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

  /* -------------------- All Resources -------------------- */

  const getAllResources = useMemo(() => {
    const all = {
      MUSLIMS: [],
      'NON-MUSLIMS': [],
      'NEW REVERTS': []
    };

    if (muslimResources.generalMuslims.pathways.fiqh.resources) {
      all.MUSLIMS.push(
        ...flattenResources(
          muslimResources.generalMuslims.pathways.fiqh.resources,
          'General Muslims - Fiqh Pathway'
        )
      );
    }

    muslimResources.generalMuslims.pathways.tazkiyah.topics.forEach(t =>
      t.resources &&
      all.MUSLIMS.push(
        ...flattenResources(
          t.resources,
          'General Muslims - Tazkiyah Pathway',
          t.title
        )
      )
    );

    muslimResources.generalMuslims.pathways.aqidah.topics.forEach(t =>
      t.resources &&
      all.MUSLIMS.push(
        ...flattenResources(
          t.resources,
          "General Muslims - 'Aqidah Pathway",
          t.title
        )
      )
    );

    // Only include Students of Knowledge resources if user has access
    if (accessStatus.hasAccess) {
      muslimResources.studentsOfKnowledge.components.forEach(c =>
        c.resources &&
        all.MUSLIMS.push(
          ...flattenResources(c.resources, 'Students of Knowledge', c.title)
        )
      );
    }

    muslimResources.strugglingWithFaith.sections.forEach(section =>
      section.topics.forEach(t =>
        t.resources &&
        all.MUSLIMS.push(
          ...flattenResources(
            t.resources,
            `Struggling with Faith - ${section.title}`,
            t.title
          )
        )
      )
    );

    Object.values(nonMuslimResources).forEach(cat => {
      cat.sections?.forEach(s =>
        s.resources &&
        all['NON-MUSLIMS'].push(
          ...flattenResources(s.resources, cat.title, s.title)
        )
      );
      cat.topics?.forEach(t =>
        t.resources &&
        all['NON-MUSLIMS'].push(
          ...flattenResources(t.resources, cat.title, t.title)
        )
      );
    });

    revertResources.starterPackage.sections.forEach(section => {
      section.resources &&
        all['NEW REVERTS'].push(
          ...flattenResources(section.resources, section.title)
        );

      section.categories?.forEach(c =>
        c.resources &&
        all['NEW REVERTS'].push(
          ...flattenResources(c.resources, section.title, c.title)
        )
      );
    });

    return all;
  }, [accessStatus.hasAccess]);

  /* -------------------- Sidebar Data -------------------- */

  const categoryData = useMemo(() => {
    const muslimsSidebar = [
      { name: 'General Muslims - Fiqh Pathway', subtopics: [] },
      { name: 'General Muslims - Tazkiyah Pathway', subtopics: muslimResources.generalMuslims.pathways.tazkiyah.topics.map(t => t.title) },
      { name: "General Muslims - 'Aqidah Pathway", subtopics: muslimResources.generalMuslims.pathways.aqidah.topics.map(t => t.title) }
    ];

    // Only include Students of Knowledge in sidebar if user has access
    if (accessStatus.hasAccess) {
      muslimsSidebar.push({
        name: 'Students of Knowledge',
        subtopics: muslimResources.studentsOfKnowledge.components.map(c => c.title)
      });
    }

    return {
      'NON-MUSLIMS': {
        sidebar: [
          { name: 'Islam', subtopics: nonMuslimResources.islam.sections.map(s => s.title) },
          { name: 'Christianity', subtopics: nonMuslimResources.christianity.sections.map(s => s.title) },
          { name: 'Atheism/Agnosticism', subtopics: nonMuslimResources.atheismAgnosticism.sections.map(s => s.title) },
          { name: 'Popular Misconceptions', subtopics: nonMuslimResources.misconceptions.sections.map(s => s.title) },
          { name: 'Other Religions', subtopics: nonMuslimResources.otherReligions.topics.map(t => t.title) },
          { name: 'Desires/Isms', subtopics: nonMuslimResources.desiresIdeologies.topics.map(t => t.title) },
          { name: 'Guided Reading List for Seekers', subtopics: nonMuslimResources.guidedReading.sections.map(s => s.title) }
        ]
      },
      MUSLIMS: {
        sidebar: muslimsSidebar
      },
      'NEW REVERTS': {
        sidebar: revertResources.starterPackage.sections.map(s => ({
          name: s.title,
          subtopics: s.categories?.map(c => c.title) || []
        }))
      }
    };
  }, [accessStatus.hasAccess]);

  /* -------------------- Filters -------------------- */

  const filteredResources = useMemo(() => {
    let resources = getAllResources[selectedCategory] || [];

    if (selectedSidebarItem !== null) {
      const name = categoryData[selectedCategory].sidebar[selectedSidebarItem].name;
      resources = resources.filter(r => r.category === name);
    }

    if (selectedSubtopic) {
      resources = resources.filter(r => r.topic === selectedSubtopic);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      resources = resources.filter(r =>
        r.title?.toLowerCase().includes(q) ||
        r.author?.toLowerCase().includes(q) ||
        r.topic?.toLowerCase().includes(q)
      );
    }

    return resources;
  }, [getAllResources, categoryData, selectedCategory, selectedSidebarItem, selectedSubtopic, searchQuery, accessStatus.hasAccess]);

  /* -------------------- Icons -------------------- */

  const getResourceIcon = type => {
    if (type === 'book') return <BookOpen className="w-5 h-5" />;
    if (type === 'video') return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-background text-foreground mt-16">

      {/* Top Navigation */}
      <div className="bg-foreground/90 backdrop-blur-sm py-4 px-4 sticky top-20 z-40">
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

      {/* Hero */}
      <div className="py-8 md:py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">BROWSE</h1>
        <div className="max-w-xl mx-auto relative">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full px-6 py-4 rounded-full bg-foreground text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-background/60" />
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedSidebarItem !== null || selectedSubtopic) && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-foreground/70">Active Filters:</span>
            {selectedSidebarItem !== null && (
              <button
                onClick={() => {
                  setSelectedSidebarItem(null);
                  setSelectedSubtopic(null);
                }}
                className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
              >
                {categoryData[selectedCategory].sidebar[selectedSidebarItem].name}
                <span className="text-lg leading-none">×</span>
              </button>
            )}
            {selectedSubtopic && (
              <button
                onClick={() => setSelectedSubtopic(null)}
                className="px-4 py-2 bg-foreground/80 text-background rounded-full text-sm font-medium hover:bg-foreground/70 transition-colors flex items-center gap-2"
              >
                {selectedSubtopic}
                <span className="text-lg leading-none">×</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Toggle */}
      <div className="lg:hidden px-4 mb-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors shadow-md"
        >
          Browse Categories
        </button>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-12 flex gap-8">

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-[85%] max-w-sm lg:w-72
            bg-foreground/5 backdrop-blur-sm p-6 rounded-2xl
            transform transition-transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            overflow-y-auto
            border border-foreground/10
            shadow-lg lg:shadow-none
          `}
        >
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h3 className="font-bold text-lg">CATEGORIES</h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-2xl hover:text-foreground/70 transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            {categoryData[selectedCategory].sidebar.map((item, i) => (
              <div key={i} className="border-b border-foreground/5 pb-2 last:border-0">
                <button
                  onClick={() =>
                    setSelectedSidebarItem(i === selectedSidebarItem ? null : i)
                  }
                  className={`w-full flex justify-between items-center py-3 px-3 rounded-lg font-semibold transition-all ${
                    selectedSidebarItem === i 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  <span className="text-left text-sm">{item.name}</span>
                  {item.subtopics.length > 0 && (
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      selectedSidebarItem === i ? 'rotate-90' : ''
                    }`} />
                  )}
                </button>

                {selectedSidebarItem === i && item.subtopics.length > 0 && (
                  <div className="mt-2 ml-3 space-y-1">
                    {item.subtopics.map(sub => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelectedSubtopic(sub);
                          setSidebarOpen(false);
                        }}
                        className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                          selectedSubtopic === sub
                            ? 'bg-foreground/10 font-medium'
                            : 'hover:bg-foreground/5'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-foreground/70 font-medium">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </p>
          </div>

          {/* Resource Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#c4b5a0] rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900 leading-tight flex-1 group-hover:text-gray-700 transition-colors">
                      {r.title}
                    </h3>
                    <div className="text-gray-700 flex-shrink-0">
                      {getResourceIcon(r.type)}
                    </div>
                  </div>
                  
                  {r.author && (
                    <p className="text-sm text-gray-700 mb-2">{r.author}</p>
                  )}
                  
                  {(r.category || r.topic) && (
                    <div className="text-xs text-gray-600 mb-4 space-y-1">
                      {r.category && <div className="font-medium">{r.category}</div>}
                      {r.topic && <div>{r.topic}</div>}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end mt-auto text-sm text-gray-800 font-medium group-hover:gap-2 transition-all">
                    <span>View Resource</span>
                    <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-foreground/30 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-foreground/60">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
