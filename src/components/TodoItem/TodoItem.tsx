import { List } from "antd";

type TodoItemProps = {
  title: string;
  description: string;
};

export const TodoItem = ({ title, description }: TodoItemProps) => {
  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">edit</a>,
        <a key="list-loadmore-more">more</a>,
      ]}
    >
      <List.Item.Meta title={title} description={description} />
    </List.Item>
  );
};
