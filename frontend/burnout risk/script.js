function drawBarChart() {
  const canvas = document.getElementById("stressChart");
  const ctx = canvas.getContext("2d");

  const data = [
    { day: "Mon", value: 35 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 65 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 30 }
  ];

  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height;
  const padding = 40;
  const barWidth = 60;
  const max = 100;

  ctx.clearRect(0, 0, w, h);

  data.forEach((item, i) => {
    const x = padding + i * (barWidth + 24);
    const barHeight = (item.value / max) * (h - padding * 2);
    const y = h - padding - barHeight;

    let color = "#16a34a";
    if (item.value >= 50 && item.value < 70) color = "#f59e0b";
    if (item.value >= 70) color = "#dc2626";

    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Segoe UI";
    ctx.fillText(item.day, x + 18, h - 16);
  });
}

drawBarChart();
