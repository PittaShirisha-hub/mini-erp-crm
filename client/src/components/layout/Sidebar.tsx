import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaTruck,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  const menuStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 500,
    transition: "0.3s",
  };

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#3b82f6",
        }}
      >
        Mini ERP CRM
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaUsers />
          Customers
        </NavLink>

        <NavLink
          to="/products"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink
          to="/suppliers"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaTruck />
          Suppliers
        </NavLink>

        <NavLink
          to="/purchases"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaShoppingCart />
          Purchases
        </NavLink>

        <NavLink
          to="/invoices"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaFileInvoiceDollar />
          Invoices
        </NavLink>

        <NavLink
          to="/payments"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaMoneyCheckAlt />
          Payments
        </NavLink>

        <NavLink
          to="/reports"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          <FaChartBar />
          Reports
        </NavLink>
      </div>
    </div>
  );
} 