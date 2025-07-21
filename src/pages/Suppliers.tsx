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
  Trash2, 
  Users,
  Phone,
  Mail,
  MapPin,
  Star
} from "lucide-react"

interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
  category: string
  rating: number
  orders: number
  totalValue: number
  status: "active" | "inactive" | "pending"
  lastOrder: string
}

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Demo data
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Steel Solutions Ltd.",
      contact: "Zhang Wei",
      phone: "+86 138 0013 8888",
      email: "zhang@steelsolutions.com",
      address: "Shanghai, China",
      category: "Raw Materials",
      rating: 4.8,
      orders: 45,
      totalValue: 1250000,
      status: "active",
      lastOrder: "2024-01-15"
    },
    {
      id: "2",
      name: "Precision Parts Co.",
      contact: "Li Ming",
      phone: "+86 139 0013 9999",
      email: "li@precisionparts.com",
      address: "Guangzhou, China",
      category: "Components",
      rating: 4.6,
      orders: 32,
      totalValue: 890000,
      status: "active",
      lastOrder: "2024-01-12"
    },
    {
      id: "3",
      name: "Electronic Supply Corp",
      contact: "Wang Fang",
      phone: "+86 137 0013 7777",
      email: "wang@electronicsupply.com",
      address: "Shenzhen, China",
      category: "Electronics",
      rating: 4.2,
      orders: 28,
      totalValue: 650000,
      status: "active",
      lastOrder: "2024-01-10"
    },
    {
      id: "4",
      name: "Quality Fasteners",
      contact: "Chen Hong",
      phone: "+86 136 0013 6666",
      email: "chen@qualityfasteners.com",
      address: "Tianjin, China",
      category: "Fasteners",
      rating: 4.9,
      orders: 67,
      totalValue: 450000,
      status: "pending",
      lastOrder: "2023-12-28"
    }
  ]

  const getStatusBadge = (status: Supplier["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="border-success text-success">Active</Badge>
      case "inactive":
        return <Badge variant="outline" className="border-muted text-muted-foreground">Inactive</Badge>
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="text-sm ml-1">{rating}</span>
      </div>
    )
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your supplier relationships and contacts
          </p>
        </div>
        
        <Button variant="default" className="shadow-material">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-surface-container border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search suppliers..."
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

      {/* Suppliers Table */}
      <Card className="bg-surface-container border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Suppliers ({filteredSuppliers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="hover:bg-surface-container-high">
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{supplier.contact}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {renderStars(supplier.rating)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.orders}</div>
                        <div className="text-xs text-muted-foreground">
                          Last: {supplier.lastOrder}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ¥{supplier.totalValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(supplier.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
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
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{suppliers.length}</p>
                <p className="text-sm text-muted-foreground">Total Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {suppliers.filter(s => s.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-tertiary/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
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
                  ¥{suppliers.reduce((sum, s) => sum + s.totalValue, 0).toLocaleString()}
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