import { useState } from "react";
import { Layout } from "antd";
import MyMenu from "./Menu.tsx";
import styles from "./index.module.scss";
import classNames from "classnames";
const { Sider } = Layout;

const logoIcon =
  "https://filecdn.ailecheng.com/20240716/89f0794e42c33698baa65791c6a63bc1.png";
const logoCloseIcon =
  "https://filecdn.ailecheng.com/20240718/b7a7d0a53cc2557b82d8cd86362740c6.png";
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
        <img
          alt="logo"
          className={classNames({
            [styles["logoCloseIcon"]]: collapsed,
            [styles["logoIcon"]]: !collapsed,
          })}
          src={collapsed ? logoCloseIcon : logoIcon}
        />
      </div>
      <MyMenu />
    </Sider>
  );
};
export default MySider;
