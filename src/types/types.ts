export type Todo = {
    name: string;
    id: number;
    completed: boolean;
}

export type Todos = {
    todos: Todo[];
    itemsLeft: number; 
    status: string
}

export type TodoProps = {
    el: Todo;
    completedTodo: (id: number, completed: boolean) => void;
    deleteTodo: (item: string) => void;
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