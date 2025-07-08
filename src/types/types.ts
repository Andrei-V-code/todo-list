export type TodoItem = {
    name: string;
    id: number;
    completed: boolean;
}

export type Todos = {
    todos: TodoItem[];
    itemsLeft: number; 
    status: string
}

export type TodoProps = {
    el: TodoItem;
    completedTodo: (id: number, completed: boolean) => void;
    deleteTodo: (item: TodoItem) => void;
    updateTodo: (id: number, updateTask: string) => void;
}

export type TodoHeroProps = {
    status: string;
    itemsLeft: number;
}

export type SaveTodoProps = {
    saveTodo: (value: string) => void;
}

export type TokenList = {
    classList: string[];
}