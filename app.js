let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

const $ = (id) => document.getElementById(id);
const form = $('form-tarea');
const input = $('nueva-tarea');
const lista = $('lista-tareas');
const template = $('tarea-template').content;
const buscador = $('buscador');
const filters = $('filters');
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

$('btn-borrar-completadas').addEventListener('click', () => {
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
    if (e.target.closest('.btn-borrar')) {
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