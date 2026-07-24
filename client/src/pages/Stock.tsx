import { useEffect, useState } from "react";
import { getStock } from "../services/stock.service";

export default function Stock() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await getStock();
      setStock(res.stock);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Stock Inventory</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Minimum</th>
            <th>Warehouse</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.category}</td>
              <td>{item.currentStock}</td>
              <td>{item.minimumStock}</td>
              <td>{item.warehouse}</td>
              <td>₹{item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}