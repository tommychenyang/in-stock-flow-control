import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, Filter } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manufacturing Inventory Management Overview
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="fab" size="fab" className="shadow-material-xl">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <Card className="bg-surface-container border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="material" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="material" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Create Purchase Order
            </Button>
            <Button variant="material" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Generate Quote
            </Button>
            <Button variant="material" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Stock Adjustment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trends */}
        <Card className="bg-surface-container border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Inventory Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  📊
                </div>
                <p>Chart component will be implemented</p>
                <p className="text-sm">Showing inventory value over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-surface-container border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Product ABC-123", sales: 1250, value: "¥125,000" },
                { name: "Product XYZ-456", sales: 980, value: "¥98,000" },
                { name: "Product DEF-789", sales: 750, value: "¥75,000" },
                { name: "Product GHI-012", sales: 650, value: "¥65,000" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{product.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}