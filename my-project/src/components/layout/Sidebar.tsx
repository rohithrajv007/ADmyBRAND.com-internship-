/* -------------------------------------------------------------------------- */
/*                                 Sidebar.tsx                                */
/* -------------------------------------------------------------------------- */
'use client' // 👈 enables client-side hooks and navigation

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Settings,
  Home,
} from 'lucide-react'

const navigation = [
  { name: 'Overview',  href: '/dashboard',          icon: Home },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Reports',   href: '/dashboard/reports',   icon: PieChart },
  { name: 'Users',     href: '/dashboard/users',     icon: Users },
  { name: 'Trends',    href: '/dashboard/trends',    icon: TrendingUp },
  { name: 'Settings',  href: '/dashboard/settings',   icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700">
        <BarChart3 className="h-8 w-8 text-blue-400" />
        <span className="ml-2 text-xl font-bold">Dashboard</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={[
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ].join(' ')}
            >
              <Icon className="mr-3 h-5 w-5" />
              {name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
        Analytics Dashboard v1.0
      </div>
    </div>
  )
}
