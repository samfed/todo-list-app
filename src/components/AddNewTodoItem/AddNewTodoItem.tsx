import { Card, Input, Button, Modal } from "antd";
import { useState } from "react";
import { todoItemType } from "../../types/todoitem";

type componentProp = {
  handleAddClick: (newItem: todoItemType) => void;
  duplicateTasks: todoItemType[];
  handleDuplicateItem: <T extends todoItemType | null>(item: T) => void;
};

export const AddNewTodoItem = ({
  handleAddClick,
  duplicateTasks,
  handleDuplicateItem,
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
            handleDuplicateItem(duplicateTasks[0]);
          }}
          onCancel={() => {
            handleDuplicateItem(null);
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
          className="add-new-item-button"
          type="primary"
          onClick={() => {
            if (textInput.length > 0) {
              handleAddClick({
                key: textInput.toLowerCase(),
                title: textInput,
                description: "",
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
