const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const itemsLeftEl = document.getElementById("itemsLeft");

// botões de filtro
const filterButtons = document.querySelectorAll(".filter-btn");

// estado do filtro (all | active | completed)
let currentFilter = "all";

let tasks = [];

//LOAD AO ABRIR PAGINA
loadTasks();

// eventos dos botões de filtro
filterButtons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    setFilter(btn.dataset.filter);
    filterButtons.forEach(function(b) {
      b.classList.remove("active");
    });

    btn.classList.add("active");
  });
});

button.addEventListener("click", addTask);

// ENTER adiciona task
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  // Salva como objeto
  tasks.push({ id: Date.now(), text: text, done: false });

  saveTasks();
  renderTasks();
  input.value = "";
}

// retorna tasks com base no filtro atual
function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter(function(t) { return !t.done; });
  if (currentFilter === "completed") return tasks.filter(function(t) { return t.done; });
  return tasks; 
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// calcula e mostra quantas tasks faltam
function updateItemsLeft() {
  const left = tasks.filter(function(task) {
    return !task.done;
  }).length;

  itemsLeftEl.textContent = left + " left";
}

// RENDER
function renderTasks() {
  list.innerHTML = "";

  // usa tasks filtradas
  const filteredTasks = getFilteredTasks();

  filteredTasks.forEach(function(task) {

    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("completed");
    }

    // click: alterna done
    li.addEventListener("click", function() {
      toggleTask(task.id);
    });

    // botão delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.classList.add("delete-btn");

    // Evita o click do li
    delBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateItemsLeft();
}

function toggleTask(id) {

  // procura pelo id
  const t = tasks.find(function(task) {
    return task.id === id;
  });

  if (!t) return;

  t.done = !t.done;

  saveTasks();
  renderTasks();
}

// DELETE
function deleteTask(id) {

  // remove pelo id
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

// SAVE no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD no localStorage
function loadTasks() {

  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    try {
      tasks = JSON.parse(storedTasks);
    } catch {
      tasks = [];
    }
  } else {
    tasks = [];
  }

  // se existirem tasks antigas sem id, cria id nelas
  tasks = tasks.map(function(t) {

    if (t && typeof t === "object" && "id" in t) {
      return t;
    }

    return {
      id: Date.now() + Math.random(),
      text: t.text ?? String(t),
      done: !!t.done
    };

  });

  saveTasks();
  renderTasks();
}