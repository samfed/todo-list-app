import { Card, Input, Button, Modal } from "antd";
import { useState } from "react";
import { todoTaskType } from "../../types/todoitem";

type componentProp = {
  handleAddClick: (newTask: todoTaskType) => void;
  duplicateTasks: todoTaskType[];
  handleDuplicateTask: (task: boolean) => void;
};

export const AddNewTask = ({
  handleAddClick,
  duplicateTasks,
  handleDuplicateTask,
}: componentProp) => {
  const [textInput, setTextInput] = useState("");
  return (
    <Card className="add-new-todo-container" bordered={true}>
      <Input
        placeholder="What would you like to do"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
      />
      {duplicateTasks.length > 1 ? (
        <Modal
          title="Task Already Exists"
          open={true}
          onOk={() => {
            handleDuplicateTask(true);
          }}
          onCancel={() => {
            handleDuplicateTask(false);
          }}
        >
          {duplicateTasks.length - 1 > 1 ? (
            <p>{`${duplicateTasks.length - 1} similar tasks already exist.`}</p>
          ) : (
            <p>{`${duplicateTasks.length - 1} similar task already exists.`}</p>
          )}
          <p>Do you still want to add it ?</p>
        </Modal>
      ) : (
        <Button
          danger
          className="add-new-task-button"
          type="primary"
          onClick={() => {
            if (textInput.length > 0) {
              handleAddClick({
                key: textInput.toLowerCase(),
                title: textInput,
                description: "",
                status: "incomplete",
              });
              setTextInput("");
            }
          }}
        >
          Add
        </Button>
      )}
    </Card>
  );
};
