'use client'
import React, { useState, useEffect } from 'react'
import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import Sidebar from './Sidebar' // adjust path as needed

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm text-foreground p-4 z-50'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {/* Logo/Brand */}
          <div onClick={() => window.location.href = '/'} className='text-xl sm:text-2xl font-bold hover:scale-110 transition-transform duration-300 cursor-pointer'>
            <Image
              src="/homepage/cali-bg.svg"
              alt="Da'wah Digital Library Logo"
              width={28}
              height={28}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-6 lg:gap-8'>
            <a href="/browse" className='hover:text-primary transition-colors duration-300'>
              Browse
            </a>
            <a href="/resources" className='hover:text-primary transition-colors duration-300'>
              Resources
            </a>
            <a href="/quiz" className='hover:text-primary transition-colors duration-300'>
              Quiz
            </a>
            <a href="/about" className='hover:text-primary transition-colors duration-300'>
              About
            </a>
            <a href="/faq" className='hover:text-primary transition-colors duration-300'>
              FAQ
            </a>
            <a href="/contact" className='bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300'>
              Contact
            </a>
            
            {/* Auth Section */}
            {user ? (
              <div className='flex items-center gap-4'>
                {user.role === 'ADMIN' && (
                  <a href="/admin/dashboard" className='hover:text-primary transition-colors duration-300'>
                    Admin Dashboard
                  </a>
                )}
                <a href="/settings" className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                  <User className='w-5 h-5' />
                  <span>{user.firstName}</span>
                </a>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <a href="/login" className='hover:text-primary transition-colors duration-300'>
                  Login
                </a>
                <a href="/register" className='bg-primary/20 text-primary px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300'>
                  Sign Up
                </a>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden p-2'
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className='w-6 h-6' />
          </button>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}

export default Header