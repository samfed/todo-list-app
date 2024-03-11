import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { AddNewTodoItem } from "./components/AddNewTodoItem/AddNewTodoItem";
import AppContext from "./context/appcontext";
import { todoItemType } from "./types/todoitem";
import { useEffect, useState } from "react";

function App() {
  const [appData, setAppData] = useState<todoItemType[]>([]);
  const [duplicateTasks, setDuplicateTasks] = useState<todoItemType[]>([]);

  useEffect(() => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify([]));
    } else {
      const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
      setAppData(todoList);
    }
  }, []);

  const handleAddClick = (newItem: todoItemType) => {
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");

    const sameItemsAlreadyExisting = todoList.filter((item: todoItemType) => {
      return item.key === newItem.key;
    });

    if (sameItemsAlreadyExisting.length > 0) {
      setDuplicateTasks([newItem, ...sameItemsAlreadyExisting]);
    } else {
      addItem(newItem);
    }
  };

  const addItem = (item: todoItemType) => {
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    const modifiedData = [item, ...todoList];
    localStorage.setItem("todoList", JSON.stringify(modifiedData));
    setAppData(modifiedData);
  };

  const handleDuplicateItem = <T extends todoItemType | null>(item: T) => {
    if (item !== null) {
      addItem(item);
    }
    setDuplicateTasks([]);
  };

  return (
    <div className="app-container">
      <div className="app-title">TODO LIST</div>
      <AppContext.Provider value={appData}>
        <AddNewTodoItem
          handleAddClick={handleAddClick}
          duplicateTasks={duplicateTasks}
          handleDuplicateItem={handleDuplicateItem}
        />
        <TodoList />
      </AppContext.Provider>
    </div>
  );
}

export default App;
