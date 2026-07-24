import { useEffect, useState } from "react";
import api from "../../api/axios";
import { createChallan } from "./challanAPI";

interface Customer {
  id: string;
  customerName: string;
  businessName: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  currentStock: number;
}

interface ChallanItem {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
}

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddChallan = ({ onSuccess, onCancel }: Props) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState("");

  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState<ChallanItem[]>([]);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.customers);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = () => {
    if (!productId) {
      alert("Select Product");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than zero");
      return;
    }

    const product = products.find((p) => p.id === productId);

    if (!product) return;

    if (quantity > product.currentStock) {
      alert("Insufficient Stock");
      return;
    }

    const alreadyExists = items.find(
      (item) => item.productId === productId
    );

    if (alreadyExists) {
      alert("Product already added");
      return;
    }

    setItems([
      ...items,
      {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.unitPrice,
        quantity,
      },
    ]);

    setProductId("");
    setQuantity(1);
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one product");
      return;
    }

    try {
      await createChallan({
        customerId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      alert("Sales Challan Created Successfully");

      setCustomerId("");
      setItems([]);

      if (onSuccess) {
        onSuccess();
      }
          } catch (error) {
      console.error(error);
      alert("Failed to create Sales Challan");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Add Sales Challan</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Customer</label>

          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customerName} ({customer.businessName})
              </option>
            ))}
          </select>
        </div>

        <hr />

        <h3>Add Products</h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{
              flex: 2,
              padding: "10px",
            }}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name} ({product.sku}) | Stock :
                {" "}
                {product.currentStock}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            style={{
              width: "120px",
              padding: "10px",
            }}
          />

          <button
            type="button"
            onClick={addItem}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
        </div>

        {items.length > 0 && (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                  }}
                >
                  <th style={{ padding: "10px" }}>
                    Product
                  </th>

                  <th style={{ padding: "10px" }}>
                    SKU
                  </th>

                  <th style={{ padding: "10px" }}>
                    Unit Price
                  </th>

                  <th style={{ padding: "10px" }}>
                    Quantity
                  </th>

                  <th style={{ padding: "10px" }}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.productId}>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {item.productName}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {item.sku}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      ₹{item.unitPrice}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {item.quantity}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId)
                        }
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>
              Total Quantity : {totalQuantity}
            </h3>
                        <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 30px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Save Challan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onCancel) {
                    onCancel();
                  }
                }}
                style={{
                  padding: "10px 30px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddChallan;