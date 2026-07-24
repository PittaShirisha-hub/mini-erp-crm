import { useEffect, useState } from "react";
import AddPurchase from "./AddPurchase";
import { getPurchases, deletePurchase } from "./purchaseAPI";

interface PurchaseItem {
  id: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
}

interface Purchase {
  id: string;
  purchaseNumber: string;
  totalQuantity: number;
  createdAt: string;

  supplier: {
    supplierName: string;
    contactPerson: string;
  };

  items: PurchaseItem[];
}

const PurchaseList = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setLoading(true);

      const res = await getPurchases();

      setPurchases(res.purchases);
    } catch (error) {
      console.error(error);
      alert("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this purchase?"
  );

  if (!confirmDelete) return;

  try {
    await deletePurchase(id);
    alert("Purchase deleted successfully.");
    loadPurchases(); // Refresh the table
  } catch (error) {
    console.error(error);
    alert("Failed to delete purchase.");
  }
};

  const filteredPurchases = purchases.filter((purchase) => {
    return (
      purchase.purchaseNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      purchase.supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      purchase.supplier.contactPerson
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Purchase Management</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Purchase..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "320px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
            onClick={() => {
                console.log("Button clicked");
                setShowForm(!showForm);
            }}
            style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close" : "Add Purchase"}
        </button>
      </div>

      {showForm && (
        <AddPurchase
          onSuccess={() => {
            setShowForm(false);
            loadPurchases();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <h2>Purchase List</h2>

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
          <thead>
            <tr
              style={{
                background: "#2563eb",
                color: "#fff",
              }}
            >
              <th style={{ padding: "12px" }}>Purchase No</th>
              <th style={{ padding: "12px" }}>Supplier</th>
              <th style={{ padding: "12px" }}>Contact Person</th>
              <th style={{ padding: "12px" }}>Total Qty</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Products</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPurchases.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Purchases Found
                </td>
              </tr>
            ) : (
              filteredPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {purchase.purchaseNumber}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {purchase.supplier.supplierName}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {purchase.supplier.contactPerson}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {purchase.totalQuantity}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {purchase.items.map((item) => (
                      <div key={item.id}>
                        {item.productName} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td
  style={{
    textAlign: "center",
    padding: "12px",
  }}
>
  <button
    onClick={() => alert("Edit feature coming next")}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Edit
  </button>
  <button
  onClick={() => handleDelete(purchase.id)}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
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
};

export default PurchaseList;