'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('MUSLIMS');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });

  const faqData = {
    'NON-MUSLIMS': [
      {
        question: 'What is Islam?',
        answer: 'Islam is a monotheistic Abrahamic religion that teaches that Muhammad is a messenger of God. It is the world\'s second-largest religion with over 1.8 billion followers.',
        links: ['Here is a link to a resource.', 'Here is a link to a resource.']
      },
      {
        question: 'Who is Allah?',
        answer: 'Allah is the Arabic word for God in Abrahamic religions. In Islam, Allah is the eternal, omniscient, and omnipotent creator of the universe.',
        links: ['Here is a link to a resource.']
      },
      {
        question: 'What is the Quran?',
        answer: 'The Quran is the central religious text of Islam, believed by Muslims to be a revelation from God. It is widely regarded as the finest work in classical Arabic literature.',
        links: ['Here is a link to a resource.', 'Here is a link to a resource.']
      }
    ],
    'MUSLIMS': [
      {
        question: 'When is socializing too much for a student of knowledge?',
        answer: 'Hello, here is an answer. Hello, here is an answer. Hello, here is an answer. Hello, here is an answer. Hello, here is an answer. Hello, here is an answer. Hello, here is an answer. Hello, here is an answer.',
        links: ['Here is a link to a resource.', 'Here is a link to a resource.']
      },
      {
        question: 'Raising righteous children: Practical Guidance for Today\'s Parents',
        answer: 'Comprehensive guidance on raising children with Islamic values in the modern world.',
        links: []
      },
      {
        question: 'Can Muslims stand united despite differences in Creed?',
        answer: 'Understanding unity and diversity within the Muslim community.',
        links: []
      },
      {
        question: 'Risalah Fi Usul Al-Tafsir by Imam al-Suyuti',
        answer: 'Classical text on the principles of Quranic interpretation.',
        links: []
      },
      {
        question: 'Attack on Islam in Europe',
        answer: 'Addressing contemporary challenges facing Muslims in Europe.',
        links: []
      }
    ],
    'NEW REVERTS': [
      {
        question: 'How do I pray Salah?',
        answer: 'Salah is the Islamic prayer performed five times a day. It involves specific physical movements and recitations.',
        links: ['Here is a link to a resource.', 'Here is a link to a resource.']
      },
      {
        question: 'What are the Five Pillars of Islam?',
        answer: 'The Five Pillars are the foundation of Muslim life: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).',
        links: ['Here is a link to a resource.']
      },
      {
        question: 'How do I find a local mosque?',
        answer: 'You can find local mosques through online directories, community centers, or by asking other Muslims in your area.',
        links: ['Here is a link to a resource.']
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', comment: '' });
  };

  return (
    <div className="mt-42 min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="bg-foreground/90 backdrop-blur-sm py-4 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 md:gap-16">
          <button
            onClick={() => {
              setSelectedCategory('NON-MUSLIMS');
              setOpenFAQ(null);
            }}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'NON-MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            NON-MUSLIMS
          </button>
          <button
            onClick={() => {
              setSelectedCategory('MUSLIMS');
              setOpenFAQ(null);
            }}
            className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'MUSLIMS'
                ? 'text-background underline underline-offset-8'
                : 'text-background/60 hover:text-background'
            }`}
          >
            MUSLIMS
          </button>
          <button
            onClick={() => {
              setSelectedCategory('NEW REVERTS');
              setOpenFAQ(null);
            }}
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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tight text-foreground">
            FAQS
          </h1>
          
          {/* FAQ Accordions */}
          <div className="space-y-4">
            {faqData[selectedCategory].map((faq, index) => (
              <div key={index} className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-foreground/10 transition-all duration-300 text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 mt-1 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-5 bg-foreground/5 border-t border-foreground/10">
                    <p className="text-foreground/80 mb-4">{faq.answer}</p>
                    {faq.links.length > 0 && (
                      <div className="space-y-2">
                        {faq.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href="#"
                            className="block text-primary hover:text-primary/80 underline transition-colors duration-300"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative py-16 px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-foreground">
            HAVE YOUR OWN QUESTION?
          </h2>
          
          <div className="space-y-6">
            <input
              type="text"
              placeholder="NAME..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            
            <input
              type="email"
              placeholder="EMAIL..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            
            <textarea
              placeholder="LEAVE YOUR COMMENT HERE..."
              rows={8}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-6 py-4 bg-foreground/10 text-foreground placeholder-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
            />
            
            <button
              onClick={handleSubmit}
              className="bg-foreground text-background px-12 py-4 rounded-lg font-bold hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}