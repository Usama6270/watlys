'use client'

import React, { useState, useEffect } from 'react'
import { animate } from 'framer-motion'
import { useLanguage } from '@/context/language'
import { Leaf } from 'lucide-react'

// Elegant counter helper for smooth value changes
function CountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

// Decimal counter helper
function CountUpDecimal({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue.toFixed(2)}</span>
}

export default function PackageCalculator() {
  const { t } = useLanguage()
  const [bottleSize, setBottleSize] = useState<0.5 | 1 | 1.5>(1)
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number>(12)
  const [subLength, setSubLength] = useState<'weekly' | 'monthly' | 'annual'>('monthly')

  // Pricing config
  const baseRatePerLiter = 2.50
  const sizeMultiplier = bottleSize === 0.5 ? 0.65 : bottleSize === 1.5 ? 1.35 : 1

  const discountRate = subLength === 'annual' ? 0.20 : subLength === 'monthly' ? 0.10 : 0.00
  const weeksCount = subLength === 'annual' ? 52 : subLength === 'monthly' ? 4 : 1

  // Calculations
  const basePricePerBottle = baseRatePerLiter * bottleSize * sizeMultiplier
  const pricePerBottleDiscounted = basePricePerBottle * (1 - discountRate)

  const totalBottles = bottlesPerWeek * weeksCount
  const totalPrice = pricePerBottleDiscounted * totalBottles

  const plasticSaved = Math.round(totalBottles * 1.5)

  let deliveryDays = 7
  if (totalBottles * bottleSize > 30) deliveryDays = 3
  else if (totalBottles * bottleSize > 15) deliveryDays = 5

  return (
    <section id="calculator" className="py-20 px-6 max-w-5xl mx-auto w-full border-t border-zinc-200/30 dark:border-zinc-800/30 bg-white dark:bg-[#0A0A0A]">
      <div className="text-center space-y-4 mb-20">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666] dark:text-zinc-400 font-sans">
          {t.calculator.title.toUpperCase()}
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-serif font-light tracking-wide text-[#111111] dark:text-[#FAFAFA] leading-tight">
          {t.calculator.subtitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-stretch border border-zinc-200/40 dark:border-zinc-800/40 p-8 sm:p-16 relative overflow-hidden">
        
        {/* Input panel (span 6) with explicit gap-10 row spacing */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-10 relative z-10">
          
          {/* Bottle Size Toggles */}
          <div className="space-y-4 font-sans">
            <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#666666] dark:text-[#AAAAAA] block">
              {t.calculator.bottleSize}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([0.5, 1, 1.5] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setBottleSize(size)}
                  className={`py-3 text-[13px] font-medium border transition-all cursor-pointer ${
                    bottleSize === size
                      ? 'bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-zinc-950'
                      : 'border-zinc-250 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }`}
                >
                  {size === 0.5 ? '500ml' : size === 1 ? '1 L' : '1.5 L'}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          <div className="space-y-4 font-sans">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#666666] dark:text-[#AAAAAA]">
                {t.calculator.bottlesPerWeek}
              </label>
              <span className="text-[26px] font-light text-[#111111] dark:text-[#FAFAFA] font-serif">
                {bottlesPerWeek}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={bottlesPerWeek}
              onChange={(e) => setBottlesPerWeek(parseInt(e.target.value))}
              className="w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
              <span>1 bottle</span>
              <span>50 bottles</span>
            </div>
          </div>

          {/* Subscription Tier Toggle */}
          <div className="space-y-4 font-sans">
            <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#666666] dark:text-[#AAAAAA] block">
              {t.calculator.subLength}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['weekly', 'monthly', 'annual'] as const).map((length) => (
                <button
                  key={length}
                  onClick={() => setSubLength(length)}
                  className={`py-3 text-[13px] font-medium border transition-all uppercase tracking-widest cursor-pointer ${
                    subLength === length
                      ? 'bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-zinc-950'
                      : 'border-zinc-250 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel (span 6) - Styled as a separated container with clean paddings */}
        <div className="lg:col-span-6 bg-zinc-50 dark:bg-[#111111] p-8 sm:p-12 space-y-8 relative z-10 border-l border-zinc-200/25 dark:border-zinc-800/40 font-sans">
          <div className="space-y-6">
            <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
              <span className="text-[13px] text-[#666666] dark:text-[#AAAAAA] font-light">{t.calculator.totalBottles}</span>
              <span className="text-[26px] font-serif font-light text-[#111111] dark:text-[#FAFAFA]">
                <CountUp value={totalBottles} />
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
              <span className="text-[13px] text-[#666666] dark:text-[#AAAAAA] font-light">{t.calculator.pricePerBottle}</span>
              <div className="text-right">
                <span className="text-[26px] font-serif font-light text-[#111111] dark:text-[#FAFAFA]">
                  $<CountUpDecimal value={pricePerBottleDiscounted} />
                </span>
                {discountRate > 0 && (
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 line-through block mt-0.5 font-light">
                    ${basePricePerBottle.toFixed(2)} {t.calculator.regularPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
              <span className="text-[13px] text-[#666666] dark:text-[#AAAAAA] font-light">{t.calculator.totalPrice}</span>
              <span className="text-[26px] font-serif font-light text-[#111111] dark:text-[#FAFAFA]">
                $<CountUpDecimal value={totalPrice} />
              </span>
            </div>

            {/* Sustainability Metrics (Clean grey box) */}
            <div className="flex items-center space-x-3 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border border-zinc-200/30 dark:border-zinc-800">
              <Leaf size={14} className="text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
              <div className="text-[13px] font-light text-[#666666] dark:text-[#AAAAAA]">
                <span>{t.calculator.plasticSaved}: </span>
                <span className="font-bold text-zinc-900 dark:text-white"><CountUp value={plasticSaved} /></span>
              </div>
            </div>

            {/* Recommended Delivery Interval */}
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-light italic">
              {t.calculator.deliveryFreq.replace('{days}', deliveryDays.toString())}
            </p>
          </div>

          <div className="pt-4">
            <button className="w-full py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-all duration-300 text-xs font-bold uppercase tracking-widest cursor-pointer font-sans">
              {t.calculator.cta}
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
