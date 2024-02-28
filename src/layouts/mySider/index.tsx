import { useState } from "react";
import { Layout } from "antd";
import MyMenu from "./Menu.tsx";
import styles from "./index.module.scss";
const { Sider } = Layout;

const logoIcon =
  "https://filecdn.ailecheng.com/20211213/34206dd969be0c7d2f6c3d408fc1c4f1.png";
const logoCloseIcon =
  "https://filecdn.ailecheng.com/20210727/cee03fb5850f0c2bd76ed4df09a00ab8.png";
const MySider = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      width={165}
      collapsible={true}
      collapsed={collapsed}
      className={styles["my-sider"]}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
      }}
    >
      <div className={styles.logo}>
        <img alt="logo" src={collapsed ? logoCloseIcon : logoIcon} />
      </div>
      <MyMenu />
    </Sider>
  );
};
export default MySider;
