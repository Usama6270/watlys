'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useLanguage } from '@/context/language'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Navbar() {
  const { cart } = useCart()
  const { language, setLanguage, t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Split Navigation items
  const leftLinks = [
    { label: t.nav.products, href: '#products' },
    { label: t.nav.sustainability, href: '#newsletter' },
    {
      label: t.nav.services,
      type: 'dropdown',
      id: 'services',
      items: [
        { label: t.nav.servicesList.installation, href: '#services' },
        { label: t.nav.servicesList.testing, href: '#services' },
        { label: t.nav.servicesList.dispenser, href: '#services' },
        { label: t.nav.servicesList.delivery, href: '#services' },
      ],
    },
  ]

  const rightLinks = [
    { label: t.nav.process, href: '#process' },
    { label: t.nav.about, href: '/about' },
    {
      label: t.nav.findUs,
      type: 'dropdown',
      id: 'findUs',
      items: [
        { label: t.nav.findUsList.contact, href: '#footer' },
        { label: t.nav.findUsList.locations, href: '#footer' },
        { label: t.nav.findUsList.inquiry, href: '#footer' },
      ],
    },
  ]

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' as any } 
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-zinc-200/10 dark:border-zinc-800/50 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        {/* Desktop Navigation Layout — True 3-Column Grid Layout */}
        <div className="max-w-7xl mx-auto px-8 sm:px-12 hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          
          {/* Column 1 (Left): Nav Links */}
          <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
            {leftLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <div
                  className="relative whitespace-nowrap group"
                  onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                  onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                >
                  {link.type === 'dropdown' ? (
                    <button className="flex items-center space-x-1 py-1.5 px-1 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap font-sans">
                      <span>{link.label}</span>
                      <ChevronDown size={10} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href || '#'} className="py-1.5 px-1 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap font-sans block">
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Box */}
                  <AnimatePresence>
                    {link.type === 'dropdown' && activeDropdown === link.id && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md border border-zinc-200/40 dark:border-zinc-800 py-2.5 shadow-xl rounded-lg z-50"
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-blue dark:hover:text-brand-blue transition-colors font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {idx < leftLinks.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-700 text-[7px] select-none mx-1 font-normal flex-shrink-0 opacity-75">&bull;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Column 2 (Center): Mathematically Centered Prominent Logo */}
          <div className="flex justify-center items-center px-6">
            <Link href="/" className="relative block h-14 sm:h-16 w-48 sm:w-56 lg:w-64 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <Image
                src="/logo.png"
                alt="Watlys Logo"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Column 3 (Right): Nav Links + Far-Right Utility Controls */}
          <div className={`flex items-center justify-end gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            
            {/* Right Side Nav Links */}
            <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {rightLinks.map((link, idx) => (
                <React.Fragment key={link.label}>
                  <div
                    className="relative whitespace-nowrap group"
                    onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                    onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                  >
                    {link.type === 'dropdown' ? (
                      <button className="flex items-center space-x-1 py-1.5 px-1 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap font-sans">
                        <span>{link.label}</span>
                        <ChevronDown size={10} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link href={link.href || '#'} className="py-1.5 px-1 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap font-sans block">
                        {link.label}
                      </Link>
                    )}

                    {/* Dropdown Box */}
                    <AnimatePresence>
                      {link.type === 'dropdown' && activeDropdown === link.id && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full right-0 mt-2 w-56 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md border border-zinc-200/40 dark:border-zinc-800 py-2.5 shadow-xl rounded-lg z-50"
                        >
                          {link.items?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block px-4 py-2 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-blue dark:hover:text-brand-blue transition-colors font-medium whitespace-nowrap"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {idx < rightLinks.length - 1 && (
                    <span className="text-zinc-300 dark:text-zinc-700 text-[7px] select-none mx-1 font-normal flex-shrink-0 opacity-75">&bull;</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Utility Controls (Language Toggle | Dark Mode | Cart) */}
            <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''} z-20 flex-shrink-0`}>
              {/* Equal Visual Language Switcher */}
              <div className="flex items-center space-x-1.5 text-[10px] font-medium text-zinc-400">
                <button
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer transition-colors duration-300 ${
                    language === 'en'
                      ? 'text-zinc-950 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-0.5 font-semibold'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium'
                  }`}
                >
                  EN
                </button>
                <span className="text-zinc-300 dark:text-zinc-700 select-none text-[9px] font-normal">|</span>
                <button
                  onClick={() => setLanguage('ur')}
                  className={`cursor-pointer font-urdu text-[10px] transition-colors duration-300 ${
                    language === 'ur'
                      ? 'text-zinc-950 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-0.5 font-semibold'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium'
                  }`}
                >
                  اردو
                </button>
              </div>

              {/* Dark/Light Mode Toggle */}
              <ThemeToggle />

              {/* Shopping Cart Button */}
              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative w-7 h-7 flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
              >
                <ShoppingBag size={16} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[7px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white dark:border-[#0A0A0A]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Layout */}
        <div className="max-w-7xl mx-auto px-6 flex md:hidden items-center justify-between relative min-h-[52px]">
          {/* Logo Centered */}
          <div className="flex justify-center absolute left-1/2 -translate-x-1/2 z-10 items-center">
            <Link href="/" className="relative block h-11 w-40">
              <Image
                src="/logo.png"
                alt="Watlys Logo"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Language Switcher Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="text-[9px] uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer z-20"
          >
            {language === 'en' ? 'اردو' : 'EN'}
          </button>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2.5 z-20">
            <ThemeToggle />
            <Link href="/cart" className="relative text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-blue text-white text-[7px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white dark:border-[#0A0A0A]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className={`fixed top-0 bottom-0 w-80 z-50 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-zinc-200/30 dark:border-zinc-800 flex flex-col justify-between p-8 ${
                isRtl ? 'left-0 border-r' : 'right-0 border-l'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <div className="relative h-10 w-28">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  {/* Mobile Links */}
                  {[...leftLinks, ...rightLinks].map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ x: isRtl ? 15 : -15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.type === 'dropdown' ? (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">{link.label}</span>
                          <div className="pl-4 flex flex-col space-y-2 border-l border-zinc-100 dark:border-zinc-800">
                            {link.items?.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-light text-zinc-700 dark:text-zinc-300 hover:text-brand-blue"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href || '#'}
                          className="text-base font-light uppercase tracking-wider text-zinc-900 dark:text-white hover:text-brand-blue transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                {/* Mobile Language switch simple toggler */}
                <button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'ur' : 'en')
                    setIsOpen(false)
                  }}
                  className="w-full py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  {language === 'en' ? 'اردو (Urdu)' : 'English (EN)'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
