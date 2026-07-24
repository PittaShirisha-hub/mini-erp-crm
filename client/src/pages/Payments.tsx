import { useEffect, useState } from "react";
import type { Payment } from "../types/payment";
import { getPayments } from "../services/payment.service";
import api from "../api/axios";


export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("CASH");

  useEffect(() => {
    fetchPayments();
    fetchInvoices();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getPayments();

      if (res.success) {
        setPayments(res.payments);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");

      if (res.data.success) {
        setInvoices(res.data.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const savePayment = async () => {
  if (!invoiceId) {
    alert("Please select an invoice");
    return;
  }

  if (amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    await api.post("/payments", {
      invoiceId,
      amount,
      method,
    });

    alert("Payment Recorded Successfully");

    setInvoiceId("");
    setAmount(0);
    setMethod("CASH");

    fetchPayments();
    fetchInvoices();
  } catch (error) {
    console.error(error);
    alert("Failed to record payment");
  }
};

  if (loading) {
    return <h2>Loading Payments...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payments</h1>

      <div
  style={{
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
  }}
>
  <h3>Add Payment</h3>

  <div style={{ marginBottom: "15px" }}>
    <label>Invoice</label>

    <select
      value={invoiceId}
      onChange={(e) => setInvoiceId(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginTop: "5px",
      }}
    >
      <option value="">Select Invoice</option>

      {invoices.map((invoice) => (
        <option key={invoice.id} value={invoice.id}>
          {invoice.invoiceNumber} - ₹{invoice.totalAmount}
        </option>
      ))}
    </select>
  </div>

  <div style={{ marginBottom: "15px" }}>
    <label>Amount</label>

    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      style={{
        width: "100%",
        padding: "10px",
        marginTop: "5px",
      }}
    />
  </div>

  <div style={{ marginBottom: "15px" }}>
    <label>Payment Method</label>

    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginTop: "5px",
      }}
    >
      <option value="CASH">Cash</option>
      <option value="UPI">UPI</option>
      <option value="CARD">Card</option>
      <option value="BANK_TRANSFER">Bank Transfer</option>
    </select>
  </div>

  <button
    onClick={savePayment}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Save Payment
  </button>
  </div>

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
            <th>Payment No</th>
            <th>Invoice No</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Received By</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.paymentNumber}</td>
                <td>{payment.invoice.invoiceNumber}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.method}</td>
                <td>{payment.invoice.status}</td>
                <td>{payment.createdBy.name}</td>
                <td>
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Payments Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}