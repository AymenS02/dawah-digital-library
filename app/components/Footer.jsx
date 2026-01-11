import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-foreground/70 text-background mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          
          {/* About Section */}
          <div>
            <h3 className='text-xl font-bold mb-4'>About Us</h3>
            <p className='text-sm opacity-80 leading-relaxed'>
              Guiding your journey to understanding Islam through comprehensive resources and personalized learning paths.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href="/browse" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                  Browse Resources
                </a>
              </li>
              <li>
                <a href="/quiz" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                  Take the Quiz
                </a>
              </li>
              <li>
                <a href="/apps" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                  Useful Apps
                </a>
              </li>
              <li>
                <a href="/about" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Contact</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2 text-sm opacity-80'>
                <Mail className='w-4 h-4' />
                <a href="mailto:dawah@macmsa.com" className='hover:opacity-100 transition-opacity duration-300'>
                  dawah@macmsa.com
                </a>
              </li>
              <li className='flex items-center gap-2 text-sm opacity-80'>
                <Phone className='w-4 h-4' />
                <a href="tel:+1234567890" className='hover:opacity-100 transition-opacity duration-300'>
                  +1 (234) 567-890
                </a>
              </li>
              <li className='flex items-start gap-2 text-sm opacity-80'>
                <MapPin className='w-4 h-4 mt-0.5' />
                <span>123 Learning Street<br />City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <div className='flex gap-4'>
              <a href="#" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'>
                <Facebook className='w-6 h-6' />
              </a>
              <a href="#" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'>
                <Twitter className='w-6 h-6' />
              </a>
              <a href="#" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'>
                <Instagram className='w-6 h-6' />
              </a>
              <a href="#" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'>
                <Youtube className='w-6 h-6' />
              </a>
            </div>
            <p className='text-sm opacity-80 mt-4'>
              Stay connected for updates, resources, and community support.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className='border-t border-background/20 pt-8 mt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm opacity-80'>
              © {new Date().getFullYear()} Dawah Digital Library. All rights reserved.
            </p>
            <div className='flex gap-6'>
              <a href="#privacy" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                Privacy Policy
              </a>
              <a href="#terms" className='text-sm opacity-80 hover:opacity-100 transition-opacity duration-300'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer