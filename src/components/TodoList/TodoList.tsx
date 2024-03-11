import { Card, Table, Space } from "antd";
import { useContext } from "react";
import AppContext from "../../context/appcontext";

export const TodoList = () => {
  const data = useContext(AppContext);
  const columns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (record: { title: string }) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log(record, "edit button clicked");
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
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
