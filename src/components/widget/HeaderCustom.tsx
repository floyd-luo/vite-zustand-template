import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { localStorage } from "rct-utils";
import { useNavigate } from "react-router-dom";
import { Menu, Layout } from "antd";
import classNames from "classnames";
import { propsType } from "./head";
import style from "./widget.module.scss";
const { Header } = Layout;

const HeaderCustom = (props: propsType) => {
  const user = JSON.parse(localStorage.get("user"));
  const navigate = useNavigate();
  const menuClick = (e: any) => {
    e.key === "logout" && logout();
  };
  const logout = () => {
    localStorage.remove([
      "user",
      "dataPermission",
      "accessToken",
      "refreshToken",
    ]);
    navigate("/login");
  };
  const items: MenuProps["items"] = [
    {
      label: `你好 - ${user?.staffName}`,
      key: "userName",
      children: [
        {
          label: "个人信息",
          key: "userInfo",
        },
        {
          label: "退出登录",
          key: "logout",
        },
      ],
    },
  ];
  return (
    <Header className={classNames("custom-theme", style["header"])}>
      {props.collapsed ? (
        <MenuUnfoldOutlined
          className={style["custom-trigger"]}
          onClick={props.toggle}
        />
      ) : (
        <MenuFoldOutlined
          className={style["custom-trigger"]}
          onClick={props.toggle}
        />
      )}
      <Menu
        mode="horizontal"
        items={items}
        className={style["user-info"]}
        onClick={menuClick}
      />
    </Header>
  );
};

export default HeaderCustom;
