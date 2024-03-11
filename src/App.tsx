import "./App.css";
import { TaskList } from "./components/TaskList/TaskList";
import { AddNewTask } from "./components/AddNewTask/AddNewTask";
import AppContext from "./context/appcontext";
import { todoTaskType } from "./types/todoitem";
import { useEffect, useState } from "react";

function App() {
  const [appData, setAppData] = useState<todoTaskType[]>([]);
  const [duplicateTasks, setDuplicateTasks] = useState<todoTaskType[]>([]);

  useEffect(() => {
    if (localStorage.getItem("taskList") === null) {
      localStorage.setItem("taskList", JSON.stringify([]));
    } else {
      const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
      setAppData(taskList);
    }
  }, []);

  const handleAddClick = (newTask: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");

    const sameItemsAlreadyExisting = taskList.filter((task: todoTaskType) => {
      return task.key.split("_")[0] === newTask.key;
    });

    if (sameItemsAlreadyExisting.length > 0) {
      setDuplicateTasks([newTask, ...sameItemsAlreadyExisting]);
    } else {
      addTask(newTask);
    }
  };

  const addTask = (task: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    const modifiedData = [task, ...taskList];
    localStorage.setItem("taskList", JSON.stringify(modifiedData));
    setAppData(modifiedData);
  };

  const handleDuplicateTask = <T extends boolean>(task: T) => {
    if (task) {
      const _task = {
        ...duplicateTasks[0],
        key: `${duplicateTasks[0].title}_${duplicateTasks.length}`,
      };
      addTask(_task);
    }
    setDuplicateTasks([]);
  };

  const handleEditTask = (task: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    const newTaskList = taskList.map((t: todoTaskType) => {
      if (t.key === task.key) {
        return {
          ...t,
          title: task.title,
        };
      } else {
        return t;
      }
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setAppData(newTaskList);
  };

  const handleDeleteTask = (task: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    const newTaskList = taskList.filter((t: todoTaskType) => {
      return t.key !== task.key;
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setAppData(newTaskList);
  };

  return (
    <div className="app-container">
      <div className="app-title">TODO LIST</div>
      <AppContext.Provider value={appData}>
        <AddNewTask
          handleAddClick={handleAddClick}
          duplicateTasks={duplicateTasks}
          handleDuplicateTask={handleDuplicateTask}
        />
        <TaskList
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
