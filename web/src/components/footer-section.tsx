'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language'
import { Send } from 'lucide-react'

export default function FooterSection() {
  const { t, isRtl } = useLanguage()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const sitemap = [
    { label: t.nav.products, href: '#products' },
    { label: t.nav.sustainability, href: '#newsletter' },
    { label: t.nav.services, href: '#products' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.findUs, href: '#footer' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSuccess(true)
    setTimeout(() => {
      setEmail('')
      setSuccess(false)
    }, 3000)
  }

  return (
    <div className="w-full">
      {/* Footer Lead-in Section (Editorial brand statement) */}
      <section className="bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] py-36 px-6 text-center border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400">OUR PROMISE</span>
          <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-wide leading-relaxed text-zinc-950 dark:text-[#FAFAFA]">
            {isRtl 
              ? 'زمین کی گہرائیوں سے آپ کے دسترخوان تک، بغیر کسی ملاوٹ کے۔'
              : 'From pristine geological aquifers directly to your table, uncompromised.'
            }
          </h2>
        </div>
      </section>

      {/* Actual Footer */}
      <footer id="footer" className="bg-white dark:bg-[#0A0A0A] border-t border-zinc-200/30 dark:border-zinc-800/30 pt-24 pb-12 text-zinc-900 dark:text-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-20 pb-20 border-b border-zinc-200/50 dark:border-zinc-800/50">
          
          {/* Logo and About (span 4) */}
          <div className="md:col-span-4 space-y-6">
            <div className="relative h-8 w-20 sm:w-24">
              <Image src="/logo.png" alt="Watlys Logo" fill className="object-contain" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] leading-relaxed font-light max-w-sm">
              Curating premium daily mineral hydration in high-aesthetic recyclable glass. Sourced sustainably from geological aquifers.
            </p>
            <div className="space-y-2 pt-2 text-xs text-zinc-450 dark:text-zinc-400 font-light">
              <div className="flex items-center space-x-2">
                <span>WhatsApp: +92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Email: info@watlys.com</span>
              </div>
            </div>
          </div>

          {/* Sitemap (span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Sitemap</h4>
            <div className="grid grid-cols-2 gap-4">
              {sitemap.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-light transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter (span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Newsletter</h4>
            <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] font-light">
              Subscribe to stay updated with water analysis reports.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white"
              />
              <button
                type="submit"
                className="p-2 border border-zinc-950 dark:border-white text-zinc-950 dark:text-white hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
              >
                <Send size={10} />
              </button>
            </form>
            {success && (
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Successfully subscribed.</p>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col sm:flex-row justify-between items-center text-[9px] text-zinc-400 dark:text-zinc-500 gap-4 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} WATLYS. {t.footer.rights}</span>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white">Terms & Conditions</Link>
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
