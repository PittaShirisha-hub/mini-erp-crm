import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const value = search.toLowerCase().trim();

      switch (value) {
        case "dashboard":
          navigate("/dashboard");
          break;

        case "customers":
          navigate("/customers");
          break;

        case "products":
          navigate("/products");
          break;

        case "suppliers":
          navigate("/suppliers");
          break;

        case "purchases":
          navigate("/purchases");
          break;

        case "invoices":
          navigate("/invoices");
          break;

        case "payments":
          navigate("/payments");
          break;

        case "reports":
          navigate("/reports");
          break;

        default:
          alert("Page not found");
      }

      setSearch("");
    }
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Search Box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          padding: "10px 15px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <FaSearch color="#6b7280" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            marginLeft: "10px",
            width: "100%",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell
          size={22}
          color="#374151"
          style={{ cursor: "pointer" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={36} color="#2563eb" />

          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {user.name || "User"}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              ERP User
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 18px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}