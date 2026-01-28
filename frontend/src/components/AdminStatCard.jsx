export default function AdminStatCard({ title, value, icon }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        minWidth: 200,
        background: "#fafafa"
      }}
    >
      <h4>{icon} {title}</h4>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {value}
      </div>
    </div>
  );
}
