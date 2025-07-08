import { createSlice } from "@reduxjs/toolkit";
import { Todos } from "../../types/types";

export const initialState: Todos = {
  todos: [],
  itemsLeft: 0,
  status: "All",
}

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ 
        name: action.payload, 
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1, 
        completed: false 
      });
    },
    editTodo: (state, action) => {
      let editTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.task };
        }
        return todo;
      });
      state.todos = editTodo;
    },
    deleteTodo: (state, action) => {
      const newArr = state.todos.filter(el => el.name !== action.payload.name);
      state.todos = newArr;
      !action.payload.completed ? state.itemsLeft = state.itemsLeft - 1 : state.itemsLeft;
    },
    completedTodo: (state, action) => {
      const completedElement = state.todos.map(todo => {
        return todo.id === action.payload ? { ...todo, completed: !todo.completed } : { ...todo };
      });
      state.todos = completedElement;
    },
    itemLeft: (state, action) => {
      action.payload.completed ?
        state.itemsLeft = state.itemsLeft - 1 : !action.payload.completed ?
          state.itemsLeft = state.itemsLeft + 1 : state.itemsLeft = state.itemsLeft - 1 
    },
    setFilter: (state, action) => {
      state.status = action.payload;
    },
    clearCompleted: (state) => {
      state.itemsLeft = state.todos.length;
      state.status = "All";
      state.todos.map(el => {
        return el.completed = false;
      })
    }
  }
})

export const {
  addTodo,
  editTodo,
  deleteTodo,
  completedTodo,
  itemLeft,
  setFilter,
  clearCompleted
} = todosSlice.actions;

export default todosSlice.reducer;