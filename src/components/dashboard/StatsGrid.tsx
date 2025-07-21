import { MetricCard } from "./MetricCard"
import { Package, TrendingUp, AlertTriangle, Users } from "lucide-react"

interface StatsGridProps {
  data?: {
    totalProducts: number
    totalValue: number
    lowStock: number
    suppliers: number
    trends: {
      products: number
      value: number
      stock: number
      suppliers: number
    }
  }
}

export function StatsGrid({ data }: StatsGridProps) {
  // Default demo data
  const stats = data || {
    totalProducts: 1247,
    totalValue: 2840000,
    lowStock: 23,
    suppliers: 45,
    trends: {
      products: 12,
      value: 8,
      stock: -15,
      suppliers: 5
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Products"
        value={stats.totalProducts.toLocaleString()}
        subtitle="Active inventory items"
        icon={Package}
        trend={{
          value: stats.trends.products,
          isPositive: stats.trends.products > 0
        }}
        variant="primary"
      />
      
      <MetricCard
        title="Inventory Value"
        value={formatCurrency(stats.totalValue)}
        subtitle="Total stock value"
        icon={TrendingUp}
        trend={{
          value: stats.trends.value,
          isPositive: stats.trends.value > 0
        }}
        variant="success"
      />
      
      <MetricCard
        title="Low Stock Items"
        value={stats.lowStock}
        subtitle="Need reorder"
        icon={AlertTriangle}
        trend={{
          value: Math.abs(stats.trends.stock),
          isPositive: stats.trends.stock < 0
        }}
        variant="warning"
      />
      
      <MetricCard
        title="Active Suppliers"
        value={stats.suppliers}
        subtitle="Partner suppliers"
        icon={Users}
        trend={{
          value: stats.trends.suppliers,
          isPositive: stats.trends.suppliers > 0
        }}
        variant="default"
      />
    </div>
  )
}