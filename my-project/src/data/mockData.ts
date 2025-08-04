import { DashboardData } from '@/types/dashboard'

export const dashboardData: DashboardData = {
  kpis: [
    { 
      label: 'Total Revenue', 
      value: 125000, 
      change: 12.5, 
      trend: 'up',
      format: 'currency'
    },
    { 
      label: 'Active Users', 
      value: 2840, 
      change: -2.1, 
      trend: 'down',
      format: 'number'
    },
    { 
      label: 'Conversion Rate', 
      value: 3.2, 
      change: 0.8, 
      trend: 'up',
      format: 'percentage'
    },
    { 
      label: 'Avg Order Value', 
      value: 89.50, 
      change: 5.2, 
      trend: 'up',
      format: 'currency'
    },
  ],
  revenueChart: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 18000 },
    { name: 'Jun', value: 25000 },
  ],
  userChart: [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 2800 },
    { name: 'Mar', value: 2200 },
    { name: 'Apr', value: 3200 },
    { name: 'May', value: 2900 },
    { name: 'Jun', value: 3400 },
  ],
  categoryChart: [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 28 },
    { name: 'Books', value: 18 },
    { name: 'Home', value: 19 },
  ],
  tableData: [
    {
      id: 1,
      date: '2024-08-04',
      activity: 'New User Registration',
      user: 'john.doe@email.com',
      value: 250,
      status: 'active'
    },
    {
      id: 2,
      date: '2024-08-03',
      activity: 'Product Purchase',
      user: 'jane.smith@email.com',
      value: 1250,
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-08-02',
      activity: 'Support Ticket',
      user: 'mike.wilson@email.com',
      value: 0,
      status: 'pending'
    },
    {
      id: 4,
      date: '2024-08-01',
      activity: 'Refund Request',
      user: 'sarah.jones@email.com',
      value: -150,
      status: 'processing'
    },
    {
      id: 5,
      date: '2024-07-31',
      activity: 'Product Purchase',
      user: 'alex.brown@email.com',
      value: 890,
      status: 'completed'
    },
    {
      id: 6,
      date: '2024-07-30',
      activity: 'Account Upgrade',
      user: 'emma.davis@email.com',
      value: 99,
      status: 'completed'
    },
    {
      id: 7,
      date: '2024-07-29',
      activity: 'Password Reset',
      user: 'david.miller@email.com',
      value: 0,
      status: 'completed'
    },
    {
      id: 8,
      date: '2024-07-28',
      activity: 'Product Return',
      user: 'lisa.garcia@email.com',
      value: -75,
      status: 'processing'
    }
  ]
}
