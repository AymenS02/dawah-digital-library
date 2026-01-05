import React from 'react';
import { Users, Hand, Book, Smartphone, ArrowDown } from 'lucide-react';

export default function NewRevertsPage() {
  return (
    <div className="mt-42 min-h-screen bg-background text-white">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            NEW REVERTS
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Begin your journey with foundational knowledge and practical guidance
          </p>
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
          
          {/* Learning Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Foundation of Tawhid */}
            <div className="group">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
                <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl font-bold text-gray-800">1</span>
                </div>
                <h3 className="text-xl text-background font-bold mb-3">Foundations of Tawhid</h3>
                <p className="text-sm text-background">Understanding the oneness of Allah</p>
              </div>
            </div>

            {/* Fiqh Basics */}
            <div className="group">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
                <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl font-bold text-gray-800">2</span>
                </div>
                <h3 className="text-xl text-background font-bold mb-3">Fiqh Basics</h3>
                <p className="text-sm text-background">Essential Islamic jurisprudence</p>
              </div>
            </div>

            {/* Learning Salah */}
            <div className="group">
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
            <div className="group">
              <div className="bg-foreground backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-500/30 h-full flex flex-col justify-center items-center text-center cursor-pointer">
                <div className="w-16 h-16 bg-[#c4b5a0] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl font-bold text-gray-800">4</span>
                </div>
                <h3 className="text-xl text-background font-bold mb-3">Prophetic Character</h3>
                <p className="text-sm text-background">Learn from the best example</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-8">
            <ArrowDown className="w-8 h-8 mx-auto mb-4 animate-bounce text-[#c4b5a0]" />
            <h3 className="text-2xl sm:text-3xl font-light mb-6">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Finding Muslim Friends */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Users className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Finding Muslim Friends</h3>
              <p className="text-sm text-background">Connect with your local community</p>
            </div>

            {/* Simple Du'a Collection */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Hand className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Simple Du'a Collection</h3>
              <p className="text-sm text-background">Daily supplications to memorize</p>
            </div>

            {/* Local Community Directory */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
              <div className="bg-[#c4b5a0]/20 p-6 rounded-full mb-6 group-hover:bg-[#c4b5a0]/30 transition-all duration-300">
                <Book className="w-16 h-16 text-[#c4b5a0] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl text-background font-bold mb-2">Local Community Directory</h3>
              <p className="text-sm text-background">Find mosques and Islamic centers</p>
            </div>

            {/* Helpful Apps to Download */}
            <div className="bg-foreground backdrop-blur-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer border border-gray-600/30 hover:border-[#c4b5a0]/50">
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