// 1. Inicialización y Estado de la Aplicación
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // all, pending, completed

// Referencias al DOM (HTML)
const form = document.getElementById('form-tarea');
const input = document.getElementById('nueva-tarea');
const lista = document.getElementById('lista-tareas');
const template = document.getElementById('tarea-template').content;
const buscador = document.getElementById('buscador');

// Referencias de Estadísticas
const statTotal = document.getElementById('stat-total');
const statPending = document.getElementById('stat-pending');
const statCompleted = document.getElementById('stat-completed');

// 2. Event Listeners Principales
document.addEventListener('DOMContentLoaded', renderTasks);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (title !== '') {
        addTask(title);
        input.value = '';
    }
});

buscador.addEventListener('input', renderTasks);

// Acciones Masivas
document.getElementById('btn-marcar-todas').addEventListener('click', () => {
    tasks.forEach(task => task.completed = true);
    saveAndRender();
});

document.getElementById('btn-borrar-completadas').addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
});

// Filtros Laterales
document.getElementById('filter-all').addEventListener('click', () => { currentFilter = 'all'; renderTasks(); });
document.getElementById('filter-pending').addEventListener('click', () => { currentFilter = 'pending'; renderTasks(); });
document.getElementById('filter-completed').addEventListener('click', () => { currentFilter = 'completed'; renderTasks(); });


// 3. Funciones Lógicas

function addTask(title) {
    const newTask = {
        id: Date.now().toString().slice(-4), // Genera un ID corto de 4 números
        title: title,
        completed: false
    };
    tasks.push(newTask);
    saveAndRender();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveAndRender();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// 4. Renderizado y Guardado (Visual y LocalStorage)

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function updateStats() {
    statTotal.textContent = tasks.length;
    statPending.textContent = tasks.filter(t => !t.completed).length;
    statCompleted.textContent = tasks.filter(t => t.completed).length;
}

function renderTasks() {
    lista.innerHTML = ''; // Limpiamos la lista visual
    updateStats(); // Actualizamos los números de la izquierda

    const searchTerm = buscador.value.toLowerCase();

    // Filtramos según la barra de búsqueda y el filtro lateral seleccionado
    let filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm) || task.id.includes(searchTerm);
        let matchesFilter = true;
        
        if (currentFilter === 'pending') matchesFilter = !task.completed;
        if (currentFilter === 'completed') matchesFilter = task.completed;

        return matchesSearch && matchesFilter;
    });

    // Clonamos el template por cada tarea
    filteredTasks.forEach(task => {
        const clone = template.cloneNode(true);
        const li = clone.querySelector('li');
        const checkbox = clone.querySelector('.task-checkbox');
        const titleSpan = clone.querySelector('.task-title');
        const btnBorrar = clone.querySelector('.btn-borrar');

        // Llenar datos
        clone.querySelector('.task-id').textContent = `#${task.id}`;
        titleSpan.textContent = task.title;
        checkbox.checked = task.completed;

        // Estilos si está completada (Como pediste: Opacidad, verde, tachado)
        if (task.completed) {
            li.classList.add('border-green-400', 'bg-green-50');
            titleSpan.classList.add('line-through', 'opacity-60');
            checkbox.classList.add('text-green-500');
        }

        // Eventos de cada tarea individual
        checkbox.addEventListener('change', () => toggleTask(task.id));
        btnBorrar.addEventListener('click', () => deleteTask(task.id));

        lista.appendChild(clone);
    });
}