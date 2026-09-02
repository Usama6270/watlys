import React from 'react'
import Navbar from '@/components/navbar'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 w-full space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0064D0] font-bold">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-[#FAFAFA]">Contact Watlys</h1>
          <p className="text-zinc-550 dark:text-[#AAAAAA]">Our concierge support team is ready to assist you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          {/* Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-[#FAFAFA]">Reach Us Directly</h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm">
              <p>
                <span className="text-zinc-900 dark:text-[#FAFAFA] font-bold block uppercase tracking-wider text-xs">Email Concierge</span>
                support@watlys.com
              </p>
              <p>
                <span className="text-zinc-900 dark:text-[#FAFAFA] font-bold block uppercase tracking-wider text-xs">Headquarters</span>
                Watlys Premium Imports, Beverly Hills, CA
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl shadow-sm">
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Message</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#0064D0] hover:bg-[#0064D0]/85 text-white font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-[#0A0A0A] text-center text-sm text-zinc-400 dark:text-zinc-500">
        <span>&copy; {new Date().getFullYear()} Watlys. All rights reserved.</span>
      </footer>
    </div>
  )
}
