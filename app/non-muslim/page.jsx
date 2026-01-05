import React from 'react';
import { Users, BookOpen, ArrowDown } from 'lucide-react';

export default function NonMuslimsPage() {
  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground">
            NON-MUSLIMS
          </h1>
        </div>
      </div>

      {/* Section Overview */}
      <div className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 tracking-wide text-foreground">
              SECTION OVERVIEW
            </h2>
            <div className="w-24 h-1 bg-[#c4b5a0] mx-auto mb-12"></div>
          </div>
          
          {/* Topic Categories */}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-wide text-foreground">
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