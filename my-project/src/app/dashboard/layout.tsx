import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex-shrink-0 px-6 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
