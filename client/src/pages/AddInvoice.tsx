import { useEffect, useState } from "react";
import api from "../api/axios";

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
}

interface InvoiceItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const AddInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [items, setItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  useEffect(() => {
    setTotalAmount(quantity * unitPrice);
  }, [quantity, unitPrice]);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.customers || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;
    setProductId(id);

    const selected = products.find((p) => p.id === id);

    if (selected) {
      setUnitPrice(selected.unitPrice);
    } else {
      setUnitPrice(0);
    }
  };

  const addItem = () => {
    if (!productId) {
      alert("Select a product");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity should be greater than 0");
      return;
    }

    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const exists = items.find(
      (item) => item.productId === product.id
    );

    if (exists) {
      alert("Product already added");
      return;
    }

    const newItem: InvoiceItem = {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity,
      unitPrice: product.unitPrice,
      total: quantity * product.unitPrice,
    };

    setItems([...items, newItem]);

    setProductId("");
    setQuantity(1);
    setUnitPrice(0);
    setTotalAmount(0);
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  const saveInvoice = async () => {
    if (!customerId) {
      alert("Select customer");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one product");
      return;
    }

    try {
      const payload = {
        customerId,
        items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        })),
        };

        await api.post("/invoices", payload);

      alert("Invoice Created Successfully");

      setCustomerId("");
      setItems([]);
      setProductId("");
      setQuantity(1);
      setUnitPrice(0);
      setTotalAmount(0);
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    }
  };
    return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        Add Invoice
      </h2>

      {/* Customer */}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "bold",
          }}
        >
          Customer
        </label>

        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
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

      <h3
        style={{
          textAlign: "center",
          color: "#2563eb",
          margin: "20px 0",
        }}
      >
        Add Product
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "15px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Product
          </label>

          <select
            value={productId}
            onChange={handleProductChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.sku})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Unit Price
          </label>

          <input
            type="text"
            value={`₹${unitPrice}`}
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Total Amount
          </label>

          <input
            type="text"
            value={`₹${totalAmount}`}
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        <button
          type="button"
          onClick={addItem}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </div>

      {items.length > 0 && (
        <>
          <h3
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginTop: "30px",
            }}
          >
            Invoice Items
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
            }}
          >
            <thead>
              <tr style={{ background: "#2563eb", color: "#fff" }}>
                <th style={{ padding: "10px" }}>Product</th>
                <th style={{ padding: "10px" }}>SKU</th>
                <th style={{ padding: "10px" }}>Qty</th>
                <th style={{ padding: "10px" }}>Unit Price</th>
                <th style={{ padding: "10px" }}>Total</th>
                <th style={{ padding: "10px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {item.productName}
                  </td>

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {item.sku}
                  </td>

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {item.quantity}
                  </td>

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    ₹{item.unitPrice}
                  </td>

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    ₹{item.total}
                  </td>

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
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

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <button
              onClick={saveInvoice}
              style={{
                background: "green",
                color: "#fff",
                border: "none",
                padding: "12px 30px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save Invoice
            </button>
          </div>
        </>
      )}
          </div>
  );
};

export default AddInvoice;