const API_BASE = "http://127.0.0.1:8000";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      username: document.getElementById("regUsername").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPassword").value,
      role: document.getElementById("regRole").value,
    };

    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.detail || "Registration failed");
      return;
    }

    alert("Registration successful. Please login.");
    registerForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value,
    };

    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.detail || "Login failed");
      return;
    }

    localStorage.setItem("token", data.access_token);
    window.location.href = "dashboard.html";
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "index.html";
      return;
    }

    const payload = {
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      status: document.getElementById("taskStatus").value,
    };

    const response = await fetch(`${API_BASE}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.detail || "Failed to create task");
      return;
    }

    taskForm.reset();
    loadTasks();
  });
}

async function loadTasks() {
  if (!tasksContainer) return;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const response = await fetch(`${API_BASE}/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.detail || "Could not load tasks");
    return;
  }

  tasksContainer.innerHTML = "";
  data.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.description || "No description"}</p>
      <p>Status: ${task.status}</p>
      <div class="actions">
        <button onclick="updateTask(${task.id})">Mark Completed</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    tasksContainer.appendChild(taskDiv);
  });
}

async function updateTask(taskId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "completed" }),
  });

  if (!response.ok) {
    const data = await response.json();
    alert(data.detail || "Failed to update task");
    return;
  }

  loadTasks();
}

async function deleteTask(taskId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    alert(data.detail || "Failed to delete task");
    return;
  }

  loadTasks();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

if (tasksContainer) {
  loadTasks();
}
