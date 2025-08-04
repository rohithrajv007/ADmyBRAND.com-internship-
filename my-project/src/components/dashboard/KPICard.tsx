'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface KPICardProps {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  format?: 'currency' | 'percentage' | 'number'
}

export function KPICard({ label, value, change, trend, format = 'number' }: KPICardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [animatedChange, setAnimatedChange] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    // Animate the main value
    let valueInterval: NodeJS.Timeout | undefined
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0

    valueInterval = setInterval(() => {
      current += increment
      if ((increment >= 0 && current >= value) || (increment < 0 && current <= value)) {
        current = value
        clearInterval(valueInterval)
      }
      setAnimatedValue(current)
    }, duration / steps)

    // Animate the change value
    let changeInterval: NodeJS.Timeout | undefined
    const changeDuration = 1000
    const changeSteps = 40
    const changeIncrement = change / changeSteps
    let changeCurrent = 0

    // Delay a bit for effect
    const changeTimeout = setTimeout(() => {
      changeInterval = setInterval(() => {
        changeCurrent += changeIncrement
        if (
          (changeIncrement >= 0 && changeCurrent >= change) ||
          (changeIncrement < 0 && changeCurrent <= change)
        ) {
          changeCurrent = change
          clearInterval(changeInterval)
        }
        setAnimatedChange(changeCurrent)
      }, changeDuration / changeSteps)
    }, 800)

    return () => {
      if (valueInterval) clearInterval(valueInterval)
      if (changeInterval) clearInterval(changeInterval)
      clearTimeout(changeTimeout)
    }
  }, [value, change, isVisible])

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'percentage':
        return formatPercentage(val)
      default:
        return formatNumber(val)
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 animate-bounce" />
      case 'down':
        return <TrendingDown className="h-4 w-4 animate-bounce" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50'
      case 'down':
        return 'text-red-600 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50'
      default:
        return 'text-gray-600 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200/50'
    }
  }

  const getCardGradient = () => {
    switch (trend) {
      case 'up':
        return 'hover:shadow-green-100/50'
      case 'down':
        return 'hover:shadow-red-100/50'
      default:
        return 'hover:shadow-gray-100/50'
    }
  }

  return (
    <div className={`relative bg-gradient-to-br from-white via-gray-50/30 to-white rounded-2xl p-6 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden group ${getCardGradient()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium text-gray-600 uppercase tracking-wide transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {label}
          </p>
          <p className={`mt-2 text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            {formatValue(animatedValue)}
          </p>
        </div>
      </div>
      
      <div className={`mt-4 flex items-center transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className={`flex items-center px-3 py-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${getTrendColor()}`}>
          <div className="animate-pulse">
            {getTrendIcon()}
          </div>
          <span className="ml-2 text-sm font-bold">
            {animatedChange > 0 ? '+' : ''}{animatedChange.toFixed(1)}%
          </span>
        </div>
        <span className="ml-3 text-sm text-gray-500 font-medium">vs last month</span>
      </div>

      {/* Floating Decorative Elements */}
      <div className={`absolute -top-2 -right-2 w-16 h-16 rounded-full blur-xl animate-pulse transition-colors duration-500 ${
        trend === 'up' ? 'bg-gradient-to-br from-green-200/20 to-emerald-200/20' :
        trend === 'down' ? 'bg-gradient-to-br from-red-200/20 to-rose-200/20' :
        'bg-gradient-to-br from-gray-200/20 to-slate-200/20'
      }`} />
      
      <div className={`absolute -bottom-2 -left-2 w-12 h-12 rounded-full blur-xl animate-pulse delay-1000 transition-colors duration-500 ${
        trend === 'up' ? 'bg-gradient-to-br from-emerald-200/20 to-teal-200/20' :
        trend === 'down' ? 'bg-gradient-to-br from-rose-200/20 to-pink-200/20' :
        'bg-gradient-to-br from-slate-200/20 to-gray-200/20'
      }`} />

      {/* Trend-based Border Glow */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        trend === 'up' ? 'bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5' :
        trend === 'down' ? 'bg-gradient-to-r from-red-500/5 via-rose-500/5 to-pink-500/5' :
        'bg-gradient-to-r from-gray-500/5 via-slate-500/5 to-zinc-500/5'
      }`} />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  )
}
