export default function BurnoutBadge({ risk }) {
  const styles = {
    low: { color: "green" },
    medium: { color: "orange" },
    high: { color: "red" }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h4> Burnout Risk</h4>
      <span style={{ fontWeight: "bold", ...styles[risk] }}>
        {risk?.toUpperCase()}
      </span>
      {risk === "high" && (
        <p style={{ color: "red" }}>
           Please consider taking breaks
        </p>
      )}
    </div>
  );
}
