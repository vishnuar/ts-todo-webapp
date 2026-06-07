interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;

// Fetch and display todos from backend API
async function fetchTodos(): Promise<void> {
    const res = await fetch('/api/todos');
    const todos: Todo[] = await res.json();
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = todo.task;
        if (todo.completed) span.classList.add('completed');
        span.style.cursor = 'pointer';
        span.onclick = () => toggleTodo(todo.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add a brand new todo item
async function addTodo(): Promise<void> {
    const text = todoInput.value.trim();
    if (!text) return;

    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: text })
    });

    todoInput.value = '';
    fetchTodos();
}

// Toggle status
async function toggleTodo(id: number): Promise<void> {
    await fetch(`/api/todos/${id}`, { method: 'PUT' });
    fetchTodos();
}

// Remove item completely
async function deleteTodo(id: number): Promise<void> {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
}

// Wire up events
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial Render load
fetchTodos();