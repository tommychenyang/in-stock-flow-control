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
  Package,
  AlertTriangle 
} from "lucide-react"

interface Product {
  id: string
  code: string
  name: string
  specifications: string
  category: string
  stock: number
  minStock: number
  unit: string
  price: number
  status: "active" | "inactive" | "low_stock"
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Demo data
  const products: Product[] = [
    {
      id: "1",
      code: "ABC-123",
      name: "Steel Rod 10mm",
      specifications: "10mm diameter, 6m length",
      category: "Raw Materials",
      stock: 150,
      minStock: 50,
      unit: "pieces",
      price: 25.50,
      status: "active"
    },
    {
      id: "2",
      code: "XYZ-456",
      name: "Aluminum Sheet",
      specifications: "2mm thick, 1x2m",
      category: "Sheet Metal",
      stock: 25,
      minStock: 30,
      unit: "sheets",
      price: 85.00,
      status: "low_stock"
    },
    {
      id: "3",
      code: "DEF-789",
      name: "Copper Wire",
      specifications: "2.5mm, insulated",
      category: "Electrical",
      stock: 500,
      minStock: 100,
      unit: "meters",
      price: 3.20,
      status: "active"
    },
    {
      id: "4",
      code: "GHI-012",
      name: "Stainless Bolts M8",
      specifications: "M8x25mm, grade A4",
      category: "Fasteners",
      stock: 0,
      minStock: 200,
      unit: "pieces",
      price: 0.45,
      status: "low_stock"
    }
  ]

  const getStatusBadge = (status: Product["status"], stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (stock <= minStock) {
      return <Badge variant="outline" className="border-warning text-warning">Low Stock</Badge>
    }
    return <Badge variant="outline" className="border-success text-success">In Stock</Badge>
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your inventory products and specifications
          </p>
        </div>
        
        <Button variant="default" className="shadow-material">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-surface-container border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
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

      {/* Products Table */}
      <Card className="bg-surface-container border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-surface-container-high">
                    <TableCell className="font-mono font-medium">
                      {product.code}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.specifications}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {product.stock} {product.unit}
                        </span>
                        {product.stock <= product.minStock && (
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Min: {product.minStock}
                      </div>
                    </TableCell>
                    <TableCell>
                      ¥{product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status, product.stock, product.minStock)}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-container border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.stock <= p.minStock).length}
                </p>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
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
                  ¥{products.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString()}
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