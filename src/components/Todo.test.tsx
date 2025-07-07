import '@testing-library/jest-dom/jest-globals';
import { 
    addTodo, 
    clearCompleted, 
    completedTodo, 
    deleteTodo, 
    editTodo, 
    setFilter, 
    itemLeft } from "../redux/slices/todosSlice";
import todoSlice, { initialState } from "../redux/slices/todosSlice";
import store from '../redux/store';

describe("tests for TodoSlice", () => {

    test("initial state", () => {
        const todoSliceInit = todoSlice(initialState, { type: "unknown" });
        expect(todoSliceInit).toBe(initialState);
    });

    test("add todo", () => {
        expect(store.dispatch(addTodo('Run the tests')));
        expect(store.getState().todos.todos).toHaveLength(1);
        expect(store.dispatch(addTodo('Next item')));
        expect(store.getState().todos.todos).toHaveLength(2);
    });
    
    test("completed todo", () => {
        expect(store.getState().todos.todos.map(el => {
            el.id === 0 ? store.dispatch(completedTodo(el.id)) : el
        }));
        expect(store.getState().todos.todos.find(el =>  el.completed))
    });
    
    test("edit todo", () => {
        expect(store.dispatch(editTodo({id: 1, task: "Edit item"})));
        expect(store.getState().todos.todos.find(el => el.name === "Edit item"));
    });

    test("item left", () => {
        expect(store.dispatch(itemLeft(true)));
        expect(store.getState().todos.itemsLeft === 1);
        expect(store.getState().todos.todos.map(el => {
            el.id === 1 ? store.dispatch(completedTodo(el.id)) : el
        }));
        expect(store.dispatch(itemLeft(true)));
        expect(store.getState().todos.itemsLeft === 0);
    });
    
    test("update status", () => {
        expect(store.getState().todos.status === "All");
        expect(store.dispatch(setFilter("Active")));
        expect(store.getState().todos.status === "Active");
    });
    
    test("clear completed", () => {
        expect(store.dispatch(clearCompleted()));
        expect(store.getState().todos.todos).toEqual([{"completed": false, "id": 0, "name": "Run the tests"}, 
            {"completed": false, "id": 1, "name": "Edit item"}]);
    })
    
    test("delete todo", () => {
        expect(store.dispatch(deleteTodo("Run the tests")));
        expect(store.getState().todos.todos).toHaveLength(1);
        expect(store.dispatch(deleteTodo("Edit item" )));
        expect(store.getState().todos.todos).toHaveLength(0);
    });
})
