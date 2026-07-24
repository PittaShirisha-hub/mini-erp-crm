import { useEffect, useState } from "react";
import AddChallan from "./AddChallan";
import { getChallans } from "./challanAPI";
import type { Challan } from "../../types/challan";

const ChallanList = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadChallans();
  }, []);

  const loadChallans = async () => {
    try {
      setLoading(true);

      const res = await getChallans();

      setChallans(res.challans);
    } catch (error) {
      console.error(error);
      alert("Failed to load challans");
    } finally {
      setLoading(false);
    }
  };

  const filteredChallans = challans.filter((challan) => {
    return (
      challan.challanNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      challan.customer.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      challan.customer.businessName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sales Challan Management</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Challan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "320px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close" : "Add Challan"}
        </button>
      </div>

      {showForm && (
        <AddChallan
          onSuccess={() => {
            setShowForm(false);
            loadChallans();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <h2>Sales Challan List</h2>

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
              <th style={{ padding: "12px" }}>Challan No</th>
              <th style={{ padding: "12px" }}>Customer</th>
              <th style={{ padding: "12px" }}>Business</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Total Qty</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Products</th>
            </tr>
          </thead>

          <tbody>
                        {filteredChallans.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  No Sales Challans Found
                </td>
              </tr>
            ) : (
              filteredChallans.map((challan) => (
                <tr key={challan.id}>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {challan.challanNumber}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {challan.customer.customerName}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {challan.customer.businessName}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        background:
                          challan.status === "CONFIRMED"
                            ? "#16a34a"
                            : challan.status === "CANCELLED"
                            ? "#dc2626"
                            : "#f59e0b",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {challan.status}
                    </span>
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {challan.totalQuantity}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    {new Date(
                      challan.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {challan.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          marginBottom: "5px",
                        }}
                      >
                        <strong>{item.productName}</strong>
                        {" × "}
                        {item.quantity}
                      </div>
                    ))}
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

export default ChallanList;