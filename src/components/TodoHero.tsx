import { clearCompleted, setFilter } from "../redux/slices/todosSlice";
import { useAppDispatch } from "../redux/store";
import { TodoHeroProps } from "../types/types";

function TodoHero({ status, itemsLeft }: TodoHeroProps) {
  const dispatch = useAppDispatch();
  
  const listItems = [
    { item: "All" },
    { item: "Active" },
    { item: "Completed" },
  ]

  return (
    <div className="Hero">
      <ul className="MainList">
        <div>{itemsLeft} Items left</div>
        <ul className="ChildList">
          {
            listItems.map((el, index) => (
              <li key={index} style={ status == el.item ? { border: "2px solid dimgray" } : {} }
                onClick={() => dispatch(setFilter(el.item))}  
              >{el.item}</li>
            ))
          }
        </ul>
          <li onClick={() => dispatch(clearCompleted())}>Clear completed</li>
      </ul>
    </div>
  )
}

export default TodoHero;