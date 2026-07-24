export interface ChallanItem {
  id: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
}

export interface Customer {
  id: string;
  customerName: string;
  businessName: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  currentStock: number;
}

export interface Challan {
  id: string;
  challanNumber: string;
  totalQuantity: number;
  status: string;
  createdAt: string;

  customer: Customer;

  items: ChallanItem[];
}

export interface ChallanData {
  customerId: string;

  items: {
    productId: string;
    quantity: number;
  }[];
}