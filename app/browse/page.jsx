'use client';

import React, { useState, useMemo } from 'react';
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

    muslimResources.studentsOfKnowledge.components.forEach(c =>
      c.resources &&
      all.MUSLIMS.push(
        ...flattenResources(c.resources, 'Students of Knowledge', c.title)
      )
    );

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
  }, []);

  /* -------------------- Sidebar Data -------------------- */

  const categoryData = useMemo(() => ({
    'NON-MUSLIMS': {
      sidebar: [
        { name: 'Islam', subtopics: nonMuslimResources.islam.sections.map(s => s.title) },
        { name: 'Christianity', subtopics: nonMuslimResources.christianity.sections.map(s => s.title) },
        { name: 'Atheism/Agnosticism', subtopics: nonMuslimResources.atheismAgnosticism.sections.map(s => s.title) },
        { name: 'Popular Misconceptions', subtopics: nonMuslimResources.misconceptions.sections.map(s => s.title) },
        { name: 'Desires/Isms', subtopics: nonMuslimResources.desiresIdeologies.topics.map(t => t.title) }
      ]
    },
    MUSLIMS: {
      sidebar: [
        { name: 'General Muslims - Fiqh Pathway', subtopics: [] },
        { name: 'General Muslims - Tazkiyah Pathway', subtopics: muslimResources.generalMuslims.pathways.tazkiyah.topics.map(t => t.title) },
        { name: "General Muslims - 'Aqidah Pathway", subtopics: muslimResources.generalMuslims.pathways.aqidah.topics.map(t => t.title) },
        { name: 'Students of Knowledge', subtopics: muslimResources.studentsOfKnowledge.components.map(c => c.title) }
      ]
    },
    'NEW REVERTS': {
      sidebar: revertResources.starterPackage.sections.map(s => ({
        name: s.title,
        subtopics: s.categories?.map(c => c.title) || []
      }))
    }
  }), []);

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
  }, [selectedCategory, selectedSidebarItem, selectedSubtopic, searchQuery]);

  /* -------------------- Icons -------------------- */

  const getResourceIcon = type => {
    if (type === 'book') return <BookOpen className="w-5 h-5" />;
    if (type === 'video') return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-background text-foreground mt-42">

      {/* Top Tabs */}
      <div className="sticky top-16 z-40 bg-foreground/90 backdrop-blur-sm py-4">
        <div className="flex gap-6 overflow-x-auto px-4 justify-start md:justify-center">
          {['NON-MUSLIMS', 'MUSLIMS', 'NEW REVERTS'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSidebarItem(null);
                setSelectedSubtopic(null);
                setSidebarOpen(false);
              }}
              className={`whitespace-nowrap font-semibold transition ${
                selectedCategory === cat
                  ? 'text-background underline underline-offset-8'
                  : 'text-background/60'
              }`}
            >
              {cat}
            </button>
          ))}
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
            className="w-full px-6 py-4 rounded-full bg-foreground text-background"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-background/60" />
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden px-4 mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full py-3 rounded-xl bg-foreground text-background font-semibold"
        >
          Browse Categories
        </button>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 flex gap-8">

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-[85%] max-w-sm lg:w-64
            bg-foreground/10 p-6 rounded-2xl
            transform transition-transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            overflow-y-auto
          `}
        >
          <div className="flex justify-between lg:hidden mb-4">
            <h3 className="font-bold">CATEGORIES</h3>
            <button onClick={() => setSidebarOpen(false)}>×</button>
          </div>

          {categoryData[selectedCategory].sidebar.map((item, i) => (
            <div key={i}>
              <button
                onClick={() =>
                  setSelectedSidebarItem(i === selectedSidebarItem ? null : i)
                }
                className="w-full flex justify-between py-2 font-semibold"
              >
                {item.name}
                {item.subtopics.length > 0 && <ChevronRight />}
              </button>

              {selectedSidebarItem === i &&
                item.subtopics.map(sub => (
                  <button
                    key={sub}
                    onClick={() => {
                      setSelectedSubtopic(sub);
                      setSidebarOpen(false);
                    }}
                    className="ml-4 py-1 text-sm text-left block"
                  >
                    {sub}
                  </button>
                ))}
            </div>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              className="bg-[#c4b5a0] rounded-2xl p-6 hover:scale-105 transition"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{r.title}</h3>
                {getResourceIcon(r.type)}
              </div>
              <p className="text-sm text-gray-700">{r.author}</p>
              <div className="flex justify-end mt-4 text-sm">
                View <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
