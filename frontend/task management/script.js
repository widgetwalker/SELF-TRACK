function filterStatus(status, element) {
  document.querySelectorAll('.tab').forEach(tab =>
    tab.classList.remove('active')
  );
  element.classList.add('active');

  document.querySelectorAll('.task-card').forEach(task => {
    task.style.display =
      status === 'all' || task.dataset.status === status
        ? 'block'
        : 'none';
  });
}

function searchTasks(query) {
  const text = query.toLowerCase();
  document.querySelectorAll('.task-card').forEach(task => {
    const title = task.querySelector('.task-title').innerText.toLowerCase();
    task.style.display = title.includes(text) ? 'block' : 'none';
  });
}
