// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth Check
    const user = JSON.parse(localStorage.getItem('worktrack_user'));
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!user && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    }

    if (user && document.getElementById('display-name')) {
        document.getElementById('display-name').textContent = user.name;
    }

    // 2. Load Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. Handle Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // 4. Handle Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // 5. Render Dashboard Data
    const taskContainer = document.getElementById('task-list-container');
    if (taskContainer) {
        renderDashboardTasks();
    }
});

// Logic functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const mockUser = { name: "John Doe", email: email, role: "employee" };
    localStorage.setItem('worktrack_user', JSON.stringify(mockUser));
    window.location.href = 'index.html';
}

function handleLogout() {
    localStorage.removeItem('worktrack_user');
    window.location.href = 'login.html';
}

function renderDashboardTasks() {
    // Mock data from TaskList.tsx
    const tasks = [
        { title: "Complete quarterly report", status: "In Progress", priority: "High" },
        { title: "Team meeting preparation", status: "Pending", priority: "Medium" }
    ];

    const container = document.getElementById('task-list-container');
    container.innerHTML = tasks.map(task => `
        <div style="padding: 1rem 0; border-bottom: 1px solid hsl(var(--border)); display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-weight: 600;">${task.title}</div>
                <div style="font-size: 0.8rem; color: hsl(var(--muted-foreground));">${task.status}</div>
            </div>
            <span style="font-size: 10px; font-weight: 700; background: hsl(var(--muted)); padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">
                ${task.priority}
            </span>
        </div>
    `).join('');
}