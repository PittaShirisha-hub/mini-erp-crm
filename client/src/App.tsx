import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Customers from "./pages/Customers";
import ProductList from "./features/products/ProductList";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import SupplierList from "./features/suppliers/SupplierList";
import PurchaseList from "./features/purchases/PurchaseList";
import ChallanList from "./features/challans/ChallanList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/purchases" element={<PurchaseList />} />
          <Route path="/challans" element={<ChallanList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;