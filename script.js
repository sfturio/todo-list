const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

//LOAD AO ABRIR PAGINA
loadTasks();

button.addEventListener("click", addTask)

function addTask() {
    const text = input.value;

    if (text === "") return;
    tasks.push(text);
    renderTasks();
    input.value = "";
}

// RENDER
function renderTasks() {

    list.innerHTML = "";
    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", function() {
            deleteTask(index);
        });
        list.appendChild(li);
    });
}

// DELETE
function deleteTask(index) {
    tasks.splice(index, 1);
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
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}