// app/(dashboard)/users/page.tsx
'use client'
import { dashboardData } from '@/data/mockData'

export default function UsersPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center p-6">
      <div className="w-full max-w-4xl bg-white border rounded-3xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-transparent">
          Recent Activity
        </h1>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Activity</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase hidden md:table-cell">User</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Value</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData.tableData.map(row => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-gray-900">{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td className="px-6 py-4">{row.activity}</td>
                <td className="px-6 py-4 hidden md:table-cell text-gray-500">{row.user}</td>
                <td className="px-6 py-4 font-bold">{row.value > 0 ? `+$${row.value}` : row.value < 0 ? `-$${Math.abs(row.value)}` : '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold
                    ${row.status === 'active' && 'bg-green-100 text-green-700'}
                    ${row.status === 'completed' && 'bg-blue-100 text-blue-700'}
                    ${row.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                    ${row.status === 'processing' && 'bg-purple-100 text-purple-700'}
                  `}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
