import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { AddNewTodoItem } from "./components/AddNewTodoItem/AddNewTodoItem";
import AppContext from "./context/appcontext";
import { todoItemType } from "./types/todoitem";
import { useEffect, useState } from "react";

function App() {
  const [appData, setAppData] = useState<todoItemType[]>([]);
  useEffect(() => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify([]));
    } else {
      const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
      setAppData(todoList);
    }
  }, []);

  const addNewItem = (newItem: todoItemType) => {
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");

    const modifiedData = [...todoList, newItem];

    localStorage.setItem("todoList", JSON.stringify(modifiedData));
    setAppData(modifiedData);
  };

  return (
    <div className="app-container">
      <div className="app-title">TODO LIST</div>
      <AppContext.Provider value={appData}>
        <AddNewTodoItem addNewItem={addNewItem} />
        <TodoList />
      </AppContext.Provider>
    </div>
  );
}

export default App;
