document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo);
    });

    // Add new todo
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = input.value.trim();
        if (task) {
            const todo = { task, completed: false };
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            addTodoToDOM(todo);
            input.value = '';
        }
    });

    // Handle click events on todo list
    todoList.addEventListener('click', (event) => {
        const element = event.target;
        if (element.tagName === 'LI') {
            const index = Array.from(todoList.children).indexOf(element);
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            element.classList.toggle('completed');
        }
        if (element.tagName === 'BUTTON') {
            const index = Array.from(todoList.children).indexOf(element.parentElement);
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            element.parentElement.remove();
        }
    });

    // Function to add todo item to the DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        li.innerHTML = `
            ${todo.task}
            <button>Delete</button>
        `;
        todoList.appendChild(li);
    }
});
