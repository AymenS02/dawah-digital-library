'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Menu, User, Book } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar'; // adjust path as needed

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    setHydrated(true);

    // Load user from localStorage (your original behavior)
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${el.offsetHeight}px`
      );
    };

    setVar();

    const ro = new ResizeObserver(() => setVar());
    ro.observe(el);

    return () => ro.disconnect();
  }, [hydrated]);

  // Avoid SSR/client mismatch like in second header
  if (!hydrated) return null;

  return (
    <>
      {/* Desktop / tablet header (hidden on very small screens, like second header) */}
      <header
        ref={headerRef}
        className="max-md:hidden fixed top-0 left-0 w-full h-fit px-2 bg-[#bdac98]/70 backdrop-blur-sm text-foreground shadow-[0_7px_7px_#bdac98]/70 z-999999"
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between p-2'>
          {/* Logo / Brand */}
          <div className="flex items-center">
            {/* <div
              className="mr-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => (window.location.href = '/')}
            >
              <Image
                src="/homepage/cali-bg.svg"
                alt="Da'wah Digital Library Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div> */}
            Dawah Digital Library
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-6 font-ovo">
            <Link
              href="/browse"
              className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
            >
              Browse
            </Link>

            <Link
              href="/resources"
              className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
            >
              Resources
            </Link>

            <Link
              href="/quiz"
              className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
            >
              Quiz
            </Link>

            <Link
              href="/about"
              className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-6 py-2 rounded-full bg-primary text-background hover:bg-accent hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
            >
              Contact
            </Link>

            {/* Auth Section */}
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-background hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span>{user.firstName}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-block text-foreground py-2 border-b-2 border-transparent hover:border-primary transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-full bg-primary text-background hover:bg-accent hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Optional dark mode toggle */}
            {/* <DarkModeToggle /> */}
          </nav>
        </div>
      </header>

      {/* Mobile header (simple bar with menu icon, using your Sidebar) */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-primary/70 backdrop-blur-[8px] text-foreground px-4 py-3 z-[9999999] shadow-[0_7px_7px_#bdac98]/70" ref={headerRef}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <Image
              src="/homepage/cali-bg.svg"
              alt="Da'wah Digital Library Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />
    </>
  );
};

export default Header;