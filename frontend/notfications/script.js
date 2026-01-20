function markAllRead() {
  document.querySelectorAll(".notification.unread").forEach(item => {
    item.classList.remove("unread");
    const dot = item.querySelector(".dot");
    if (dot) dot.remove();
  });
  document.getElementById("unreadCount").innerText = "0";
}

function filterType(type, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".notification").forEach(n => {
    if (type === "all") {
      n.style.display = "flex";
    } else if (type === "unread") {
      n.style.display = n.classList.contains("unread") ? "flex" : "none";
    } else {
      n.style.display = n.dataset.type === type ? "flex" : "none";
    }
  });
}
