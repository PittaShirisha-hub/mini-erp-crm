export interface Payment {
  id: string;
  paymentNumber: string;
  amount: number;
  paymentDate: string;
  method: string;

  invoice: {
    invoiceNumber: string;
    status: string;
  };

  createdBy: {
    name: string;
  };
}