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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: { title: string }) => (
    //     <Space size="middle">
    //       <a>Edit</a>
    //       <a>Done</a>
    //     </Space>
    //   ),
    // },
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
