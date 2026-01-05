'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-background text-foreground z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full p-6'>
          {/* Close button */}
          <button onClick={onClose} className='self-end mb-8'>
            <X className='w-6 h-6' />
          </button>

          {/* Navigation links */}
          <nav className='flex flex-col gap-6'>
            <a href="#browse" onClick={onClose} className='text-lg hover:text-primary transition-colors duration-300'>
              Browse
            </a>
            <a href="#quiz" onClick={onClose} className='text-lg hover:text-primary transition-colors duration-300'>
              Quiz
            </a>
            <a href="#about" onClick={onClose} className='text-lg hover:text-primary transition-colors duration-300'>
              About
            </a>
            <a href="#faq" onClick={onClose} className='text-lg hover:text-primary transition-colors duration-300'>
              FAQ
            </a>
            <a href="#contact" onClick={onClose} className='bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 text-center mt-4'>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar