import React from "react";
import { LogoutOutlined, MailOutlined, FormOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import style from "./index.module.scss";
const { Header } = Layout;

const maleProfile =
  "https://filecdn.ailecheng.com/20230922/8af6e855557d3cbff6611af19b86c71e.jpg";
const femaleProfile =
  "https://filecdn.ailecheng.com/20230905/c1b4929a3175caf22c078cd192ed0afa.jpg";
const MyHeader = (props) => {
  const { user = { staffName: "罗方国", gender: 1 } } = props;
  const handleClickMenu = () => {
    console.log("退出登录");
  };
  const handleUpdatePassword = () => {
    console.log("修改密码");
  };
  const items = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          {
            <img
              alt={`${user?.staffName}`}
              src={user?.gender === 1 ? maleProfile : femaleProfile}
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          }
          {user && user?.staffName}
        </span>
      ),
      children: [
        {
          key: "2",
          label: <span onClick={handleClickMenu}>退出登录</span>,
          icon: <LogoutOutlined />,
        },
        {
          key: "3",
          label: <span onClick={handleUpdatePassword}>修改密码</span>,
          icon: <FormOutlined />,
        },
      ],
    },
  ];
  return (
    <Header className={style["header"]}>
      <Menu mode="horizontal" items={items} />
    </Header>
  );
};
export default MyHeader;
