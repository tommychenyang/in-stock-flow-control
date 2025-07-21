import { useState } from "react"
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Activity, 
  Settings,
  LayoutDashboard,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Overview and reports"
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    description: "Product management"
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Users,
    description: "Supplier management"
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: ShoppingCart,
    description: "Purchase orders"
  },
  {
    title: "Sales",
    url: "/sales",
    icon: TrendingUp,
    description: "Sales orders"
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Activity,
    description: "Stock updates"
  },
  {
    title: "Quotations",
    url: "/quotations",
    icon: MessageSquare,
    description: "Quotes & inquiries"
  },
  {
    title: "Audit Logs",
    url: "/audit",
    icon: FileText,
    description: "System logs"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "User management"
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    const active = isActive(path)
    return cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
      "hover:bg-surface-container-high hover:shadow-material-sm",
      active ? [
        "bg-primary-container text-primary-container-foreground",
        "shadow-material-md font-medium"
      ] : [
        "text-muted-foreground hover:text-foreground"
      ]
    )
  }

  return (
    <Sidebar className={cn(
      "border-r bg-surface-container border-border/50",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-foreground">Inventory</h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs uppercase tracking-wider font-medium mb-2",
            collapsed ? "hidden" : "block"
          )}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </div>
                          </div>
                          {isActive(item.url) && (
                            <ChevronRight className="w-4 h-4 shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}