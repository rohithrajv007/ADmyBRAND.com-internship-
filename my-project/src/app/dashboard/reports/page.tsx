// app/(dashboard)/reports/page.tsx
'use client'
import { PieChart } from '@/components/charts/PieChart'
import { dashboardData } from '@/data/mockData'

export default function ReportsPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center p-12">
      <div className="max-w-xl w-full">
        <PieChart
          data={dashboardData.categoryChart}
          title="Sales Distribution Report"
          className="h-96 rounded-3xl shadow-xl bg-white"
        />
      </div>
    </div>
  )
}
