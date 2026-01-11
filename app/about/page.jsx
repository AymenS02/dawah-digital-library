'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Heart, Users, Globe, Star, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const stat4Ref = useRef(null);

  useEffect(() => {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power4.out',
      })
      .from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from('.hero-divider', {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');

    // Mission section scroll animation
    gsap.from('.mission-content', {
      scrollTrigger: {
        trigger: missionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
    });

    // Values cards stagger animation
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: valuesRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Stats counter animation using refs
    const statsRefs = [
      { ref: stat1Ref, target: 1000 },
      { ref: stat2Ref, target: 500 },
      { ref: stat3Ref, target: 50 },
      { ref: stat4Ref, target: 24 },
    ];

    statsRefs.forEach(({ ref, target }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            ref.current.textContent = Math.ceil(this.targets()[0].textContent);
          },
        });
      }
    });

    // Team section animations
    gsap.from('.team-intro', {
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });

    // Parallax effect for decorative elements
    gsap.to('.parallax-slow', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: 200,
      ease: 'none',
    });

    gsap.to('.parallax-medium', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      y: 150,
      ease: 'none',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const values = [
    {
      icon: BookOpen,
      title: 'Knowledge',
      description: 'Providing authentic Islamic knowledge from the Quran and Sunnah',
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Approaching every individual with kindness and understanding',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building bridges and fostering meaningful connections',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making Islamic resources available to everyone, everywhere',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Committed to the highest quality in content and presentation',
    },
    {
      icon: Award,
      title: 'Authenticity',
      description: 'Staying true to the teachings of Islam in every resource',
    },
  ];

  return (
    <div className="mt-16 min-h-screen bg-background text-foreground overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-10 opacity-5 pointer-events-none parallax-slow z-0">
        <Image 
          src="/homepage/cali-bg.svg" 
          alt="Decorative" 
          width={400} 
          height={400}
          className="object-contain"
        />
      </div>
      <div className="fixed bottom-20 left-10 opacity-5 pointer-events-none parallax-medium z-0">
        <Image 
          src="/homepage/cali-bg.svg" 
          alt="Decorative" 
          width={300} 
          height={300}
          className="object-contain rotate-180"
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="hero-title font-barlow text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight text-foreground">
            ABOUT US
          </h1>
          <div className="hero-divider w-32 h-1 bg-primary mx-auto mb-8"></div>
          <p className="hero-subtitle font-palanquin text-xl sm:text-2xl md:text-3xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Illuminating hearts and minds through the timeless wisdom of Islam
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="relative py-16 px-4 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <div className="mission-content grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-barlow text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
                OUR MISSION
              </h2>
              <div className="w-24 h-1 bg-primary mb-6"></div>
              <p className="font-palanquin text-lg text-foreground/80 mb-6 leading-relaxed">
                The Da&apos;wah Digital Library was created to provide accessible, authentic Islamic resources
                for everyone—whether you&apos;re exploring Islam for the first time, newly embracing the faith,
                or deepening your existing knowledge.
              </p>
              <p className="font-palanquin text-lg text-foreground/80 leading-relaxed">
                We believe that knowledge is the foundation of faith, and we&apos;re committed to making that
                knowledge available to all seekers of truth, regardless of where they are in their spiritual
                journey.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-32 h-32 text-primary mx-auto mb-6" />
                  <p className="font-palanquin text-2xl text-foreground/90 font-semibold">
                    Spreading Light<br />Through Knowledge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-barlow text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
              OUR VALUES
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-palanquin text-lg text-foreground/70 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-foreground/10"
              >
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-barlow text-2xl font-bold mb-4 text-foreground">
                  {value.title}
                </h3>
                <p className="font-palanquin text-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="relative py-20 px-4 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-barlow text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
              OUR IMPACT
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-background rounded-2xl border border-foreground/10">
              <div ref={stat1Ref} className="font-barlow text-5xl md:text-6xl font-bold text-primary mb-2">
                0
              </div>
              <p className="font-palanquin text-lg text-foreground/70">Resources Available</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl border border-foreground/10">
              <div ref={stat2Ref} className="font-barlow text-5xl md:text-6xl font-bold text-primary mb-2">
                0
              </div>
              <p className="font-palanquin text-lg text-foreground/70">Topics Covered</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl border border-foreground/10">
              <div ref={stat3Ref} className="font-barlow text-5xl md:text-6xl font-bold text-primary mb-2">
                0
              </div>
              <p className="font-palanquin text-lg text-foreground/70">Languages Supported</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl border border-foreground/10">
              <div ref={stat4Ref} className="font-barlow text-5xl md:text-6xl font-bold text-primary mb-2">
                0
              </div>
              <p className="font-palanquin text-lg text-foreground/70">Hours Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-20 px-4 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="team-intro">
            <h2 className="font-barlow text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
              BUILT WITH PASSION
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="font-palanquin text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
              This project is a labor of love, created by dedicated individuals who believe in the power
              of accessible Islamic education. We&apos;re part of the Muslim Student Association (MSA) community,
              working to make authentic Islamic knowledge available to everyone.
            </p>
            <p className="font-palanquin text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-12">
              Whether you&apos;re seeking answers, looking for resources, or wanting to deepen your understanding,
              we&apos;re here to support your journey with carefully curated content and genuine care.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-background px-8 py-4 rounded-lg font-bold font-palanquin transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                GET IN TOUCH
              </a>
              <a
                href="/browse"
                className="bg-foreground/10 hover:bg-foreground/20 text-foreground px-8 py-4 rounded-lg font-bold font-palanquin transition-all duration-300 hover:scale-105 border border-foreground/20"
              >
                EXPLORE RESOURCES
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
