import React, { useState } from 'react';
import { ArrowLeft, Upload, Plus, X, AlertCircle, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
  id: string;
  code: string;
  name: string;
  specifications: string;
  stock: number;
  unitPrice: number;
  category: string;
}

interface QuotationItem extends Product {
  quantity: number;
  subtotal: number;
}

interface UnmatchedItem {
  rowIndex: number;
  productName: string;
  code?: string;
  quantity: number;
  specifications?: string;
}

const mockProducts: Product[] = [
  { id: '1', code: 'ST001', name: 'Steel Rod 10mm', specifications: '10mm diameter, 6m length', stock: 150, unitPrice: 25.50, category: 'Steel' },
  { id: '2', code: 'ST002', name: 'Steel Plate 5mm', specifications: '5mm thick, 1m x 2m', stock: 75, unitPrice: 85.00, category: 'Steel' },
  { id: '3', code: 'AL001', name: 'Aluminum Sheet', specifications: '3mm thick, 1m x 1m', stock: 200, unitPrice: 45.00, category: 'Aluminum' },
];

export function QuotationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id && id !== 'new');

  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([]);
  const [unmatchedItems, setUnmatchedItems] = useState<UnmatchedItem[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quotationNumber, setQuotationNumber] = useState(
    isEdit ? `QT-2024-${id?.padStart(3, '0')}` : `QT-2024-${String(Date.now()).slice(-3)}`
  );

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = quotationItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate Excel parsing
      setTimeout(() => {
        const mockUnmatched: UnmatchedItem[] = [
          { rowIndex: 1, productName: 'Custom Steel Component', code: 'CSC001', quantity: 10, specifications: 'Custom specification 1' },
          { rowIndex: 3, productName: 'Special Aluminum Part', code: 'SAP001', quantity: 5, specifications: 'Special aluminum part for industrial use' },
        ];
        setUnmatchedItems(mockUnmatched);
        
        // Add matched products
        const matchedItem: QuotationItem = {
          ...mockProducts[0],
          quantity: 20,
          subtotal: 20 * mockProducts[0].unitPrice
        };
        setQuotationItems([matchedItem]);
      }, 1500);
    }
  };

  const handleAddProduct = (product: Product) => {
    const existingItem = quotationItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: QuotationItem = {
        ...product,
        quantity: 1,
        subtotal: product.unitPrice
      };
      setQuotationItems([...quotationItems, newItem]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuotationItems(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.unitPrice }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setQuotationItems(items => items.filter(item => item.id !== productId));
  };

  const handleCreateProduct = (unmatchedItem: UnmatchedItem) => {
    // TODO: Implement product creation
    alert('Product creation will be implemented');
  };

  const handleSearchExisting = (unmatchedItem: UnmatchedItem) => {
    // TODO: Implement existing product lookup
    alert('Existing product lookup will be implemented');
  };

  const handleBulkAdd = () => {
    // TODO: Implement bulk add for all unmatched items
    alert('Bulk add functionality will be implemented');
  };

  const dismissUnmatched = (rowIndex: number) => {
    setUnmatchedItems(items => items.filter(item => item.rowIndex !== rowIndex));
  };

  const handleSaveDraft = () => {
    alert('Quotation saved as draft');
  };

  const handleSubmitQuotation = () => {
    if (unmatchedItems.length > 0) {
      alert('Please resolve all unmatched items before submitting');
      return;
    }
    alert('Quotation submitted successfully!');
    navigate('/quotations');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/quotations')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quotations
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Quotation' : 'Create New Quotation'}
          </h1>
          <p className="text-muted-foreground">
            Quotation: {quotationNumber}
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quotationDate">Quotation Date</Label>
              <Input
                id="quotationDate"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Excel Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <div className="space-y-1">
              <p className="font-medium">Upload buyer's Excel file</p>
              <p className="text-sm text-muted-foreground">Products will be automatically matched</p>
            </div>
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="mt-4 cursor-pointer max-w-xs mx-auto"
            />
          </div>
          {uploadedFile && (
            <div className="mt-4 p-3 bg-surface-variant rounded-lg">
              <p className="font-medium">File uploaded: {uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">Processing...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unmatched Items Banner */}
      {unmatchedItems.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  {unmatchedItems.length} unmatched items found in Excel file
                </p>
                <Button size="sm" onClick={handleBulkAdd}>
                  Bulk Add All
                </Button>
              </div>
              
              <div className="space-y-2">
                {unmatchedItems.map((item) => (
                  <div key={item.rowIndex} className="flex items-center justify-between p-3 bg-surface border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.productName}</span>
                        {item.code && <Badge variant="outline">{item.code}</Badge>}
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      {item.specifications && (
                        <p className="text-sm text-muted-foreground mt-1">{item.specifications}</p>
                      )}
                    </div>
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
                              <Label>Product Name</Label>
                              <Input defaultValue={item.productName} />
                            </div>
                            <div className="space-y-2">
                              <Label>Product Code</Label>
                              <Input defaultValue={item.code} />
                            </div>
                            <div className="space-y-2">
                              <Label>Specifications</Label>
                              <Textarea defaultValue={item.specifications} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Unit Price</Label>
                                <Input type="number" step="0.01" />
                              </div>
                              <div className="space-y-2">
                                <Label>Category</Label>
                                <Input />
                              </div>
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => handleCreateProduct(item)}
                            >
                              Create Product
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleSearchExisting(item)}
                      >
                        <Search className="h-4 w-4 mr-1" />
                        Search Existing
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => dismissUnmatched(item.rowIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Product Search and Add */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search and Add Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search products by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-surface-variant/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.name}</span>
                        <Badge variant="outline">{product.code}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.specifications}</p>
                      <span className="text-sm">Price: ${product.unitPrice}</span>
                    </div>
                    <Button size="sm" onClick={() => handleAddProduct(product)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quotation Items Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quotation Items</CardTitle>
            <div className="text-2xl font-bold text-primary">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {quotationItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p>No items added yet</p>
              <p className="text-sm">Upload an Excel file or search for products to add</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Code</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotationItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.specifications}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-20"
                        min="1"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">${item.subtotal.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline" onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button 
          onClick={handleSubmitQuotation}
          disabled={quotationItems.length === 0 || unmatchedItems.length > 0}
        >
          Submit Quotation
        </Button>
      </div>
    </div>
  );
}