'use client'
import { KPICard } from '@/components/dashboard/KPICard'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { PieChart } from '@/components/charts/PieChart'
import { dashboardData } from '@/data/mockData'
import { useState, useEffect } from 'react'

// Helper for conditional cell color with enhanced styling
function valueCell(val: number) {
  if (val > 0) return (
    <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg border border-green-200/50 shadow-sm">
      +${val}
    </span>
  )
  if (val < 0) return (
    <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-200/50 shadow-sm">
      -${Math.abs(val)}
    </span>
  )
  return <span className="text-gray-400 font-medium">-</span>
}

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger staggered animations on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col gap-6 min-h-0 relative">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-green-100/20 to-teal-100/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50/10 to-cyan-50/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* KPI Cards Row with staggered animation */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 flex-shrink-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {dashboardData.kpis.map((kpi, i) => (
          <div
            key={i}
            className="transition-all duration-700"
            style={{
              animationDelay: `${i * 100}ms`,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0
            }}
          >
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      {/* Charts Row + Table Row with enhanced styling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto,1fr] gap-6 flex-1 min-h-0">

        {/* Line Chart with animation */}
        <div className={`h-80 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <LineChart
            data={dashboardData.revenueChart}
            title="Revenue Trend"
            className="h-full group hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Bar Chart with animation */}
        <div className={`h-80 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <BarChart
            data={dashboardData.userChart}
            title="User Growth"
            className="h-full group hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Pie Chart with animation */}
        <div className={`h-80 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <PieChart
            data={dashboardData.categoryChart}
            title="Category Distribution"
            className="h-full group hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Enhanced Table with glass-morphism and animations */}
        <div className={`relative bg-gradient-to-br from-white via-gray-50/30 to-white rounded-3xl p-4 lg:p-6 border border-gray-200/60 shadow-2xl h-64 flex-shrink-0 overflow-hidden col-span-1 lg:col-span-3 row-start-2 backdrop-blur-sm transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          
          {/* Table Header with gradient */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Recent Activity
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full opacity-60" />
          </div>

          {/* Scrollable Table Container */}
          <div className="overflow-auto h-full custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200/50 text-sm">
              <thead className="bg-gradient-to-r from-gray-50/80 to-white/50 sticky top-0 backdrop-blur-sm border-b border-gray-200/50">
                <tr>
                  <th className="px-3 lg:px-6 py-4 text-left font-bold text-gray-600 uppercase tracking-wider text-xs">
                    Date
                  </th>
                  <th className="px-3 lg:px-6 py-4 text-left font-bold text-gray-600 uppercase tracking-wider text-xs">
                    Activity
                  </th>
                  <th className="px-3 lg:px-6 py-4 text-left font-bold text-gray-600 uppercase tracking-wider text-xs hidden md:table-cell">
                    User
                  </th>
                  <th className="px-3 lg:px-6 py-4 text-left font-bold text-gray-600 uppercase tracking-wider text-xs">
                    Value
                  </th>
                  <th className="px-3 lg:px-6 py-4 text-left font-bold text-gray-600 uppercase tracking-wider text-xs">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-b from-white/50 to-gray-50/30 divide-y divide-gray-200/30">
                {dashboardData.tableData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-300 group border-l-4 border-transparent hover:border-l-blue-400 hover:shadow-lg hover:shadow-blue-100/50"
                    style={{
                      animationDelay: `${1000 + index * 50}ms`,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.6s ease-out'
                    }}
                  >
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                      {new Date(row.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                      <div className="max-w-xs truncate">{row.activity}</div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell group-hover:text-gray-700 transition-colors">
                      <div className="max-w-xs truncate font-medium">{row.user}</div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-bold">
                      {valueCell(row.value)}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-2 inline-flex text-xs leading-5 font-bold rounded-2xl shadow-lg border transition-all duration-200 hover:scale-110 ${
                        row.status === 'active'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/50 shadow-green-100/50'
                          : row.status === 'completed'
                          ? 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border-blue-200/50 shadow-blue-100/50'
                          : row.status === 'pending'
                          ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200/50 shadow-yellow-100/50'
                          : row.status === 'processing'
                          ? 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200/50 shadow-purple-100/50'
                          : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200/50 shadow-gray-100/50'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Floating Decorative Elements for Table */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse delay-1000" />

          {/* Subtle Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 10px;
          border: 2px solid rgba(243, 244, 246, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  )
}
