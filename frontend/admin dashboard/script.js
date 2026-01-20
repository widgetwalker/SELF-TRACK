function drawDeptChart() {
  const canvas = document.getElementById("deptChart");
  const ctx = canvas.getContext("2d");

  const data = [
    { label: "Engineering", value: 85 },
    { label: "Design", value: 78 },
    { label: "Marketing", value: 74 },
    { label: "Sales", value: 88 },
    { label: "HR", value: 80 }
  ];

  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height;
  const padding = 40;
  const barHeight = 28;
  const max = 100;

  ctx.clearRect(0, 0, w, h);

  data.forEach((item, i) => {
    const y = padding + i * (barHeight + 18);
    const barWidth = (item.value / max) * (w - padding * 2);

    ctx.fillStyle = "#2563eb";
    ctx.fillRect(padding, y, barWidth, barHeight);

    ctx.fillStyle = "#6b7280";
    ctx.font = "13px Segoe UI";
    ctx.fillText(item.label, 10, y + 18);
  });
}

function drawRiskChart() {
  const canvas = document.getElementById("riskChart");
  const ctx = canvas.getContext("2d");

  const data = [
    { value: 35, color: "#16a34a" },
    { value: 12, color: "#f59e0b" },
    { value: 3, color: "#dc2626" }
  ];

  const total = data.reduce((a, b) => a + b.value, 0);
  let start = -Math.PI / 2;

  const size = canvas.width = canvas.offsetWidth;
  canvas.height = size;

  data.forEach(d => {
    const angle = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(size / 2, size / 2);
    ctx.arc(size / 2, size / 2, size / 2.5, start, start + angle);
    ctx.fillStyle = d.color;
    ctx.fill();
    start += angle;
  });

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

drawDeptChart();
drawRiskChart();
