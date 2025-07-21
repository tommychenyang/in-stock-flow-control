import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit2, 
  Eye, 
  TrendingUp,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Truck,
  XCircle
} from "lucide-react"

interface SalesOrder {
  id: string
  orderNumber: string
  customer: string
  orderDate: string
  deliveryDate: string
  status: "draft" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  totalValue: number
  profit: number
  items: {
    productCode: string
    productName: string
    quantity: number
    unitPrice: number
    total: number
  }[]
}

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Demo data
  const salesOrders: SalesOrder[] = [
    {
      id: "1",
      orderNumber: "SO-2024-001",
      customer: "Manufacturing Corp Ltd.",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-25",
      status: "delivered",
      totalValue: 180000,
      profit: 45000,
      items: [
        {
          productCode: "ABC-123",
          productName: "Steel Rod 10mm",
          quantity: 300,
          unitPrice: 35.50,
          total: 10650
        }
      ]
    },
    {
      id: "2",
      orderNumber: "SO-2024-002",
      customer: "Construction Inc.",
      orderDate: "2024-01-18",
      deliveryDate: "2024-01-28",
      status: "shipped",
      totalValue: 156000,
      profit: 38000,
      items: [
        {
          productCode: "XYZ-456",
          productName: "Aluminum Sheet",
          quantity: 150,
          unitPrice: 120.00,
          total: 18000
        }
      ]
    },
    {
      id: "3",
      orderNumber: "SO-2024-003",
      customer: "Tech Solutions Co.",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-30",
      status: "processing",
      totalValue: 98000,
      profit: 22000,
      items: [
        {
          productCode: "DEF-789",
          productName: "Copper Wire",
          quantity: 800,
          unitPrice: 4.50,
          total: 3600
        }
      ]
    },
    {
      id: "4",
      orderNumber: "SO-2024-004",
      customer: "Industrial Systems",
      orderDate: "2024-01-22",
      deliveryDate: "2024-02-01",
      status: "confirmed",
      totalValue: 75000,
      profit: 18000,
      items: [
        {
          productCode: "GHI-012",
          productName: "Stainless Bolts M8",
          quantity: 5000,
          unitPrice: 0.65,
          total: 3250
        }
      ]
    }
  ]

  const getStatusIcon = (status: SalesOrder["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "shipped":
        return <Truck className="w-4 h-4 text-primary" />
      case "processing":
        return <Clock className="w-4 h-4 text-warning" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "draft":
        return <Edit2 className="w-4 h-4 text-muted-foreground" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: SalesOrder["status"]) => {
    switch (status) {
      case "delivered":
        return <Badge variant="outline" className="border-success text-success">Delivered</Badge>
      case "shipped":
        return <Badge variant="outline" className="border-primary text-primary">Shipped</Badge>
      case "processing":
        return <Badge variant="outline" className="border-warning text-warning">Processing</Badge>
      case "confirmed":
        return <Badge variant="outline" className="border-primary text-primary">Confirmed</Badge>
      case "draft":
        return <Badge variant="outline" className="border-muted text-muted-foreground">Draft</Badge>
      case "cancelled":
        return <Badge variant="outline" className="border-destructive text-destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredOrders = salesOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage sales orders and customer relationships
          </p>
        </div>
        
        <Button variant="default" className="shadow-material">
          <Plus className="w-4 h-4 mr-2" />
          Create Sales Order
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-surface-container border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search sales orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Orders Table */}
      <Card className="bg-surface-container border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Sales Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-surface-container-high">
                    <TableCell>
                      <div className="font-mono font-medium">
                        {order.orderNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{order.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {order.orderDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {order.deliveryDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">
                        ¥{order.totalValue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-success">
                        ¥{order.profit.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {((order.profit / order.totalValue) * 100).toFixed(1)}% margin
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{salesOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <span className="text-success font-bold">¥</span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ¥{salesOrders.reduce((sum, o) => sum + o.totalValue, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-tertiary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ¥{salesOrders.reduce((sum, o) => sum + o.profit, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {salesOrders.filter(o => o.status === "delivered").length}
                </p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}