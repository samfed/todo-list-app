import { todoTaskType } from "../../types/todoitem";
import { Tag, Select } from "antd";

type TaskStatusProps = {
  record: todoTaskType;
  taskBeingEdited: todoTaskType | null;
  setTaskBeingEdited: (task: todoTaskType) => void;
};

export const TaskStatus = ({
  record,
  taskBeingEdited,
  setTaskBeingEdited,
}: TaskStatusProps) => {
  if (taskBeingEdited?.key === record.key) {
    return (
      <Select
        defaultValue={taskBeingEdited.status}
        style={{
          width: 120,
        }}
        onChange={(value) => {
          setTaskBeingEdited({
            ...taskBeingEdited,
            status: value,
          });
        }}
        options={[
          {
            value: "complete",
            label: "Completed",
          },
          {
            value: "incomplete",
            label: "Incomplete",
          },
        ]}
      />
    );
  } else {
    return <Tag key={record.status}>{record.status.toUpperCase()}</Tag>;
  }
};
