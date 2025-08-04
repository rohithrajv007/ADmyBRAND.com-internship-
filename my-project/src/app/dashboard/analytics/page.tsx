// app/(dashboard)/analytics/page.tsx
'use client'
import { BarChart } from '@/components/charts/BarChart'
import { dashboardData } from '@/data/mockData'

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center p-12">
      <div className="max-w-2xl w-full">
        <BarChart
          data={dashboardData.userChart}
          title="Monthly User Growth"
          className="h-96 rounded-3xl shadow-xl bg-white"
        />
      </div>
    </div>
  )
}
