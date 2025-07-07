import { createSelector } from 'reselect';
import { RootState } from "./store";

const getVisibilityFilter = (state: RootState) =>
  state.todos.status;
const getTodos = (state: RootState) => state.todos.todos;

export const selectFilteredTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'All':
        return todos;
      case 'Completed':
        return todos.filter((t) => t.completed);
      case 'Active':
        return todos.filter((t) => !t.completed);
    }
  }
);
