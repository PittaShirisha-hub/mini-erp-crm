export interface InvoiceItem {
  id: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;

  customer: {
    customerName: string;
    businessName: string;
  };

  items: InvoiceItem[];
}