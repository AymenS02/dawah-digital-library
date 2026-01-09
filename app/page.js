'use client';

import React from "react";

import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="">
      <section className="relative bg-[url('/homepage/hero.jpeg')] bg-cover bg-center w-full h-[60vh] min-h-[500px] flex flex-col px-4">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-amber-900/10"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Calligraphy at top */}
          <div className="flex justify-center pt-36">
            <Image
              src="/homepage/cali.png"
              alt="Bismillah"
              width={400}
              height={80}
              className="opacity-90"
            />
          </div>
          
          {/* Centered title */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Large "WELCOME" text in background */}
            <h2 className="font-old-standard absolute pt-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[8rem] lg:text-[12rem] font-bold text-white/10 whitespace-nowrap pointer-events-none select-none">
              WELCOME
            </h2>
            
            <h1 className="font-ovo text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-light tracking-wider">
              DA&apos;WAH DIGITAL<br />LIBRARY
            </h1>
            
          </div>
        </div>
      </section>

      <section className="relative flex flex-col mx-auto max-w-7xl mt-10 md:mt-20 px-4 sm:px-6 lg:px-8">

        {/* Background calligraphy image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[125%] -translate-y-[60%] pointer-events-none opacity-10 z-[-10]">
          <Image src="/homepage/cali-bg.svg" alt="Decorative calligraphy" width={800} height={800} className="object-contain" />
        </div>

        {/* All content now has relative positioning to appear above background */}
        <div className="relative z-10">
          <h2 className="font-barlow text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground text-center">
            WHERE DO YOU WANT TO START?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 py-10 mt-20">

            <div className="flex flex-col items-center w-full gap-4">
              <MapPin onClick={() => window.location.href = '/non-muslim'} className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary transition-transform hover:scale-150 duration-500 hover:-translate-y-10" />
              {/* HR with center circle */}
              <div className="relative w-full flex items-center">
                <hr className="w-full border-foreground border-2" />
                <span className="absolute left-1/2 -translate-x-1/2 bg-background border-2 border-foreground rounded-full w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-2xl text-foreground font-palanquin">Non-Muslims</h3>
            </div>

            <div className="flex flex-col items-center w-full gap-4">
              <MapPin
                onClick={() => (window.location.href = "/revert")}
                className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary transition-transform hover:scale-150 duration-500 hover:-translate-y-10"
              />
              {/* HR with center circle */}
              <div className="relative w-full flex items-center">
                <hr className="w-full border-foreground border-2" />
                <span className="absolute left-1/2 -translate-x-1/2 bg-background border-2 border-foreground rounded-full w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-2xl text-foreground font-palanquin">
                New Reverts
              </h3>
            </div>


            <div className="flex flex-col items-center w-full gap-4">
              <MapPin onClick={() => window.location.href = '/muslim'} className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary transition-transform hover:scale-150 duration-500 hover:-translate-y-10" />
              {/* HR with center circle */}
              <div className="relative w-full flex items-center">
                <hr className="w-full border-foreground border-2" />
                <span className="absolute left-1/2 -translate-x-1/2 bg-background border-2 border-foreground rounded-full w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-2xl text-foreground font-palanquin">Muslims</h3>
            </div>

          </div>

          <h1 className="font-barlow text-lg sm:text-2xl md:text-3xl lg:text-4xl text-foreground text-center mt-8">
            UNSURE?
          </h1>

          <ChevronDown className="w-10 h-10 sm:w-12 sm:h-12 text-foreground mx-auto mt-4" />

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 mt-8 mb-12">
            <h1 className="font-palanquin text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground text-center lg:text-left lg:w-1/2">
              USER INTAKE QUIZ
            </h1>

            <div className="bg-foreground w-full lg:w-1/2 h-auto p-4 sm:p-6 md:p-8 rounded-2xl">
              <p className="text-background text-lg text-center font-palanquin font-bold">
                Find out your knowledge level, goals, and preferred learning style to be directed to the most effective resources for you!
              </p>
              <button className="font-palanquin mt-4 bg-background mx-auto text-foreground px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 block" onClick={() => window.location.href = '/quiz'}>
                START HERE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}