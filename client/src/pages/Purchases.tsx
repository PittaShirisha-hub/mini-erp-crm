import { useEffect, useState } from "react";
import type { Purchase } from "../types/purchase";
import { getPurchases } from "../services/purchase.service";

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await getPurchases();

      if (res.success) {
        setPurchases(res.purchases);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Purchases...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Purchases</h1>

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
            <th>Purchase No</th>
            <th>Supplier</th>
            <th>Company</th>
            <th>Total Qty</th>
            <th>Product</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.purchaseNumber}</td>
                <td>{purchase.supplier.supplierName}</td>
                <td>{purchase.supplier.companyName}</td>
                <td>{purchase.totalQuantity}</td>
                <td>{purchase.items[0]?.productName}</td>
                <td>₹{purchase.items[0]?.unitPrice}</td>
                <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Purchases Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}