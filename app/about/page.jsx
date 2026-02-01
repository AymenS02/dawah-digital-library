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
      .from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power4.out' })
      .from('.hero-subtitle', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-divider', { scaleX: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    // Mission section scroll animation
    gsap.from('.mission-content', {
      scrollTrigger: { trigger: missionRef.current, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' },
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
    });

    // Values cards stagger animation
    gsap.from('.value-card', {
      scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Stats counter animation
    const statsRefs = [
      { ref: stat1Ref, target: 1000 },
      { ref: stat2Ref, target: 500 },
      { ref: stat3Ref, target: 50 },
      { ref: stat4Ref, target: 24 },
    ];

    statsRefs.forEach(({ ref, target }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
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
      scrollTrigger: { trigger: teamRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });

    // Parallax effect
    gsap.to('.parallax-slow', { scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }, y: 200, ease: 'none' });
    gsap.to('.parallax-medium', { scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.5 }, y: 150, ease: 'none' });

    return () => { ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, []);

  const values = [
    { icon: BookOpen, title: 'Knowledge', description: 'Providing authentic Islamic knowledge from the Qur’an, Sunnah, and classical scholarship' },
    { icon: Heart, title: 'Compassion', description: 'Approaching every individual with understanding and care' },
    { icon: Users, title: 'Community', description: 'Connecting seekers to support groups, teachers, and mentorship opportunities' },
    { icon: Globe, title: 'Accessibility', description: 'Making Islamic resources available to everyone, everywhere' },
    { icon: Star, title: 'Excellence', description: 'Committed to high-quality content and structured learning' },
    { icon: Award, title: 'Authenticity', description: 'Ensuring all materials are rooted in sound methodology and classical Sunni scholarship' },
  ];

  return (
    <div className="mt-16 min-h-screen bg-background text-foreground overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-20 right-10 opacity-5 pointer-events-none parallax-slow z-0">
        <Image src="/homepage/allah.svg" alt="Decorative" width={400} height={400} className="object-contain" />
      </div>
      <div className="fixed bottom-20 left-10 opacity-5 pointer-events-none parallax-medium z-0">
        <Image src="/homepage/allah.svg" alt="Decorative" width={300} height={300} className="object-contain" />
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="hero-title font-barlow text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight text-foreground">
            ABOUT US
          </h1>
          <div className="hero-divider w-32 h-1 bg-primary mx-auto mb-8"></div>
          <p className="hero-subtitle font-palanquin text-xl sm:text-2xl md:text-3xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Da’wah Digital Library provides structured, authentic Islamic knowledge to guide individuals in their spiritual journey.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="relative py-16 px-4 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <div className="mission-content grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-barlow text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">OUR MISSION</h2>
              <div className="w-24 h-1 bg-primary mb-6"></div>
              <p className="font-palanquin text-lg text-foreground/80 leading-relaxed mb-4">
                To establish a unified, accessible, and methodologically sound library of Islamic resources that guides individuals across diverse backgrounds, struggles, and worldviews towards clarity, conviction, and a structured pathway of Islamic learning.
              </p>
              <h3 className="font-barlow text-2xl font-semibold mb-2 text-foreground">Core Objectives</h3>
              <ul className="font-palanquin text-foreground/70 list-disc list-inside space-y-2">
                <li><strong>Centralization:</strong> Consolidate reliable, authentically sourced Islamic materials in one platform.</li>
                <li><strong>Personalization:</strong> Use an intake quiz to categorize users and direct them to the most relevant resource pathways.</li>
                <li><strong>Methodology:</strong> Promote structured Islamic learning rather than fatwa shopping.</li>
                <li><strong>Support & Stability:</strong> Serve as a companion resource for Muslims navigating modern challenges.</li>
                <li><strong>Da‘wah Expansion:</strong> Offer clean, articulate answers to non-Muslims exploring Islam.</li>
                <li><strong>Community Integration:</strong> Connect users to local programs, teachers, support groups, and mentorship opportunities.</li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-32 h-32 text-primary mx-auto mb-6" />
                  <p className="font-palanquin text-2xl text-foreground/90 font-semibold">
                    Structured Learning<br />Guided by Authenticity
                  </p>
                </div>
              </div>
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
