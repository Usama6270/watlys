'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/language'
import { Award, ShieldCheck, Heart, ArrowLeft, ArrowRight } from 'lucide-react'

const PARTNERS = [
  'AURA WELLNESS', 'NUTRITION LABS', 'GLOW CLINICS', 'ELITE SPORTS ASSOC', 'HYDRO POLICY ASSOC'
]

const DISTRIBUTORS = [
  'HYDRATE CO', 'PURE CARGO', 'ECO SUPPLY', 'GREEN LOGISTICS'
]

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Wellness Coach',
    quote: 'Watlys is hands down the cleanest water I have ever tasted. The pH balance makes a noticeable difference in my daily energy levels.',
  },
  {
    name: 'Daniyal A.',
    role: 'Professional Athlete',
    quote: 'The sports edition bottle is incredibly durable, and the mineral composition helps me recover faster during high-intensity training.',
  },
  {
    name: 'Dr. Mariam Y.',
    role: 'Dermatologist',
    quote: 'Hydration is the foundation of skin beauty. The natural silica inside Watlys Classic provides visible structural skin benefits.',
  }
]

export default function TrustSection() {
  const { t, isRtl } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-36 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/30 dark:border-zinc-800/30 bg-white dark:bg-[#0A0A0A] space-y-32">
      
      {/* 1. Trusted By Brand Strip */}
      <div className="space-y-8">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400 text-center block">
          Trusted by Elite Wellness Brands
        </span>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 dark:opacity-70">
          {PARTNERS.map((partner) => (
            <span key={partner} className="text-xs font-medium tracking-[0.3em] text-zinc-650 dark:text-zinc-400">
              {partner}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Testimonials Carousel */}
      <div className="max-w-4xl mx-auto relative text-center space-y-8">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400">
          {t.testimonials.tag.toUpperCase()}
        </span>
        
        <div className="h-[220px] sm:h-[180px] flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 absolute"
            >
              <p className="text-xl sm:text-3xl font-sans font-light text-zinc-900 dark:text-[#FAFAFA] leading-relaxed italic">
                "{TESTIMONIALS[activeIdx].quote}"
              </p>
              <div>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-[10px] tracking-widest uppercase">
                  {TESTIMONIALS[activeIdx].name}
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-wider block mt-1">
                  {TESTIMONIALS[activeIdx].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel buttons */}
        <div className="flex justify-center items-center space-x-6 pt-6">
          <button
            onClick={handlePrev}
            className="p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-555 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer"
          >
            <ArrowLeft size={12} />
          </button>
          <div className="flex space-x-2">
            {TESTIMONIALS.map((_, idx) => (
              <div
                key={idx}
                className={`h-0.5 transition-all duration-350 ${
                  activeIdx === idx ? 'w-6 bg-zinc-900 dark:bg-white' : 'w-1.5 bg-zinc-250 dark:bg-zinc-800'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-555 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer"
          >
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* 3. Partnerships Section */}
      <div className="space-y-8 border-t border-zinc-150 dark:border-zinc-800/50 pt-16">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400 text-center block">
          Distribution & Logistics Partners
        </span>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 dark:opacity-70">
          {DISTRIBUTORS.map((dist) => (
            <span key={dist} className="text-xs font-medium tracking-[0.3em] text-zinc-650 dark:text-zinc-400">
              {dist}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Certifications Badges */}
      <div className="border-t border-zinc-150 dark:border-zinc-800/50 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border-l border-zinc-200 dark:border-zinc-800 pl-6 py-2 space-y-3">
          <ShieldCheck size={20} className="text-zinc-950 dark:text-white" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">ISO 9001 Certified</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Meets international standards for water quality management and bottling processes.
          </p>
        </div>
        <div className="border-l border-zinc-200 dark:border-zinc-800 pl-6 py-2 space-y-3">
          <Award size={20} className="text-zinc-950 dark:text-white" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">WHO Standards Compliant</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Strict filtration and bottling complying with standard drinking water quality requirements.
          </p>
        </div>
        <div className="border-l border-zinc-200 dark:border-zinc-800 pl-6 py-2 space-y-3">
          <Heart size={20} className="text-zinc-950 dark:text-white" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">100% Eco Packaging</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Award-winning lead-free glass and fully compostable transport materials.
          </p>
        </div>
      </div>

    </section>
  )
}
