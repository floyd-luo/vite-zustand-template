import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import routes from "../router/config";
import { useSwitch } from "../utils/hooks";
import { usePrevious } from "ahooks";

const { Sider, Header } = Layout;

interface SiderCustomProps {
  popoverHide?: () => void;
  collapsed?: boolean;
  smenus?: any;
}

interface IMenu {
  openKeys: string[];
  selectedKey: string;
}

const SiderCustom = (props: SiderCustomProps) => {
  const { location, collapsed: pCollapsed } = props;
  const [collapsed, tCollapsed] = useSwitch();
  const [firstHide, tFirstHide] = useSwitch();
  const [menu, setMenu] = useState<IMenu>({ openKeys: [""], selectedKey: "" });
  const prePathname = usePrevious(props?.location?.pathname);

  useEffect(() => {
    const recombineOpenKeys = (openKeys: string[]) => {
      let i = 0;
      let strPlus = "";
      const tempKeys: string[] = [];
      // 多级菜单循环处理
      while (i < openKeys.length) {
        strPlus += openKeys[i];
        tempKeys.push(strPlus);
        i++;
      }
      return tempKeys;
    };
    const getOpenAndSelectKeys = () => {
      return {
        openKeys: recombineOpenKeys(
          location?.pathname.match(/[/](\w+)/gi) || []
        ),
        selectedKey: location?.pathname,
      };
    };

    if (pCollapsed !== collapsed) {
      setMenu(getOpenAndSelectKeys());
      tCollapsed.setSwitcher(!!pCollapsed);
      tFirstHide.setSwitcher(!!pCollapsed);
    }

    if (prePathname !== location?.pathname) {
      setMenu(getOpenAndSelectKeys());
    }
  }, [
    prePathname,
    location?.pathname,
    collapsed,
    tFirstHide,
    tCollapsed,
    pCollapsed,
  ]);

  const menuClick = (e: any) => {
    setMenu((state) => ({ ...state, selectedKey: e.key }));
    props.popoverHide?.(); // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
  };

  const openMenu: any = (v: string[]) => {
    setMenu((state) => ({ ...state, openKeys: v }));
    tFirstHide.turnOff();
  };
  const menuItemsCustom = (datas) => {
    return datas?.map((i) => {
      const r = { ...i };
      if (!r?.children) {
        const { label, key, icon, disabled } = r;
        return { label, key, icon, disabled };
      } else {
        r.children = menuItemsCustom(r?.children);
      }
      return r;
    });
  };
  return (
    <Header>
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        style={{ overflowY: "auto" }}
        className="sider-custom"
      >
        <div className="logo" />
        <Menu
          items={routes.menus}
          onClick={menuClick}
          mode="inline"
          selectedKeys={[menu.selectedKey]}
          openKeys={firstHide ? [] : menu.openKeys}
          onOpenChange={openMenu}
        />
      </Sider>
    </Header>
  );
};

export default SiderCustom;
