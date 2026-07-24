import { useEffect, useState } from "react";
import api from "../../api/axios";
import { createPurchase } from "./purchaseAPI";

interface Supplier {
  id: string;
  supplierName: string;
  companyName: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
}

interface PurchaseItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddPurchase = ({ onSuccess, onCancel }: Props) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [items, setItems] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    loadSuppliers();
    loadProducts();
  }, []);

  useEffect(() => {
    setTotalAmount(unitPrice * quantity);
  }, [unitPrice, quantity]);

  const loadSuppliers = async () => {
    try {
      const res = await api.get("/suppliers");
      setSuppliers(res.data.suppliers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;

    setProductId(id);

    const product = products.find((p) => p.id === id);

    if (product) {
      setUnitPrice(product.unitPrice);
    } else {
      setUnitPrice(0);
    }
  };

  const addItem = () => {
    if (!productId) {
      alert("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity should be greater than zero.");
      return;
    }

    const product = products.find((p) => p.id === productId);

        if (!product) return;

        // Check if the product is already in the list
        const alreadyExists = items.some(
        (item) => item.productId === productId
        );

        if (alreadyExists) {
        alert("This product is already added.");
        return;
        }

    const newItem: PurchaseItem = {
    productId: product.id,
    productName: product.name,
    sku: product.sku,
    quantity,
    unitPrice: product.unitPrice,
    total: product.unitPrice * quantity,
    };

    setItems((prev) => [...prev, newItem]);

    setProductId("");
    setQuantity(1);
    setUnitPrice(0);
    setTotalAmount(0);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!supplierId) {
      alert("Please select a supplier.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    try {
      await createPurchase({
        supplierId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      alert("Purchase Created Successfully");

        setSupplierId("");
        setProductId("");
        setQuantity(1);
        setUnitPrice(0);
        setTotalAmount(0);
        setItems([]);

        // Close the form and refresh the list
        if (onSuccess) {
        onSuccess();
        }
    } catch (error) {
      console.error(error);
      alert("Failed to create purchase.");
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
      <h2>Add Purchase</h2>

      <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
    <label
      style={{
        display: "block",
        marginBottom: "6px",
        fontWeight: "bold",
      }}
    >
      Supplier
    </label>

    <select
      value={supplierId}
      onChange={(e) => setSupplierId(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    >
      <option value="">Select Supplier</option>

      {suppliers.map((supplier) => (
        <option key={supplier.id} value={supplier.id}>
          {supplier.supplierName} ({supplier.companyName})
        </option>
      ))}
    </select>
  </div>

  <hr />

  <h3>Add Product</h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "15px",
      marginBottom: "15px",
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
          borderRadius: "5px",
          border: "1px solid #ccc",
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
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
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
          borderRadius: "5px",
          border: "1px solid #ccc",
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
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontWeight: "bold",
        }}
      />
    </div>
  </div>

  <button
    type="button"
    onClick={addItem}
    style={{
      padding: "10px 25px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "20px",
    }}
  >
    Add Product
  </button>
              {items.length > 0 && (
          <>
            <h3>Purchase Items</h3>

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
                  <th style={{ padding: "10px" }}>Product</th>
                    <th style={{ padding: "10px" }}>SKU</th>
                    <th style={{ padding: "10px" }}>Quantity</th>
                    <th style={{ padding: "10px" }}>Unit Price</th>
                    <th style={{ padding: "10px" }}>Total</th>
                    <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
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
                      {item.quantity}
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
                        fontWeight: "bold",
                      }}
                    >
                      ₹{item.total}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
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
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
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
            }}
          >
            Save Purchase
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 30px",
              background: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPurchase;