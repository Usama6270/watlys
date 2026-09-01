'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/language'
import { Check } from 'lucide-react'

export default function PackagesSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'audience' | 'duration'>('audience')

  const audiencePackages = [
    { ...t.packages.student, id: 'student' },
    { ...t.packages.family, id: 'family' },
    { ...t.packages.corporate, id: 'corporate' },
  ]

  const durationPackages = [
    { ...t.packages.weekly, id: 'weekly' },
    { ...t.packages.monthly, id: 'monthly' },
    { ...t.packages.annual, id: 'annual' },
  ]

  const activePackages = activeTab === 'audience' ? audiencePackages : durationPackages

  return (
    <section id="products" className="py-16 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/30 dark:border-zinc-800/30 bg-white dark:bg-[#0A0A0A]">
      <div className="text-center space-y-4 mb-16">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400 font-sans">{t.packages.tag}</span>
        <h2 className="text-4xl sm:text-7xl font-serif font-light tracking-wide text-[#111111] dark:text-[#FAFAFA]">{t.packages.title}</h2>
        
        {/* Toggle Switch */}
        <div className="flex justify-center pt-6">
          <div className="inline-flex space-x-8 border-b border-zinc-200/40 dark:border-zinc-800/40 pb-1">
            <button
              onClick={() => setActiveTab('audience')}
              className={`pb-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-all cursor-pointer border-b font-sans ${
                activeTab === 'audience' 
                  ? 'border-zinc-950 dark:border-white text-[#111111] dark:text-[#FAFAFA]' 
                  : 'border-transparent text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {t.packages.byAudience}
            </button>
            <button
              onClick={() => setActiveTab('duration')}
              className={`pb-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-all cursor-pointer border-b font-sans ${
                activeTab === 'duration' 
                  ? 'border-zinc-950 dark:border-white text-[#111111] dark:text-[#FAFAFA]' 
                  : 'border-transparent text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {t.packages.byDuration}
            </button>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {activePackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col bg-white dark:bg-[#111111] border border-zinc-200/50 dark:border-zinc-800/50 p-8 sm:p-10 transition-colors duration-500 hover:border-zinc-400 dark:hover:border-zinc-600"
            >
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-serif font-light text-[#111111] dark:text-[#FAFAFA] tracking-widest uppercase">{pkg.name}</h3>
                <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed font-light font-sans">{pkg.desc}</p>
                <div className="pt-4 pb-6 border-b border-zinc-200/30 dark:border-zinc-800/30">
                  <span className="text-3xl font-serif font-light text-[#111111] dark:text-[#FAFAFA] tracking-wide">{pkg.price}</span>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold block mt-1 font-sans">/ Period</span>
                </div>

                <ul className="space-y-3 pt-6">
                  {pkg.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center space-x-3 text-xs text-[#666666] dark:text-[#AAAAAA] font-light font-sans">
                      <Check size={12} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 relative z-10">
                <button className="w-full py-4 border border-zinc-900 dark:border-white text-[#111111] dark:text-[#FAFAFA] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer font-sans">
                  Select Plan
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
