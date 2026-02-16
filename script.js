const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click", addTask)

function addTask() {
    const text = input.value;

    if (text === "") return;
    tasks.push(text);
    renderTasks();
    input.value = "";
}

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

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}