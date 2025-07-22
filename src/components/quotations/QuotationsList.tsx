import React from 'react';
import { Plus, Eye, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Quotation {
  id: string;
  quotationNumber: string;
  dateCreated: string;
  status: 'New' | 'In Progress' | 'Converted to Order';
  totalPrice: number;
  customerName?: string;
  itemCount: number;
}

const mockQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QT-2024-001',
    dateCreated: '2024-01-15',
    status: 'New',
    totalPrice: 1250.50,
    customerName: 'ABC Manufacturing Corp',
    itemCount: 5
  },
  {
    id: '2', 
    quotationNumber: 'QT-2024-002',
    dateCreated: '2024-01-14',
    status: 'In Progress',
    totalPrice: 850.00,
    customerName: 'XYZ Industries Ltd',
    itemCount: 3
  },
  {
    id: '3',
    quotationNumber: 'QT-2024-003', 
    dateCreated: '2024-01-12',
    status: 'Converted to Order',
    totalPrice: 2100.75,
    customerName: 'DEF Components Inc',
    itemCount: 8
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'New':
      return <Badge variant="secondary">{status}</Badge>;
    case 'In Progress':
      return <Badge variant="default">{status}</Badge>;
    case 'Converted to Order':
      return <Badge variant="outline" className="border-success text-success">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function QuotationsList() {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/quotations/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/quotations/${id}/edit`);
  };

  const handleView = (id: string) => {
    navigate(`/quotations/${id}/view`);
  };

  const handleConvertToOrder = (id: string) => {
    // TODO: Implement conversion to order
    alert('Convert to order functionality will be implemented');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quotations</h1>
          <p className="text-muted-foreground">Manage all quotations and customer inquiries</p>
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Quotation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockQuotations.map((quotation) => (
                <TableRow key={quotation.id} className="hover:bg-surface-variant/50">
                  <TableCell className="font-medium">
                    {quotation.quotationNumber}
                  </TableCell>
                  <TableCell>
                    {quotation.customerName || 'Not specified'}
                  </TableCell>
                  <TableCell>
                    {new Date(quotation.dateCreated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(quotation.status)}
                  </TableCell>
                  <TableCell>
                    {quotation.itemCount} items
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${quotation.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(quotation.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(quotation.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {quotation.status === 'In Progress' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConvertToOrder(quotation.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Convert
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}