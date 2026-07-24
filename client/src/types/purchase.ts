export interface PurchaseItem {
  id: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
}

export interface Purchase {
  id: string;
  purchaseNumber: string;
  totalQuantity: number;
  createdAt: string;

  supplier: {
    supplierName: string;
    companyName: string;
  };

  items: PurchaseItem[];
}