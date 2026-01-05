document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Auth guard for dashboard
  const user = JSON.parse(localStorage.getItem("worktrack_user"));
  const isLoginPage = window.location.pathname.includes("login.html");

  if (!user && !isLoginPage) {
    window.location.href = "login.html";
  }
});

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const mockUser = {
    name: "John Doe",
    email: email,
    role: "employee",
  };

  localStorage.setItem("worktrack_user", JSON.stringify(mockUser));

  window.location.href = "dashboard.html";
}

function handleLogout() {
  localStorage.removeItem("worktrack_user");
  window.location.href = "login.html";
}
