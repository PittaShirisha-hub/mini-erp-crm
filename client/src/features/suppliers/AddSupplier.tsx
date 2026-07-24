import { useEffect, useState } from "react";

export interface SupplierData {
  supplierName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
}

interface Props {
  onSubmit: (supplier: SupplierData) => void;
  initialData?: SupplierData | null;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function AddSupplier({
  onSubmit,
  initialData,
  isEditing = false,
  onCancel,
}: Props) {
  const emptyForm: SupplierData = {
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  };

  const [formData, setFormData] = useState<SupplierData>(emptyForm);

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
        maxWidth: "700px",
        margin: "0 auto 30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      }}
    >
      <input
        name="supplierName"
        placeholder="Supplier Name"
        value={formData.supplierName}
        onChange={handleChange}
        style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
      />

      <input
        name="contactPerson"
        placeholder="Contact Person"
        value={formData.contactPerson}
        onChange={handleChange}
        style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "15px",
            }}
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={formData.gstNumber}
        onChange={handleChange}
        style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "15px",
                }}
      />

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
                padding: "10px 25px",
                fontSize: "16px",
                borderRadius: "6px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                cursor: "pointer",
            }}
            >
          {isEditing ? "Update Supplier" : "Save Supplier"}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}