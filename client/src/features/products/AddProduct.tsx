import { useEffect, useState } from "react";

export interface ProductData {
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
  description: string;
}

interface Props {
  onSubmit: (product: ProductData) => void;
  initialData?: ProductData | null;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function AddProduct({
  onSubmit,
  initialData,
  isEditing = false,
  onCancel,
}: Props) {
  const emptyForm: ProductData = {
    name: "",
    sku: "",
    category: "",
    unitPrice: 0,
    currentStock: 0,
    minimumStock: 0,
    warehouse: "",
    description: "",
  };

  const [formData, setFormData] = useState<ProductData>(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);

    if (!isEditing) {
      setFormData(emptyForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "900px",
        margin: "0 auto 25px",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "14px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        Add New Product
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(300px, 1fr))",
          gap: "22px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Product Name
          </label>

          <input
            name="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            SKU
          </label>

          <input
            name="sku"
            placeholder="Enter SKU"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Category
          </label>

          <input
            name="category"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Price (₹)
          </label>

          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Current Stock
          </label>

          <input
            type="number"
            name="currentStock"
            value={formData.currentStock}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Minimum Stock
          </label>

          <input
            type="number"
            name="minimumStock"
            value={formData.minimumStock}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Warehouse
          </label>

          <input
            name="warehouse"
            placeholder="Warehouse Name"
            value={formData.warehouse}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            placeholder="Enter Product Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "35px",
        }}
      >
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "14px 60px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Product" : "Save Product"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "14px 60px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}