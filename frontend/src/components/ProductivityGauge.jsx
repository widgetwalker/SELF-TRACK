export default function ProductivityGauge({ value }) {
  const color =
    value >= 75 ? "green" : value >= 50 ? "orange" : "red";

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h4> Productivity</h4>
      <div style={{ fontSize: 28, color, fontWeight: "bold" }}>
        {value}%
      </div>
      <small>Status: {color}</small>
    </div>
  );
}
