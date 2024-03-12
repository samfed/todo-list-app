import { todoTaskType } from "../../types/todoitem";
import { Space } from "antd";

type ActionButtonsProps = {
  record: todoTaskType;
  taskBeingEdited: todoTaskType | null;
  handleDeleteClick: (record: todoTaskType) => void;
  handleEditClick: (task: todoTaskType) => void;
  handleCancelClick: () => void;
  handleSaveClick: (task: todoTaskType) => void;
};

export const TaskActions = ({
  record,
  taskBeingEdited,
  handleDeleteClick,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
}: ActionButtonsProps) => {
  if (taskBeingEdited?.key === record.key) {
    return (
      <Space size="middle">
        <a
          onClick={() => {
            handleSaveClick(record);
          }}
        >
          Save
        </a>
        <a
          onClick={() => {
            handleCancelClick();
          }}
        >
          Cancel
        </a>
      </Space>
    );
  } else {
    return (
      <Space size="middle">
        <a
          onClick={() => {
            handleEditClick(record);
          }}
        >
          Edit
        </a>
        <a
          onClick={() => {
            handleDeleteClick(record);
          }}
        >
          Delete
        </a>
      </Space>
    );
  }
};
