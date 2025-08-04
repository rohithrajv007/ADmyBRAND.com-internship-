export interface KPIMetric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  format?: 'currency' | 'percentage' | 'number'
}

export interface ChartData {
  name: string
  value: number
  date?: string
  category?: string
}

export interface TableRow {
  id: number
  date: string
  activity: string
  user: string
  value: number
  status: 'active' | 'completed' | 'pending' | 'processing'
}

export interface DashboardData {
  kpis: KPIMetric[]
  revenueChart: ChartData[]
  userChart: ChartData[]
  categoryChart: ChartData[]
  tableData: TableRow[]
}
