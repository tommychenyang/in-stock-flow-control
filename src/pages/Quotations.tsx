import React from 'react';
import { useParams } from 'react-router-dom';
import { QuotationsList } from '@/components/quotations/QuotationsList';
import { QuotationForm } from '@/components/quotations/QuotationForm';

export default function Quotations() {
  const { id, action } = useParams();
  
  // If we have an ID parameter, show the form
  if (id || action === 'new') {
    return <QuotationForm />;
  }
  
  // Default view is the list
  return <QuotationsList />;
}