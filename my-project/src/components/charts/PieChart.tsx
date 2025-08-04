'use client'

import { useState } from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartData } from '@/types/dashboard'

const COLORS = [
  '#6366f1', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#8b5cf6', '#ec4899', '#84cc16'
]

const GRADIENTS = [
  { id: 'gradient0', from: '#8b5cf6', to: '#6366f1' },
  { id: 'gradient1', from: '#06b6d4', to: '#0891b2' },
  { id: 'gradient2', from: '#10b981', to: '#059669' },
  { id: 'gradient3', from: '#f59e0b', to: '#d97706' },
  { id: 'gradient4', from: '#ef4444', to: '#dc2626' },
  { id: 'gradient5', from: '#8b5cf6', to: '#7c3aed' },
  { id: 'gradient6', from: '#ec4899', to: '#db2777' },
  { id: 'gradient7', from: '#84cc16', to: '#65a30d' }
]

interface PieChartProps {
  data: ChartData[]
  title: string
  className?: string
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    const total = payload[0].payload.payload?.total || 100
    const percentage = ((data.value / total) * 100).toFixed(1)
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: data.payload.fill }}
          />
          <div>
            <p className="font-bold text-gray-900 text-sm">{data.name}</p>
            <p className="text-xs text-gray-600 font-medium">
              {data.value.toLocaleString()} ({percentage}%)
            </p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

// This will render each label closer to the center
const renderLabel = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx, cy, midAngle, innerRadius, outerRadius, percent, name,
  } = props
  if (percent < 0.05) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <>
      <text
        x={x}
        y={y - 9}
        fill="#22223b"
        fontSize={13}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ pointerEvents: 'none' }}
      >{name}</text>
      <text
        x={x}
        y={y + 11}
        fill="#6366f1"
        fontSize={12}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ pointerEvents: 'none' }}
      >{`${(percent * 100).toFixed(0)}%`}</text>
    </>
  )
}

export function PieChart({ data, title, className = '' }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const dataWithTotal = data.map(item => ({ ...item, total }))

  return (
    <div className={`relative flex flex-col justify-between items-center bg-gradient-to-br from-white via-gray-50/30 to-white rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm ${className}`}>
      {/* Header */}
      <div className="w-full mb-8 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
          {title}
        </h3>
        <div className="w-16 h-1 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full opacity-80" />
      </div>
      {/* Chart and center badge */}
      <div className="relative flex items-center justify-center w-full" style={{ minHeight: 225, height: 225 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <defs>
              {GRADIENTS.map((gradient) => (
                <linearGradient
                  key={gradient.id}
                  id={gradient.id}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={gradient.from} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={gradient.to} stopOpacity={1} />
                </linearGradient>
              ))}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.15)" />
              </filter>
            </defs>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              outerRadius="90%"
              innerRadius="65%"
              dataKey="value"
              label={renderLabel}
              labelLine={false}
              paddingAngle={2}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animationDuration={900}
            >
              {dataWithTotal.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient${index % GRADIENTS.length})`}
                  stroke={hoveredIndex === index ? '#ffffff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={hoveredIndex === index ? 4 : 1}
                  filter="url(#shadow)"
                  style={{
                    cursor: 'pointer',
                    transformOrigin: 'center',
                    transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* True center label OVERLAY */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent select-none">
            {total.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider select-none">
            TOTAL
          </div>
        </div>
      </div>
    </div>
  )
}
