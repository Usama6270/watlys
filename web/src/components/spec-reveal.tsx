'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/language'

export interface SpecProduct {
  _id: string
  title: string
  imageUrl: string
  pH?: number
  capacity?: string
  material?: string
  minerals?: string[]
  idealUse?: string
}

interface SpecRevealProps {
  products: SpecProduct[]
}

export default function SpecReveal({ products }: SpecRevealProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { t, isRtl } = useLanguage()

  const activeProduct = products[selectedIdx]
  if (!activeProduct) return null

  // Redesigned annotation specs
  const specs = [
    {
      side: 'left',
      top: '18%',
      title: t.specs.material,
      value: activeProduct.material || 'Lead-free glass container',
    },
    {
      side: 'right',
      top: '35%',
      title: t.specs.ph,
      value: `Optimal pH level of ${activeProduct.pH || '7.8'}`,
    },
    {
      side: 'left',
      top: '58%',
      title: t.specs.capacity,
      value: activeProduct.capacity || '750ml',
    },
    {
      side: 'right',
      top: '78%',
      title: t.specs.minerals,
      value: activeProduct.minerals?.slice(0, 2).join(', ') || 'Calcium, Magnesium',
    },
  ]

  return (
    <div className="w-full py-12 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white">
      {/* Big Centered Layout */}
      <div className="max-w-5xl mx-auto relative h-[650px] flex items-center justify-center">
        
        {/* SVG Dashed leader lines connecting center bottle to side texts */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block">
          {specs.map((spec, idx) => {
            const isLeft = spec.side === 'left'
            return (
              <motion.line
                key={idx}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isHovered ? 1 : 0,
                  opacity: isHovered ? 0.25 : 0,
                }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.05 }}
                x1="50%"
                y1={spec.top}
                x2={isLeft ? '22%' : '78%'}
                y2={spec.top}
                stroke="#0064D0"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            )
          })}
        </svg>

        {/* Floating Water Bottle */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
          animate={{
            y: isHovered ? -10 : [0, -8, 0],
            rotateY: isHovered ? 12 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            y: { repeat: isHovered ? 0 : Infinity, duration: 5, ease: 'easeInOut' },
            type: 'spring',
            stiffness: 90,
            damping: 18,
          }}
          className="relative w-[240px] h-[520px] sm:w-[280px] sm:h-[580px] cursor-pointer z-20 mix-blend-multiply dark:mix-blend-normal select-none"
          style={{ perspective: 1000 }}
        >
          <Image
            src={activeProduct.imageUrl}
            alt={activeProduct.title}
            fill
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,100,208,0.1)] dark:drop-shadow-[0_30px_60px_rgba(0,100,208,0.2)]"
            priority
          />
        </motion.div>

        {/* Text Annotations */}
        {specs.map((spec, idx) => {
          const isLeft = spec.side === 'left'
          // Reverse direction values if user is on RTL layout
          const displayLeft = isRtl ? !isLeft : isLeft
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: displayLeft ? -20 : 20 }}
              animate={{
                opacity: isHovered ? 1 : 0.2,
                x: isHovered 
                  ? (displayLeft ? -130 : 130) 
                  : (displayLeft ? -110 : 110),
              }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`absolute z-35 text-left w-[200px] hidden sm:block ${
                displayLeft ? 'text-right' : 'text-left'
              }`}
              style={{
                top: spec.top,
                transform: 'translateY(-50%)',
                left: displayLeft ? 'auto' : '50%',
                right: displayLeft ? '50%' : 'auto',
              }}
            >
              <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1">
                {spec.title}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs font-light block leading-relaxed">
                {spec.value}
              </span>
            </motion.div>
          )}
        )}
      </div>

      {/* Mobile-friendly specifications (always visible, stacked) */}
      <div className="sm:hidden grid grid-cols-2 gap-6 px-6 mt-8">
        {specs.map((spec, idx) => (
          <div key={idx} className="border-l border-zinc-200 dark:border-zinc-800 pl-4 py-2">
            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-widest block mb-1">
              {spec.title}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-light block">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Variant Selector dots */}
      {products.length > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-12">
          {products.map((p, idx) => (
            <button
              key={p._id}
              onClick={() => setSelectedIdx(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIdx === idx ? 'bg-brand-blue scale-125 shadow-sm' : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
              }`}
              aria-label={`Select variant ${p.title}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
