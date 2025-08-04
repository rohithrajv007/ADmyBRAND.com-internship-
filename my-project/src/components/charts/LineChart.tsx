'use client'

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import { ChartData } from '@/types/dashboard'

interface LineChartProps {
  data: ChartData[]
  title: string
  className?: string
}

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active } = props
  const payload = (props as any).payload as Array<{ value?: number }>
  const label = (props as any).label as string | undefined

  if (active && payload && Array.isArray(payload) && payload.length > 0 && label) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl p-4 shadow-2xl transform transition-all duration-200 scale-100">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg animate-pulse" />
          <div>
            <p className="font-bold text-gray-900 text-sm">{label}</p>
            <p className="text-xs text-gray-600 font-medium">
              {payload[0].value?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function LineChart({
  data,
  title,
  className = '',
}: LineChartProps) {
  return (
    <div className={`relative bg-gradient-to-br from-white via-gray-50/30 to-white rounded-2xl p-6 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden ${className}`}>
      {/* Enhanced Title */}
      <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
        {title}
      </h3>

      {/* Chart Container with same dimensions */}
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height={240}>
          <RechartsLineChart data={data}>
            <defs>
              {/* Enhanced gradient definitions */}
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="50%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
              </linearGradient>
              
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>

              {/* Glow effect filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Drop shadow for dots */}
              <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(59, 130, 246, 0.3)" />
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="url(#gridGradient)" 
              strokeOpacity={0.3}
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
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
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ 
                fill: '#ffffff', 
                stroke: 'url(#lineGradient)', 
                strokeWidth: 3, 
                r: 5,
                filter: 'url(#dotShadow)',
                className: 'hover:scale-125 transition-transform duration-200'
              }}
              activeDot={{ 
                r: 8, 
                fill: '#ffffff',
                stroke: 'url(#lineGradient)', 
                strokeWidth: 4,
                filter: 'url(#glow)',
                className: 'animate-ping'
              }}
              animationBegin={0}
              animationDuration={2000}
              animationEasing="ease-out"
              filter="url(#glow)"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-xl animate-pulse delay-1000" />
      
      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
