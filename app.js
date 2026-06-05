// Todo App with Recurring Tasks

class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = "all";
    this.init();
  }

  init() {
    this.loadTodos();
    this.setupEventListeners();
    this.checkRecurringTasks();
    this.render();
  }

  setupEventListeners() {
    document.getElementById("addBtn").addEventListener("click", () => this.addTodo());
    document.getElementById("todoInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });

    document.getElementById("darkModeToggle").addEventListener("click", () => this.toggleDarkMode());

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.setFilter(e.target.dataset.filter));
    });
  }

  addTodo() {
    const input = document.getElementById("todoInput");
    const recurring = document.getElementById("recurringSelect").value;
    const text = input.value.trim();

    if (!text) {
      alert("Please enter a task!");
      return;
    }

    const todo = {
      id: Date.now(),
      text,
      completed: false,
      recurring,
      createdAt: new Date().toISOString(),
      lastCompleted: null,
    };

    this.todos.push(todo);
    input.value = "";
    document.getElementById("recurringSelect").value = "none";
    this.saveTodos();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.lastCompleted = new Date().toISOString();
      this.saveTodos();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
    this.render();
  }

  editTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      const newText = prompt("Edit task:", todo.text);
      if (newText && newText.trim()) {
        todo.text = newText.trim();
        this.saveTodos();
        this.render();
      }
    }
  }

  checkRecurringTasks() {
    const now = new Date();
    this.todos.forEach((todo) => {
      if (todo.recurring === "none" || !todo.completed) return;

      const lastCompleted = new Date(todo.lastCompleted);
      const daysPassed = Math.floor((now - lastCompleted) / (1000 * 60 * 60 * 24));

      let shouldReset = false;
      if (todo.recurring === "daily" && daysPassed >= 1) shouldReset = true;
      if (todo.recurring === "weekly" && daysPassed >= 7) shouldReset = true;
      if (todo.recurring === "monthly" && daysPassed >= 30) shouldReset = true;

      if (shouldReset) {
        todo.completed = false;
      }
    });
    this.saveTodos();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    this.render();
  }

  getFilteredTodos() {
    return this.todos.filter((todo) => {
      if (this.currentFilter === "active") return !todo.completed;
      if (this.currentFilter === "completed") return todo.completed;
      if (this.currentFilter === "recurring") return todo.recurring !== "none";
      return true;
    });
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const recurring = this.todos.filter((t) => t.recurring !== "none").length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("completedCount").textContent = completed;
    document.getElementById("recurringCount").textContent = recurring;
  }

  render() {
    this.checkRecurringTasks();
    const filteredTodos = this.getFilteredTodos();
    const todoList = document.getElementById("todoList");
    const emptyState = document.getElementById("emptyState");

    todoList.innerHTML = "";

    if (filteredTodos.length === 0) {
      emptyState.classList.remove("hidden");
      todoList.classList.add("hidden");
    } else {
      emptyState.classList.add("hidden");
      todoList.classList.remove("hidden");
      filteredTodos.forEach((todo) => {
        const todoEl = document.createElement("div");
        todoEl.className = `todo-item ${todo.completed ? "completed" : ""}`;
        todoEl.innerHTML = `
          <input 
            type="checkbox" 
            ${todo.completed ? "checked" : ""}
            onchange="app.toggleTodo(${todo.id})"
            class="mt-1 flex-shrink-0"
          />
          <div class="flex-grow">
            <p class="todo-text text-gray-900 dark:text-white font-medium break-words">${this.escapeHtml(todo.text)}</p>
            ${todo.recurring !== "none" ? `<span class="recurring-badge ${todo.recurring}">${todo.recurring}</span>` : ""}
          </div>
          <div class="flex gap-2 flex-shrink-0 ml-2">
            <button 
              onclick="app.editTodo(${todo.id})"
              class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
              title="Edit task"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              onclick="app.deleteTodo(${todo.id})"
              class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Delete task"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        `;
        todoList.appendChild(todoEl);
      });
    }

    this.updateStats();
  }

  toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      html.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  }

  loadDarkMode() {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadTodos() {
    const saved = localStorage.getItem("todos");
    this.todos = saved ? JSON.parse(saved) : [];
    this.loadDarkMode();
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize app
const app = new TodoApp();
