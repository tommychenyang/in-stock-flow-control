import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary-container border-primary/20"
      case "success":
        return "bg-success/10 border-success/20"
      case "warning":
        return "bg-warning/10 border-warning/20"
      case "destructive":
        return "bg-destructive/10 border-destructive/20"
      default:
        return "bg-surface-container border-border/50"
    }
  }

  const getIconStyles = () => {
    switch (variant) {
      case "primary":
        return "text-primary bg-primary/10"
      case "success":
        return "text-success bg-success/10"
      case "warning":
        return "text-warning bg-warning/10"
      case "destructive":
        return "text-destructive bg-destructive/10"
      default:
        return "text-primary bg-primary/10"
    }
  }

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-material-lg hover:-translate-y-1",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            getIconStyles()
          )}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}