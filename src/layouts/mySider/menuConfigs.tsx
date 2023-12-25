import { ReactNode } from "react";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
interface menusInterface {
  id: string;
  parentId: string;
  label: string | ReactNode;
  title: string;
  icon?: string;
  isDisplayed: boolean;
  path: string;
  children?: Array<menusInterface>;
}
const menus: Array<menusInterface> = [
  {
    id: "1",
    parentId: "-1",
    icon: "PieChartOutlined",
    path: "",
    isDisplayed: true,
    children: [
      {
        path: "/",
        id: "sub1",
        parentId: "1",
        isDisplayed: true,
        label: "Option sub1",
        title: "Option sub1",
      },
    ],
    label: "Option 1",
    title: "Option 1",
  },
  {
    id: "2",
    icon: "UserOutlined",
    parentId: "-1",
    label: "人事管理",
    title: "人事管理",
    path: "",
    isDisplayed: true,
    children: [
      {
        id: "201",
        isDisplayed: true,
        parentId: "2",
        path: "/personnel/staffManagement",
        label: "员工管理",
        title: "员工管理",
      },
    ],
  },
  {
    id: "3",
    icon: "SettingOutlined",
    parentId: "-1",
    label: "系统设置",
    title: "系统设置",
    path: "",
    isDisplayed: true,
    children: [
      {
        id: "301",
        parentId: "3",
        isDisplayed: true,
        path: "/systemSettings/menus",
        label: "菜单管理",
        title: "菜单管理",
      },
    ],
  },
];
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
