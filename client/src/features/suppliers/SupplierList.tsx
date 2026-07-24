import { useEffect, useState } from "react";
import AddSupplier from "./AddSupplier";
import type { SupplierData } from "./AddSupplier";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "./supplierAPI";
import type { Supplier } from "../../types/supplier";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const res = await getSuppliers();
      setSuppliers(res.suppliers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (supplier: SupplierData) => {
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, supplier);
        alert("Supplier Updated Successfully");
        setEditingSupplier(null);
      } else {
        await createSupplier(supplier);
        alert("Supplier Added Successfully");
      }

      loadSuppliers();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this supplier?"))
      return;

    try {
      await deleteSupplier(id);
      alert("Supplier Deleted Successfully");
      loadSuppliers();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.contactPerson
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.email.toLowerCase().includes(search.toLowerCase()) ||
      supplier.phone.includes(search)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Supplier Management
      </h1>

      <AddSupplier
        onSubmit={handleSubmit}
        initialData={editingSupplier}
        isEditing={editingSupplier !== null}
        onCancel={() => setEditingSupplier(null)}
      />

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "320px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
        />
      </div>

      <h2>Supplier List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
            }}
            >
          <thead
            style={{
                background: "#2563eb",
                color: "#fff",
            }}
            >
 
          <tr>
            <th style={{ padding: "12px" }}>Supplier Name</th>
            <th style={{ padding: "12px" }}>Contact Person</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Phone</th>
            <th style={{ padding: "12px" }}>Address</th>
            <th style={{ padding: "12px" }}>GST Number</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>

          </thead>

          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No Suppliers Found
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.supplierName}</td>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.contactPerson}</td>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.email}</td>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.phone}</td>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.address}</td>
                  <td
  style={{
    padding: "12px",
    textAlign: "center",
  }}
>{supplier.gstNumber}</td>

                  <td>
                    <button
                        onClick={() => setEditingSupplier(supplier)}
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        >
                      Edit
                    </button>

                    <button
                        onClick={() => handleDelete(supplier.id)}
                        style={{
                            background: "#dc2626",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginLeft: "8px",
                        }}
                        >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}