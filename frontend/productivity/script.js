function drawLineChart(canvasId, labels, data, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const padding = 40;
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const max = Math.max(...data) + 5;
  const min = Math.min(...data) - 5;

  ctx.strokeStyle = "#e5e7eb";
  ctx.beginPath();
  ctx.moveTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.beginPath();

  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * (w - padding * 2);
    const y = h - padding - ((value - min) / (max - min)) * (h - padding * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

drawLineChart(
  "trendChart",
  ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  [72, 68, 75, 71, 82, 78],
  "#2563eb"
);

drawLineChart(
  "weekChart",
  ["Mon", "Tue", "Wed", "Thu", "Fri"],
  [8, 9, 7, 8.5, 7.5],
  "#16a34a"
);
