let tasks = [];
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");


// Functions


// Add a new task
function addTask() {
  const inputText = taskInput.value.trim();

  // Validation
  if (inputText === "") {
    showError("Task cannot be empty.");
    return;
  }
  if (inputText.length < 3) {
    showError("Task must be at least 3 characters long.");
    return;
  }

  // Clear error and red border
  clearError();

  const task = {
    id: Date.now(),
    text: inputText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// Toggle task completed status
function toggleTask(id) {
  for (let task of tasks) {
    if (task.id === id) {
      task.completed = !task.completed;
      break;
    }
  }
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Clear all completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const stored = localStorage.getItem("todoList");
  if (stored) {
    tasks = JSON.parse(stored);
  }
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Show error message and highlight input
function showError(message) {
  errorMsg.textContent = message;
  taskInput.classList.add("error-border");
}

// Clear error message and remove border
function clearError() {
  errorMsg.textContent = "";
  taskInput.classList.remove("error-border");
}


// Event Listeners
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("clearCompletedBtn").addEventListener("click", clearCompletedTasks);
taskInput.addEventListener("input", clearError);

// Initialize tasks on page load
window.addEventListener("load", () => {
  loadTasks();
  renderTasks();
});
