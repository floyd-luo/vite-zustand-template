import React from "react";
import { TableUtils } from "front-ent-tools";
import { Table, Space, Divider, Switch } from "antd";
import { userStore } from "@/store/createStore.ts";
import columns, { DataType } from "./columns.ts";
const { getColumns } = TableUtils;

const Menus: React.FC = () => {
  const menuList = userStore((state) => state.menuList);
  const handleAdd = (rowData: DataType) => {
    console.log(rowData);
  };
  const handleEdit = (rowData: DataType) => {
    console.log(rowData);
  };
  const handleDel = (rowData: DataType) => {
    console.log(rowData);
  };
  const extraColumns: any[] = [
    {
      dataIndex: "isDisplayed",
      width: "200px",
      render: (v: boolean) => (
        <>
          <Switch checked={v} />
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "250px",
      fixed: "right",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleAdd(record)}>新建</a>
          <Divider type="vertical" />
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleDel(record)}>删除</a>
        </Space>
      ),
    },
  ];
  const _columns: Array<any> = getColumns(columns)
    .extend(extraColumns)
    .values();
  return <Table columns={_columns} rowKey={"id"} dataSource={menuList} />;
};
export default Menus;
