import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaTruck,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
} from "react-icons/fa";

import StatCard from "../../components/cards/StatCard";
import RevenueChart from "../../components/cards/RevenueChart";
import { getDashboardReport } from "../../services/report.service";
import type { DashboardReport } from "../../types/report";

export default function Dashboard() {
  const [report, setReport] = useState<DashboardReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardReport();

      console.log("Dashboard Response:", res);

      if (res.success) {
        setReport(res.report);
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  if (!report) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "red",
          fontSize: "22px",
        }}
      >
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <StatCard
          title="Customers"
          value={report.totalCustomers}
          icon={<FaUsers />}
        />

        <StatCard
          title="Products"
          value={report.totalProducts}
          icon={<FaBoxOpen />}
        />

        <StatCard
          title="Suppliers"
          value={report.totalSuppliers}
          icon={<FaTruck />}
        />

        <StatCard
          title="Invoices"
          value={report.totalInvoices}
          icon={<FaFileInvoiceDollar />}
        />

        <StatCard
          title="Payments"
          value={report.totalPayments}
          icon={<FaMoneyBillWave />}
        />

        <StatCard
          title="Revenue"
          value={`₹${report.totalRevenue.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
}