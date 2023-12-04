import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
const { Sider } = Layout;

const logoIcon =
  "https://filecdn.ailecheng.com/20211213/34206dd969be0c7d2f6c3d408fc1c4f1.png";
const logoCloseIcon =
  "https://filecdn.ailecheng.com/20210727/cee03fb5850f0c2bd76ed4df09a00ab8.png";
const MySider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      children: [
        {
          key: "sub1",
          label: "Option sub1",
          title: "Option sub1",
        },
      ],
      label: "Option 1",
      title: "Option 1",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      children: [],
      label: "Option 2",
      title: "Option 2",
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      children: [],
      label: "Option 3",
      title: "Option 3",
    },
  ];
  return (
    <Sider
      collapsible={true}
      className={styles["my-sider"]}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
      }}
    >
      <div className={styles.logo}>
        <img alt="logo" src={collapsed ? logoCloseIcon : logoIcon} />
      </div>
      <Menu
        defaultSelectedKeys={["sub1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </Sider>
  );
};
export default MySider;
