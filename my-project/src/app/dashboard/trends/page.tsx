// app/(dashboard)/trends/page.tsx
'use client'
import { LineChart } from '@/components/charts/LineChart'
import { dashboardData } from '@/data/mockData'

export default function TrendsPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center p-12">
      <div className="max-w-2xl w-full">
        <LineChart
          data={dashboardData.revenueChart}
          title="Revenue Trend"
          className="h-96 rounded-3xl shadow-xl bg-white"
        />
      </div>
    </div>
  )
}
