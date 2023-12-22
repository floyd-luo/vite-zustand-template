import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const menuConfigs: MenuProps["items"] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    children: [
      {
        key: "sub1",
        label: <Link to={"/"}>Option sub1</Link>,
        title: "Option sub1",
      },
    ],
    label: "Option 1",
    title: "Option 1",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "人事管理",
    title: "人事管理",
    children: [
      {
        key: "201",
        label: <Link to={"/personnel/staffManagement"}>员工管理</Link>,
        title: "员工管理",
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "系统设置",
    title: "系统设置",
    children: [
      {
        key: "301",
        label: <Link to={"/systemSettings/menus"}>菜单管理</Link>,
        title: "菜单管理",
      },
    ],
  },
];
export default menuConfigs;
