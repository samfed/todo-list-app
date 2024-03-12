import "./App.css";
import { TaskList } from "./components/TaskList/TaskList";
import { AddNewTask } from "./components/AddNewTask/AddNewTask";
import { todoTaskType } from "./types/todoitem";
import { useEffect, useState } from "react";

function App() {
  const [appData, setAppData] = useState<todoTaskType[]>([]);
  const [duplicateTasks, setDuplicateTasks] = useState<todoTaskType[]>([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState<todoTaskType | null>(
    null
  );

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

  const handleDeleteClick = (task: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    const newTaskList = taskList.filter((t: todoTaskType) => {
      return t.key !== task.key;
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setAppData(newTaskList);
  };

  const handleEditClick = (record: todoTaskType) => {
    setTaskBeingEdited(record);
  };

  const editTask = (task: todoTaskType) => {
    const taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    const newTaskList = taskList.map((t: todoTaskType) => {
      return t.key === task.key ? task : t;
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setAppData(newTaskList);
  };

  const handleCancelClick = () => {
    setTaskBeingEdited(null);
  };

  const handleSaveClick = (task: todoTaskType) => {
    const title = taskBeingEdited ? taskBeingEdited.title : "";
    const status = taskBeingEdited ? taskBeingEdited.status : "";
    const updatedRecord = {
      ...task,
      title,
      status,
    };
    editTask(updatedRecord);
    setTaskBeingEdited(null);
  };

  const handleDuplicateTask = (task: boolean) => {
    if (task) {
      const _task = {
        ...duplicateTasks[0],
        key: `${duplicateTasks[0].title}_${duplicateTasks.length}`,
      };
      addTask(_task);
    }
    setDuplicateTasks([]);
  };

  return (
    <div className="app-container">
      <div className="app-title">TODO LIST</div>
      <AddNewTask
        handleAddClick={handleAddClick}
        duplicateTasks={duplicateTasks}
        handleDuplicateTask={handleDuplicateTask}
      />
      <TaskList
        appData={appData}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleCancelClick={handleCancelClick}
        handleSaveClick={handleSaveClick}
        taskBeingEdited={taskBeingEdited}
        setTaskBeingEdited={setTaskBeingEdited}
      />
    </div>
  );
}

export default App;
