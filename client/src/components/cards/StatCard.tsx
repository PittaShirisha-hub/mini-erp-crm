import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      style={{
        background: "#1f2937",
        color: "white",
        borderRadius: "12px",
        padding: "20px",
        minHeight: "150px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div>
        <p style={{ color: "#9ca3af", marginBottom: 10 }}>{title}</p>

        <h2 style={{ fontSize: 32, fontWeight: "bold" }}>
          {value}
        </h2>
      </div>

      <div
        style={{
          fontSize: 48,
          color: "#3b82f6",
        }}
      >
        {icon}
      </div>
    </div>
  );
}