import { List } from "@mui/material";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import TodoHero from "./components/TodoHero";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { addTodo, completedTodo, deleteTodo, editTodo, itemLeft } from "./redux/slices/todosSlice";
import { selectFilteredTodos } from "./redux/selectors";
import './App.css';

function App() {
  const { itemsLeft, status } = useAppSelector((state) => state.todos);
  const todos = useAppSelector(selectFilteredTodos);
  const dispatch = useAppDispatch();

  const onAddTodo = (text: string) => {
    dispatch(addTodo(text));
    dispatch(itemLeft({}));
  }
  
  const onCompletedTodo = (id: number, completed: boolean) => {
    dispatch(completedTodo(id));
    dispatch(itemLeft({completed}))
  }
  
  const onDeleteTodo = (name: string) => {
    dispatch(deleteTodo(name));
  }

  const onUpdateTodo = (id: number, task: string) => {
    dispatch(editTodo({id, task}));
  }

  return (
    <div className="App">
      <div className="TodoList">
        <h1 className="Todos">Todos</h1>
        <TodoForm
          saveTodo={(item: string) => {
            const element = item.trim();
            if (element.length > 0) {
              onAddTodo(item)
            }
            return ""
          }}
        />
        {todos && todos.length > 0 ?
          todos.map((el: any, index: any) => (
            <List key={index}>
              <Todo
                el={el}
                completedTodo={(id, completed) => onCompletedTodo(id, completed)}
                deleteTodo={(name) => onDeleteTodo(name)}
                updateTodo={(id, item) => onUpdateTodo(id, item)}
              />
            </List>
        )) : <h3>Кажется тут пусто. Сделай что-нубудь:)</h3>}
        <TodoHero status={status} itemsLeft={itemsLeft} />
      </div>
    </div>
  )
}

export default App;