const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

//LOAD AO ABRIR PAGINA
loadTasks();

button.addEventListener("click", addTask)

// ENTER adiciona task
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const text = input.value.trim();
    if (text === "") return;

 // Salva como objeto
    tasks.push({ text: text, done: false });
    saveTasks();
    renderTasks();
    input.value = "";
}

// RENDER
function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.done) {
            li.classList.add("completed");
        }

        // click: alterna done
        li.addEventListener("click", function() {
            toggleTask(index);
        });

        // botão delete 
        const delBtn = document.createElement("button");
        delBtn.textContent = "x";
        delBtn.classList.add("delete-btn");

        // Evita o click do li
        delBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            deleteTask(index);
        });
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// DELETE
function deleteTask(index) {
    tasks.splice(index, 1);
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
    renderTasks();
}