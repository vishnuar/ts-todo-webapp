import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON and serve static frontend files
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.use(express.static(path.join(__dirname, 'public')));

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

let todos: Todo[] = [
    { id: 1, task: "Learn TypeScript Web Basics", completed: false }
];
let nextId = 2;

// API Routes
app.get('/api/todos', (req: Request, res: Response) => {
    res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
    const { task } = req.body;
    if (!task || !task.trim()) {
         res.status(400).json({ error: "Task text is required" });
         return;
    }
    const newTodo: Todo = { id: nextId++, task: task.trim(), completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt((req.params as { id: string }).id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt((req.params as { id: string }).id);
    todos = todos.filter(t => t.id !== id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running smoothly at http://localhost:${PORT}`);
});