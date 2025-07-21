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
  ShoppingCart,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

interface PurchaseOrder {
  id: string
  orderNumber: string
  supplier: string
  orderDate: string
  expectedDate: string
  status: "pending" | "approved" | "shipped" | "received" | "cancelled"
  totalValue: number
  items: {
    productCode: string
    productName: string
    quantity: number
    unitPrice: number
    total: number
  }[]
}

export default function Procurement() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Demo data
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "1",
      orderNumber: "PO-2024-001",
      supplier: "Steel Solutions Ltd.",
      orderDate: "2024-01-15",
      expectedDate: "2024-01-25",
      status: "received",
      totalValue: 125000,
      items: [
        {
          productCode: "ABC-123",
          productName: "Steel Rod 10mm",
          quantity: 500,
          unitPrice: 25.50,
          total: 12750
        }
      ]
    },
    {
      id: "2",
      orderNumber: "PO-2024-002",
      supplier: "Precision Parts Co.",
      orderDate: "2024-01-18",
      expectedDate: "2024-01-28",
      status: "shipped",
      totalValue: 89000,
      items: [
        {
          productCode: "XYZ-456",
          productName: "Aluminum Sheet",
          quantity: 200,
          unitPrice: 85.00,
          total: 17000
        }
      ]
    },
    {
      id: "3",
      orderNumber: "PO-2024-003",
      supplier: "Electronic Supply Corp",
      orderDate: "2024-01-20",
      expectedDate: "2024-01-30",
      status: "approved",
      totalValue: 65000,
      items: [
        {
          productCode: "DEF-789",
          productName: "Copper Wire",
          quantity: 1000,
          unitPrice: 3.20,
          total: 3200
        }
      ]
    },
    {
      id: "4",
      orderNumber: "PO-2024-004",
      supplier: "Quality Fasteners",
      orderDate: "2024-01-22",
      expectedDate: "2024-02-01",
      status: "pending",
      totalValue: 45000,
      items: [
        {
          productCode: "GHI-012",
          productName: "Stainless Bolts M8",
          quantity: 10000,
          unitPrice: 0.45,
          total: 4500
        }
      ]
    }
  ]

  const getStatusIcon = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "received":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "shipped":
        return <Package className="w-4 h-4 text-primary" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "received":
        return <Badge variant="outline" className="border-success text-success">Received</Badge>
      case "shipped":
        return <Badge variant="outline" className="border-primary text-primary">Shipped</Badge>
      case "approved":
        return <Badge variant="outline" className="border-primary text-primary">Approved</Badge>
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>
      case "cancelled":
        return <Badge variant="outline" className="border-destructive text-destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredOrders = purchaseOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Procurement Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage purchase orders and supplier procurement
          </p>
        </div>
        
        <Button variant="default" className="shadow-material">
          <Plus className="w-4 h-4 mr-2" />
          Create Purchase Order
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-surface-container border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search purchase orders..."
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

      {/* Purchase Orders Table */}
      <Card className="bg-surface-container border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Purchase Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Total Value</TableHead>
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
                      <div className="font-medium">{order.supplier}</div>
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
                        {order.expectedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">
                        ¥{order.totalValue.toLocaleString()}
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
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{purchaseOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {purchaseOrders.filter(o => o.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
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
                  {purchaseOrders.filter(o => o.status === "received").length}
                </p>
                <p className="text-sm text-muted-foreground">Received</p>
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
                  ¥{purchaseOrders.reduce((sum, o) => sum + o.totalValue, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}