export default function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        padding: "15px",
        textAlign: "center",
        color: "#6b7280",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} Mini ERP CRM | Developed by Shirisha Pitta
    </footer>
  );
}