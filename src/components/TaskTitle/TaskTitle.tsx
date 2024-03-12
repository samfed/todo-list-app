import { todoTaskType } from "../../types/todoitem";
import { Input } from "antd";

type TaskTitleProps = {
  record: todoTaskType;
  taskBeingEdited: todoTaskType | null;
  setTaskBeingEdited: (task: todoTaskType) => void;
};

export const TaskTitle = ({
  record,
  taskBeingEdited,
  setTaskBeingEdited,
}: TaskTitleProps) => {
  if (taskBeingEdited?.key === record.key) {
    return (
      <div className="edit-task-wrapper">
        <Input
          value={taskBeingEdited.title}
          onChange={(e) => {
            setTaskBeingEdited({
              ...taskBeingEdited,
              title: e.target.value,
            });
          }}
        />
      </div>
    );
  } else {
    return <span>{record.title}</span>;
  }
};
