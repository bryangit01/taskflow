
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

// Recuperar tareas guardadas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guardar tareas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mostrar tareas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.name;

        // Completar tarea
        span.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Eliminar tarea
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    const pending = tasks.filter((task) => !task.completed).length;

    taskCounter.textContent = `Tareas pendientes: ${pending}`;
}

// Agregar tarea
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Escribe una tarea primero.");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Evento del botón
addButton.addEventListener("click", addTask);

// Permitir agregar con Enter
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Mostrar tareas al iniciar
renderTasks();
