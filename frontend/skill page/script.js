function searchSkills(query) {
  const text = query.toLowerCase();
  document.querySelectorAll(".skill-card").forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(text) ? "block" : "none";
  });
}

function filterCategory(category) {
  document.querySelectorAll(".skill-card").forEach(card => {
    card.style.display =
      category === "all" || card.dataset.category === category
        ? "block"
        : "none";
  });
}
