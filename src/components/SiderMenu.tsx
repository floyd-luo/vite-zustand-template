import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { IFMenu } from "../router/config";
import { MenuProps } from "antd/lib/menu";

const renderMenuItem = (
  item: IFMenu // item.route 菜单单独跳转的路由
) => (
  <Menu.Item key={item.key}>
    <Link to={(item.route || item.key) + (item.query || "")}>
      <span className="nav-text">{item.label}</span>
    </Link>
  </Menu.Item>
);

const renderSubMenu = (item: IFMenu) => {
  return (
    <Menu.SubMenu
      key={item.key}
      title={
        <span>
          {/* {item.icon && <Icon type={item.icon} />} */}
          <span className="nav-text">{item.label}</span>
        </span>
      }
    >
      {item.children!.map((sub) =>
        sub.children ? renderSubMenu(sub) : renderMenuItem(sub)
      )}
    </Menu.SubMenu>
  );
};

type SiderMenuProps = MenuProps & {
  menus: any;
  onClick: (e: any) => void;
  selectedKeys: string[];
  openKeys?: string[];
  onOpenChange: (v: string[]) => void;
};

const SiderMenu = ({ menus, ...props }: SiderMenuProps) => {
  const [dragItems, setDragItems] = useState<any>([]);

  useEffect(() => {
    setDragItems(menus);
  }, [menus]);
  return dragItems.map((item: IFMenu) => (
    <Menu {...props} key={item.key}>
      {item.children! ? renderSubMenu(item) : renderMenuItem(item)}
    </Menu>
  ));
};

export default React.memo(SiderMenu);
