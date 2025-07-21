import React, { useState } from 'react';
import { Upload, Search, Plus, ShoppingCart, FileText, History, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: string;
  code: string;
  name: string;
  specifications: string;
  stock: number;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
  quotedPrice: number;
}

interface SalesHistory {
  date: string;
  customer: string;
  quantity: number;
  price: number;
}

const mockProducts: Product[] = [
  { id: '1', code: 'ST001', name: 'Steel Rod 10mm', specifications: '10mm diameter, 6m length', stock: 150, price: 25.50, category: 'Steel' },
  { id: '2', code: 'ST002', name: 'Steel Plate 5mm', specifications: '5mm thick, 1m x 2m', stock: 75, price: 85.00, category: 'Steel' },
  { id: '3', code: 'AL001', name: 'Aluminum Sheet', specifications: '3mm thick, 1m x 1m', stock: 200, price: 45.00, category: 'Aluminum' },
];

const mockSalesHistory: Record<string, SalesHistory[]> = {
  '1': [
    { date: '2024-01-15', customer: 'ABC Corp', quantity: 50, price: 25.50 },
    { date: '2024-01-10', customer: 'XYZ Ltd', quantity: 30, price: 24.80 },
  ],
  '2': [
    { date: '2024-01-12', customer: 'DEF Inc', quantity: 20, price: 85.00 },
  ],
};

export default function Quotations() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [unmatchedItems, setUnmatchedItems] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate Excel parsing and product matching
      setTimeout(() => {
        setUnmatchedItems(['Custom Part X', 'Special Component Y']);
      }, 1000);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, quotedPrice: product.price }]);
    }
  };

  const updateCartItem = (id: string, field: 'quantity' | 'quotedPrice', value: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const generateQuotation = () => {
    // Simulate quotation generation
    alert('Quotation generated successfully! Ready for export.');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity * item.quotedPrice), 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quotations & Inquiries</h1>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Export History
        </Button>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Excel Upload</TabsTrigger>
          <TabsTrigger value="search">Product Search</TabsTrigger>
          <TabsTrigger value="cart" className="relative">
            Cart
            {cart.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {cart.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Buyer's Excel File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your Excel file here</p>
                  <p className="text-sm text-muted-foreground">Or click to browse</p>
                </div>
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="mt-4 cursor-pointer"
                />
              </div>

              {uploadedFile && (
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium">File uploaded: {uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">Processing and matching products...</p>
                </div>
              )}

              {unmatchedItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Unmatched Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {unmatchedItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{item}</span>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Create Product
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Create New Product</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="productName">Product Name</Label>
                                    <Input id="productName" defaultValue={item} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="productCode">Product Code</Label>
                                    <Input id="productCode" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="specifications">Specifications</Label>
                                    <Textarea id="specifications" />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="price">Price</Label>
                                      <Input id="price" type="number" step="0.01" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="stock">Initial Stock</Label>
                                      <Input id="stock" type="number" />
                                    </div>
                                  </div>
                                  <Button className="w-full">Create Product</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="secondary">
                              <Search className="h-4 w-4 mr-1" />
                              Search Existing
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by product name or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge variant="outline">{product.code}</Badge>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{product.specifications}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">Stock: <span className="font-medium">{product.stock}</span></span>
                        <span className="text-sm">Price: <span className="font-medium">${product.price}</span></span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowHistory(true);
                        }}
                      >
                        <History className="h-4 w-4 mr-1" />
                        History
                      </Button>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Quotation Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">Add products from the search tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.code}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateCartItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              className="w-20"
                              min="1"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.01"
                              value={item.quotedPrice}
                              onChange={(e) => updateCartItem(item.id, 'quotedPrice', parseFloat(e.target.value) || 0)}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            ${(item.quantity * item.quotedPrice).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedProduct(item);
                                  setShowHistory(true);
                                }}
                              >
                                <History className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-lg font-semibold">
                      Total: ${cartTotal.toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setCart([])}>
                        Clear Cart
                      </Button>
                      <Button onClick={generateQuotation} className="gap-2">
                        <Download className="h-4 w-4" />
                        Generate Quotation
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sales History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Sales History - {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProduct && mockSalesHistory[selectedProduct.id] ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesHistory[selectedProduct.id].map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>${sale.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No sales history available for this product.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}