'use client';

import React, { useState } from 'react';
import { Users, Hand, BookOpen, Smartphone, UserPlus } from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');

  const resourceData = {
    'NON-MUSLIMS': {
      resources: [
        { icon: <UserPlus className="w-16 h-16" />, title: 'Book a private info meeting?' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Guided Reading List' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download' }
      ]
    },
    'MUSLIMS': {
      resources: [
        { icon: <Users className="w-16 h-16" />, title: 'Finding Muslim Friends' },
        { icon: <Hand className="w-16 h-16" />, title: 'Simple Du\'a Collection' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Local Community Directory' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download' },
        { icon: <UserPlus className="w-16 h-16" />, title: 'Book a private info meeting?' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Guided Reading List' }
      ]
    },
    'NEW REVERTS': {
      resources: [
        { icon: <Users className="w-16 h-16" />, title: 'Finding Muslim Friends' },
        { icon: <Hand className="w-16 h-16" />, title: 'Simple Du\'a Collection' },
        { icon: <BookOpen className="w-16 h-16" />, title: 'Local Community Directory' },
        { icon: <Smartphone className="w-16 h-16" />, title: 'Helpful Apps to Download' }
      ]
    }
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
              <span className="font-semibold">Da'wah Instagram:</span> @example_dawah
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 font-palanquin">
        <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resourceData[selectedCategory].resources.map((resource, index) => (
              <div
                key={index}
                className="bg-foreground/20 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-foreground/20 hover:border-primary/50"
              >
                <div className="bg-foreground/10 p-6 rounded-full mb-6 group-hover:bg-foreground/20 transition-all duration-300">
                  <div className="text-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {resource.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}