import { Card, Input, Button } from "antd";
import { useState } from "react";
import { todoItemType } from "../../types/todoitem";

type componentProp = {
  addNewItem: (newItem: todoItemType) => void;
};

export const AddNewTodoItem = ({ addNewItem }: componentProp) => {
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
      <Button
        danger
        className="add-new-item-button"
        type="primary"
        onClick={() => {
          if (textInput.length > 0) {
            addNewItem({
              key: textInput,
              title: textInput,
              description: "",
            });
            setTextInput("");
          }
        }}
      >
        Add
      </Button>
    </Card>
  );
};
