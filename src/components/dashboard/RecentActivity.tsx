import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  AlertCircle,
  Clock,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "procurement" | "sales" | "inventory" | "alert"
  title: string
  description: string
  timestamp: string
  status: "completed" | "pending" | "warning" | "error"
  value?: number
}

interface RecentActivityProps {
  activities?: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  // Default demo data
  const defaultActivities: Activity[] = [
    {
      id: "1",
      type: "sales",
      title: "Sales Order #SO-2024-001",
      description: "Shipped 500 units to Client ABC",
      timestamp: "2 hours ago",
      status: "completed",
      value: 125000
    },
    {
      id: "2",
      type: "procurement",
      title: "Purchase Order #PO-2024-045",
      description: "Received 1000 units from Supplier XYZ",
      timestamp: "4 hours ago",
      status: "completed",
      value: 80000
    },
    {
      id: "3",
      type: "alert",
      title: "Low Stock Alert",
      description: "Product ABC-123 below minimum threshold",
      timestamp: "6 hours ago",
      status: "warning"
    },
    {
      id: "4",
      type: "inventory",
      title: "Stock Adjustment",
      description: "Corrected count for Product XYZ-456",
      timestamp: "1 day ago",
      status: "completed"
    },
    {
      id: "5",
      type: "procurement",
      title: "Purchase Order #PO-2024-046",
      description: "Pending approval from Supplier ABC",
      timestamp: "1 day ago",
      status: "pending"
    }
  ]

  const activityData = activities || defaultActivities

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "sales":
        return TrendingUp
      case "procurement":
        return ShoppingCart
      case "inventory":
        return Package
      case "alert":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20"
      case "pending":
        return "bg-warning/10 text-warning border-warning/20"
      case "warning":
        return "bg-warning/10 text-warning border-warning/20"
      case "error":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
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
    <Card className="bg-surface-container border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityData.map((activity) => {
          const IconComponent = getActivityIcon(activity.type)
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-surface hover:bg-surface-container-high transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">
                    {activity.title}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={cn("shrink-0 text-xs", getStatusColor(activity.status))}
                  >
                    {activity.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </span>
                  {activity.value && (
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(activity.value)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}