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
  // TypeScript workaround: forcibly access known runtime shape.
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

// Only type what you need for the event.
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
            {/* ... all your defs and gradients remain unchanged ... */}

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
      {/* ...decorative elements unchanged... */}
    </div>
  )
}
