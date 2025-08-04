'use client'

import { useState } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps
} from 'recharts'
import { ChartData } from '@/types/dashboard'

interface BarChartProps {
  data: ChartData[]
  title: string
  className?: string
}

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active } = props
  // Access payload and label through type assertion
  const payload = (props as { payload?: Array<{ value?: number }> }).payload
  const label = (props as { label?: string }).label

  if (
    active &&
    payload &&
    Array.isArray(payload) &&
    payload.length > 0 &&
    label
  ) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg animate-pulse" />
          <div>
            <p className="font-bold text-gray-900 text-sm">{label}</p>
            <p className="text-xs text-gray-600 font-medium">
              {payload[0]?.value?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

interface BarChartMouseEvent {
  activeTooltipIndex?: number | null
}

export function BarChart({ data, title, className = '' }: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const onMouseMoveHandler = (e: BarChartMouseEvent) => {
    if (typeof e?.activeTooltipIndex === 'number') {
      setHoveredIndex(e.activeTooltipIndex)
    } else {
      setHoveredIndex(null)
    }
  }

  return (
    <div className={`relative bg-gradient-to-br from-white via-gray-50/30 to-white rounded-2xl p-6 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden ${className}`}>
      <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
        {title}
      </h3>

      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height={240}>
          <RechartsBarChart
            data={data}
            onMouseMove={onMouseMoveHandler}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="50%" stopColor="#059669" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="barHoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="50%" stopColor="#10b981" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
              </linearGradient>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
              <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="rgba(16, 185, 129, 0.25)" />
              </filter>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="url(#gridGradient)" 
              strokeOpacity={0.3}
              className="animate-pulse"
            />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              filter="url(#barShadow)"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredIndex === index ? "url(#barHoverGradient)" : "url(#barGradient)"}
                  style={{
                    filter: hoveredIndex === index ? 'url(#barGlow) brightness(1.1)' : 'none',
                    transformOrigin: 'bottom center',
                    transform: hoveredIndex === index ? 'scaleY(1.05) scaleX(1.02)' : 'scaleY(1) scaleX(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-teal-200/20 to-emerald-200/20 rounded-full blur-xl animate-pulse delay-1000" />
      
      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
