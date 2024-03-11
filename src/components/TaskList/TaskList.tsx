import { Card, Table, Space, Input, Button } from "antd";
import { useContext, useState } from "react";
import AppContext from "../../context/appcontext";
import { todoTaskType } from "../../types/todoitem";

type TaskListProps = {
  handleEditTask: <T extends todoTaskType>(task: T) => void;
  handleDeleteTask: <T extends todoTaskType>(task: T) => void;
};

export const TaskList = ({
  handleEditTask,
  handleDeleteTask,
}: TaskListProps) => {
  const [editTask, setIsEditTask] = useState<{
    key?: string;
    title?: string;
    description?: string;
  }>({
    key: "",
    title: "",
    description: "",
  });
  const [editValue, setEditValue] = useState("");

  const data = useContext(AppContext);
  const columns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: todoTaskType) => {
        if (editTask.key === record.key) {
          return (
            <div className="edit-task-wrapper">
              <Input
                value={editValue}
                onChange={(e) => {
                  setEditValue(e.target.value);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  const updatedRecord = {
                    ...record,
                    title: editValue,
                  };
                  handleEditTask(updatedRecord);
                  setIsEditTask({});
                }}
              >
                Submit
              </Button>
            </div>
          );
        } else {
          return <span>{title}</span>;
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (record: todoTaskType) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsEditTask(record);
              setEditValue(record.title);
              console.log(record, "edit button clicked");
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              handleDeleteTask(record);
              console.log(record, "delete button clicked");
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Card bordered={true} className="todo-list-container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
    </Card>
  );
};
