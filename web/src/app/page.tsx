'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import SpecReveal from '@/components/spec-reveal'
import PackagesSection from '@/components/packages-section'
import PackageCalculator from '@/components/package-calculator'
import ProcessSection from '@/components/process-section'
import KnowledgeSeries from '@/components/knowledge-series'
import TrustSection from '@/components/trust-section'
import FooterSection from '@/components/footer-section'
import InteractiveHeroBottle from '@/components/interactive-hero-bottle'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const MOCK_PRODUCTS = [
  {
    _id: 'p1',
    title: 'Watlys Classic',
    tagline: 'Geological Still Artistry',
    description: 'Sourced from natural underground aquifers protected from industrial elements. geologically filtered over decades through mineral-rich stones. Enclosed in our signature fluid-silhouette recyclable glass vessel.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=750&q=80',
    capacity: '750ml Still',
  },
  {
    _id: 'p2',
    title: 'Watlys Sport',
    tagline: 'Active Electrolyte Balance',
    description: 'Perfected for hydration replenishment. Enriched with optimal trace electrolytes including calcium and magnesium to support fast muscle recovery. Enclosed in lightweight, durable, BPA-free containers.',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=750&q=80',
    capacity: '1L Active',
  },
]

// Social Proof "Spotted" mock photos
const SPOTTED_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80', caption: '@aura_wellness / London' },
  { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80', caption: '@glow_clinics / Milan' },
  { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80', caption: '@health_elite / Paris' },
]

export default function Home() {
  const { t, isRtl } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FAFAFA] flex flex-col overflow-x-hidden transition-colors duration-400">
      <Navbar />

      {/* 2.1 — Pure Bottle Hero Showcase */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A] overflow-hidden pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-4 relative z-10 w-full">
          
          {/* Centered Big Interactive Bottle */}
          <div className="w-full flex justify-center items-center">
            <InteractiveHeroBottle />
          </div>

          {/* ONLY "BUY NOW" BUTTON (Solid Watlys Blue) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center pt-2"
          >
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center px-12 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,100,208,0.35)] hover:shadow-[0_15px_35px_rgba(0,100,208,0.5)] hover:-translate-y-0.5 active:translate-y-0 font-sans cursor-pointer"
            >
              {t.hero.ctaBuy || 'Buy Now'}
            </Link>
          </motion.div>
        </div>

        {/* Bouncing scroll cue */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-zinc-400 dark:text-zinc-500 hover:text-[#111111] dark:hover:text-white cursor-pointer"
          onClick={() => {
            const el = document.getElementById('collection')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.25em] font-sans">Discover</span>
          <ChevronDown size={12} />
        </motion.div>
      </section>

      {/* 2.2 — Alternating Product Collections Sections (VOSS Style) */}
      <section id="collection" className="py-16 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {MOCK_PRODUCTS.map((prod, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div 
                key={prod._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
              >
                {/* Image side (span 6) */}
                <div className={`lg:col-span-6 relative aspect-square sm:h-[480px] bg-zinc-50 dark:bg-[#111111] overflow-hidden border border-zinc-200/20 dark:border-zinc-800/30 ${
                  !isEven ? 'lg:order-2' : ''
                }`}>
                  <Image
                    src={prod.imageUrl}
                    alt={prod.title}
                    fill
                    className="object-contain p-12 transition-transform duration-[2000ms] hover:scale-103"
                  />
                  <span className="absolute top-6 left-6 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">
                    {prod.capacity}
                  </span>
                </div>

                {/* Description side (span 6) */}
                <div className={`lg:col-span-6 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400 font-sans">
                    SELECTED COLLECTION
                  </span>
                  <h3 className="text-[32px] sm:text-[40px] font-serif font-light tracking-wide text-[#111111] dark:text-[#FAFAFA]">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-semibold block italic font-sans">
                    {prod.tagline}
                  </p>
                  <p className="text-[15px] sm:text-[16px] text-[#666666] dark:text-[#AAAAAA] leading-relaxed font-light font-sans">
                    {prod.description}
                  </p>
                  <div className="pt-4">
                    <Link
                      href="#products"
                      className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] dark:text-[#FAFAFA] hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors border-b border-zinc-950 dark:border-white pb-1 font-sans"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </section>

      {/* Packages Options */}
      <PackagesSection />

      {/* Interactive composition hotspots */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/20 dark:border-zinc-800/30 bg-white dark:bg-[#0A0A0A]">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666] dark:text-zinc-400 font-sans">{t.specs.tag}</span>
          <h2 className="text-[32px] sm:text-[40px] font-serif font-light tracking-wide text-[#111111] dark:text-[#FAFAFA]">{t.specs.title}</h2>
          <p className="text-[#666666] dark:text-[#AAAAAA] text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed font-light font-sans">
            {t.specs.subtitle}
          </p>
        </div>
        <SpecReveal products={MOCK_PRODUCTS} />
      </section>

      {/* Custom calculator */}
      <PackageCalculator />

      {/* GSAP Process scrolling journey */}
      <ProcessSection />

      {/* Social Proof ("Watlys Spotted") */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/20 dark:border-zinc-800/30 bg-white dark:bg-[#0A0A0A]">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666] dark:text-zinc-400 font-sans">WATLYS SPOTTED</span>
          <h2 className="text-[32px] sm:text-[40px] font-serif font-light text-[#111111] dark:text-[#FAFAFA]">Active Hydration</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SPOTTED_PHOTOS.map((pic, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="relative aspect-square w-full bg-zinc-50 dark:bg-[#111111] overflow-hidden border border-zinc-200/10 dark:border-zinc-800/30">
                <Image
                  src={pic.url}
                  alt="Watlys Social spotted placement"
                  fill
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-103 grayscale hover:grayscale-0"
                />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-400 block font-sans">
                {pic.caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Article library and quick sub */}
      <KnowledgeSeries />

      {/* Client Voice Reviews */}
      <TrustSection />

      {/* Solid black lead in statement & links */}
      <FooterSection />
    </div>
  )
}
