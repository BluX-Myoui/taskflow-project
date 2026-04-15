let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';
let lastDeleted = null;

const $ = (id) => document.getElementById(id);
const form = $('form-tarea');
const input = $('nueva-tarea');
const lista = $('lista-tareas');
const template = $('tarea-template').content;
const buscador = $('buscador');
const filters = $('filters');
const btnUndo = $('btn-deshacer');
const stats = {
    all: $('stat-total'),
    pending: $('stat-pending'),
    completed: $('stat-completed')
};

const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const uid = () => `${Date.now()}`.slice(-4);

const passFilter = (task) => (
    currentFilter === 'all' ||
    (currentFilter === 'pending' && !task.completed) ||
    (currentFilter === 'completed' && task.completed)
);

function render() {
    const q = buscador.value.trim().toLowerCase();
    const done = tasks.filter((t) => t.completed).length;
    stats.all.textContent = tasks.length;
    stats.pending.textContent = tasks.length - done;
    stats.completed.textContent = done;
    filters.querySelectorAll('.stat-card').forEach((card) => {
        card.classList.toggle('active', card.dataset.filter === currentFilter);
    });
    btnUndo.disabled = !lastDeleted;

    lista.innerHTML = '';
    tasks
        .filter((t) => (t.title.toLowerCase().includes(q) || t.id.includes(q)) && passFilter(t))
        .forEach((task) => {
            const clone = template.cloneNode(true);
            const li = clone.querySelector('.task-item');
            li.dataset.id = task.id;
            li.classList.toggle('completed', task.completed);
            clone.querySelector('.task-id').textContent = `#${task.id}`;
            clone.querySelector('.task-title').textContent = task.title;
            clone.querySelector('.task-checkbox').checked = task.completed;
            lista.appendChild(clone);
        });
}

function commit(nextTasks) {
    tasks = nextTasks;
    save();
    render();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;
    input.value = '';
    commit([...tasks, { id: uid(), title, completed: false }]);
});

buscador.addEventListener('input', render);

$('btn-marcar-todas').addEventListener('click', () => {
    if (!tasks.length) return;
    commit(tasks.map((task) => ({ ...task, completed: true })));
});

$('btn-ordenar-az').addEventListener('click', () => {
    commit([...tasks].sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })));
});

$('btn-deshacer').addEventListener('click', () => {
    if (!lastDeleted) return;
    const next = [...tasks];
    next.splice(Math.min(lastDeleted.index, next.length), 0, lastDeleted.task);
    lastDeleted = null;
    commit(next);
});

$('btn-borrar-completadas').addEventListener('click', () => {
    const completedCount = tasks.filter((task) => task.completed).length;
    if (!completedCount) return;
    if (!window.confirm(`Se borraran ${completedCount} tareas completadas. Continuar?`)) return;
    lastDeleted = null;
    commit(tasks.filter((task) => !task.completed));
});

filters.addEventListener('click', (e) => {
    const card = e.target.closest('.stat-card');
    if (!card) return;
    currentFilter = card.dataset.filter || 'all';
    render();
});

lista.addEventListener('click', (e) => {
    const item = e.target.closest('.task-item');
    if (!item) return;
    const { id } = item.dataset;
    if (e.target.closest('.btn-editar')) {
        const current = tasks.find((task) => task.id === id);
        if (!current) return;
        const edited = window.prompt('Editar tarea:', current.title);
        const title = edited?.trim();
        if (!title || title === current.title) return;
        commit(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
        return;
    }
    if (e.target.closest('.btn-borrar')) {
        const index = tasks.findIndex((task) => task.id === id);
        if (index < 0) return;
        lastDeleted = { task: tasks[index], index };
        commit(tasks.filter((task) => task.id !== id));
    }
});

lista.addEventListener('change', (e) => {
    if (!e.target.classList.contains('task-checkbox')) return;
    const item = e.target.closest('.task-item');
    if (!item) return;
    const { id } = item.dataset;
    commit(tasks.map((task) => (
        task.id === id ? { ...task, completed: e.target.checked } : task
    )));
});

document.addEventListener('DOMContentLoaded', render);