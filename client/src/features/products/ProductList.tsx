import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import type { ProductData } from "./AddProduct";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productAPI";
import type { Product } from "../../types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.products || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (product: ProductData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, product);
        alert("✅ Product Updated Successfully");
        setEditingProduct(null);
      } else {
        await createProduct(product);
        alert("✅ Product Added Successfully");
      }

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("❌ Operation Failed");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("🗑️ Product Deleted Successfully");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "25px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "25px",
        }}
      >
        Product Management
      </h1>

      <AddProduct
        onSubmit={handleSubmit}
        initialData={editingProduct}
        isEditing={editingProduct !== null}
        onCancel={() => setEditingProduct(null)}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "380px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
          }}
        />
      </div>

      <h2
        style={{
          color: "#2563eb",
          marginTop: "5px",
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        Product List
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#2563eb",
                  color: "#ffffff",
                }}
              >
                <th>Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Current Stock</th>
                <th>Minimum Stock</th>
                <th>Warehouse</th>
                <th>Description</th>
                <th
                  style={{
                    minWidth: "180px",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>



                            {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      color: "#6b7280",
                    }}
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{product.name}</td>

                    <td style={{ padding: "12px" }}>{product.sku}</td>

                    <td style={{ padding: "12px" }}>{product.category}</td>

                    <td style={{ padding: "12px" }}>
                      ₹{product.unitPrice}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {product.currentStock}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {product.minimumStock}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {product.warehouse}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {product.description}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <button
                        onClick={() => setEditingProduct(product)}
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 16px",
                          marginRight: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 16px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
