document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginTab = document.getElementById("login-tab");
  const signupTab = document.getElementById("signup-tab");
  const loginPanel = document.getElementById("login-panel");
  const signupPanel = document.getElementById("signup-panel");

  // Tab switching
  if (loginTab) {
    loginTab.addEventListener("click", () => {
      loginPanel.style.display = "block";
      signupPanel.style.display = "none";
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
    });
  }

  if (signupTab) {
    signupTab.addEventListener("click", () => {
      signupPanel.style.display = "block";
      loginPanel.style.display = "none";
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
    });
  }

  // Form handlers
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Auth guard: redirect if already logged in
  const user = localStorage.getItem("worktrack_user");
  const token = localStorage.getItem("worktrack_token");

  if (user && token && !window.location.pathname.includes("3-dashboard")) {
    const userData = JSON.parse(user);
    const role = userData.role;
    if (role === "admin") {
      window.location.href = "../admin-dashboard/index.html";
    } else {
      window.location.href = "../3-dashboard/index.html";
    }
  }
});

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error-message");
  const loginBtn = document.getElementById("login-btn");

  errorDiv.style.display = "none";
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const response = await api.login(email, password);

    if (response.token && response.user) {
      // Store token and user info
      localStorage.setItem("worktrack_token", response.token);
      localStorage.setItem("worktrack_user", JSON.stringify({
        id: response.user.id,
        name: response.user.fullName,
        email: response.user.email,
        role: response.user.role,
        token: response.token
      }));

      // Redirect based on role
      if (response.user.role === "admin") {
        window.location.href = "../admin-dashboard/index.html";
      } else {
        window.location.href = "../3-dashboard/index.html";
      }
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    errorDiv.textContent = error.message || "Login failed. Please check your credentials.";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.display = "block";
    console.error("Login Error:", error);
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
}

async function handleSignup(e) {
  e.preventDefault();

  const fullName = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  const role = document.getElementById("signup-role").value;
  const errorDiv = document.getElementById("signup-error-message");
  const signupBtn = document.getElementById("signup-btn");

  errorDiv.style.display = "none";

  // Validation
  if (!fullName || !email || !password || !confirmPassword || !role) {
    errorDiv.textContent = "All fields are required";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.display = "block";
    return;
  }

  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.display = "block";
    return;
  }

  signupBtn.disabled = true;
  signupBtn.textContent = "Creating account...";

  try {
    const response = await api.register(fullName, email, password, role);

    if (response.token && response.user) {
      // Store token and user info
      localStorage.setItem("worktrack_token", response.token);
      localStorage.setItem("worktrack_user", JSON.stringify({
        id: response.user.id,
        name: response.user.fullName,
        email: response.user.email,
        role: response.user.role,
        token: response.token
      }));

      // Show success and redirect
      errorDiv.textContent = "Account created successfully! Redirecting...";
      errorDiv.style.color = "#28a745";
      errorDiv.style.display = "block";

      setTimeout(() => {
        if (response.user.role === "admin") {
          window.location.href = "../admin%20dashboard/index.html";
        } else {
          window.location.href = "../3-dashboard/index.html";
        }
      }, 1500);
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    errorDiv.textContent = error.message || "Sign up failed. Please try again.";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.display = "block";
    console.error("Signup Error:", error);
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = "Create Account";
  }
}

function handleLogout() {
  localStorage.removeItem("worktrack_user");
  localStorage.removeItem("worktrack_token");
  window.location.href = "../2-login/login.html";
}
