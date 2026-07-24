import { useEffect, useState } from "react";
import type { Invoice } from "../types/invoice";
import { getInvoices } from "../services/invoice.service";
import AddInvoice from "./AddInvoice";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();

      if (res.success) {
        setInvoices(res.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Invoices...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Invoices</h1>

      <AddInvoice />

      <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Business</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.customer.customerName}</td>
                <td>{invoice.customer.businessName}</td>
                <td>{invoice.items[0]?.productName}</td>
                <td>{invoice.items[0]?.quantity}</td>
                <td>₹{invoice.totalAmount}</td>
                <td>{invoice.status}</td>
                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No Invoices Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}