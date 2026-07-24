import { useEffect, useState } from "react";
import type { DashboardReport } from "../types/report";
import { getDashboardReport } from "../services/report.service";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const [report, setReport] = useState<DashboardReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await getDashboardReport();

      if (res.success) {
        setReport(res.report);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  if (!report) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No Report Available</h2>
      </div>
    );
  }

  const chartData = {
    labels: [
      "Customers",
      "Products",
      "Suppliers",
      "Invoices",
      "Payments",
    ],
    datasets: [
      {
        label: "ERP Dashboard",
        data: [
          report.totalCustomers,
          report.totalProducts,
          report.totalSuppliers,
          report.totalInvoices,
          report.totalPayments,
        ],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Mini ERP CRM Dashboard Report",
      },
    },
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Mini ERP CRM Dashboard Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Report", "Value"]],
      body: [
        ["Total Customers", report.totalCustomers],
        ["Total Products", report.totalProducts],
        ["Total Suppliers", report.totalSuppliers],
        ["Total Invoices", report.totalInvoices],
        ["Total Payments", report.totalPayments],
        ["Total Revenue", `₹${report.totalRevenue}`],
      ],
    });

    doc.save("ERP_Report.pdf");
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center" as const,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        📊 Reports Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={exportPDF}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          📄 Export Report to PDF
        </button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "450px",
          margin: "0 auto 40px auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>👥 Customers</h3>
          <h1>{report.totalCustomers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>📦 Products</h3>
          <h1>{report.totalProducts}</h1>
        </div>

        <div style={cardStyle}>
          <h3>🚚 Suppliers</h3>
          <h1>{report.totalSuppliers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>🧾 Invoices</h3>
          <h1>{report.totalInvoices}</h1>
        </div>

        <div style={cardStyle}>
          <h3>💳 Payments</h3>
          <h1>{report.totalPayments}</h1>
        </div>

        <div style={cardStyle}>
          <h3>💰 Revenue</h3>
          <h1 style={{ color: "#16a34a" }}>
            ₹{report.totalRevenue}
          </h1>
        </div>
      </div>
    </div>
  );
}