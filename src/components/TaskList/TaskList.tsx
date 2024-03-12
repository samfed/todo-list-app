import { Card, Table, Input } from "antd";
import { useState } from "react";
import { todoTaskType } from "../../types/todoitem";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskActions } from "../TaskActions/TaskActions";
import { TaskTitle } from "../TaskTitle/TaskTitle";

type TaskListProps = {
  handleDeleteClick: (task: todoTaskType) => void;
  appData: todoTaskType[];
  handleEditClick: (task: todoTaskType) => void;
  taskBeingEdited: todoTaskType | null;
  handleCancelClick: () => void;
  handleSaveClick: (task: todoTaskType) => void;
  setTaskBeingEdited: (task: todoTaskType) => void;
};

export const TaskList = ({
  handleDeleteClick,
  appData,
  handleEditClick,
  taskBeingEdited,
  handleCancelClick,
  handleSaveClick,
  setTaskBeingEdited,
}: TaskListProps) => {
  const columns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: todoTaskType) => {
        return (
          <TaskTitle
            record={record}
            taskBeingEdited={taskBeingEdited}
            setTaskBeingEdited={setTaskBeingEdited}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: todoTaskType) => {
        return (
          <TaskStatus
            record={record}
            taskBeingEdited={taskBeingEdited}
            setTaskBeingEdited={setTaskBeingEdited}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: todoTaskType) => {
        return (
          <TaskActions
            record={record}
            taskBeingEdited={taskBeingEdited}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
          />
        );
      },
    },
  ];

  return (
    <Card bordered={true} className="todo-list-container">
      <Table
        columns={columns}
        dataSource={appData}
        pagination={{ position: ["bottomCenter"] }}
      />
    </Card>
  );
};
