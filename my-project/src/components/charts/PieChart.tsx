'use client'

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts'
import { ChartData } from '@/types/dashboard'

interface PieChartProps {
  data: ChartData[]
  title: string
  className?: string
}

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active } = props
  const payload = (props as { payload?: Array<{ value?: number }> }).payload
  const label = (props as { label?: string }).label

  if (
    active &&
    payload &&
    Array.isArray(payload) &&
    payload.length > 0
  ) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: payload[0]?.color || '#ddd'
            }}
          />
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

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#84cc16'
]

export function PieChart({ data, title, className = '' }: PieChartProps) {
  return (
    <div className={`relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${className}`}>
      <h3 className="mb-4 font-semibold text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            labelLine={false}
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
