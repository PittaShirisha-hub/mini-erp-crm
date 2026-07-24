import { useEffect, useState } from "react";

export interface CustomerData {
  customerName: string;
  businessName: string;
  email: string;
  mobile: string;
  address: string;
  gstNumber: string;
  customerType: string;
}

interface CustomerFormProps {
  onSubmit: (customer: CustomerData) => void;
  initialData?: CustomerData | null;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function CustomerForm({
  onSubmit,
  initialData,
  isEditing = false,
  onCancel,
}: CustomerFormProps) {
  const emptyForm = {
  customerName: "",
  businessName: "",
  email: "",
  mobile: "",
  address: "",
  gstNumber: "",
  customerType: "RETAIL",
};

  const [formData, setFormData] = useState<CustomerData>(emptyForm);

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
      [e.target.name]: e.target.value,
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
        display: "grid",
        gap: "12px",
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto 30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <input
        name="customerName"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          backgroundColor: "white",
          color: "black",
        }}
      />

      <input
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={formData.gstNumber}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <select
        name="customerType"
        value={formData.customerType}
        onChange={(e) =>
          setFormData({
            ...formData,
            customerType: e.target.value,
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontSize: "16px",
          appearance: "none",
        }}
      >
        <option value="RETAIL">Retail</option>
        <option value="WHOLESALE">Wholesale</option>
        <option value="DISTRIBUTOR">Distributor</option>
      </select>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Customer" : "Save Customer"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#6b7280",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
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