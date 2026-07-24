import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

interface Customer {
  id: string;
  customerName: string;
  businessName: string;
  email: string;
  mobile: string;
  address: string;
  gstNumber: string;
  customerType: string;
  status: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();

      if (res.success) {
        setCustomers(res.customers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (customer: any) => {
  try {
    if (editingCustomer) {
      const res = await updateCustomer(editingCustomer.id, customer);

      if (res.success) {
        alert("Customer updated successfully!");
        setEditingCustomer(null);
        fetchCustomers();
      }
    } else {
      const res = await addCustomer(customer);

      if (res.success) {
        alert("Customer added successfully!");
        fetchCustomers();
      }
    }
  } catch (err) {
    console.error(err);
    alert("Operation failed");
  }
};

const handleDelete = async (id: string) => {
  const ok = window.confirm(
    "Are you sure you want to delete this customer?"
  );

  if (!ok) return;

  try {
    const res = await deleteCustomer(id);

    if (res.success) {
      alert("Customer deleted successfully!");
      fetchCustomers();
    }
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.businessName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.mobile.includes(search)
  );

      return (
        <div style={{ padding: "30px" }}>

        <h2
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "25px",
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          Customer Management
        </h2>

          <CustomerForm
            onSubmit={handleSubmit}
            initialData={editingCustomer}
            isEditing={!!editingCustomer}
            onCancel={() => setEditingCustomer(null)}
          />

        <h2
          style={{
            color: "#2563eb",
            marginTop: "15px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Customer List
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "400px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

      {loading ? (
        <h2>Loading Customers...</h2>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <thead
              style={{
                background: "#2563eb",
                color: "white",
              }}
            >
              <tr>
                <th style={{ padding: "15px" }}>Customer</th>
                <th style={{ padding: "15px" }}>Business</th>
                <th style={{ padding: "15px" }}>Email</th>
                <th style={{ padding: "15px" }}>Mobile</th>
                <th style={{ padding: "15px" }}>GST</th>
                <th style={{ padding: "15px" }}>Type</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <td style={{ padding: "15px" }}>
                      {customer.customerName}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {customer.businessName}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {customer.email}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {customer.mobile}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {customer.gstNumber}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {customer.customerType}
                    </td>

                    <td style={{ padding: "15px" }}>
                      <span
                        style={{
                          backgroundColor:
                            customer.status === "ACTIVE"
                              ? "#22c55e"
                              : customer.status === "LEAD"
                              ? "#f59e0b"
                              : "#ef4444",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#666",
                    }}
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}