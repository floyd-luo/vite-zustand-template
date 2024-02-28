import React, { useEffect } from "react";
import { useLocation, useRoutes, useNavigate } from "react-router-dom";
import MyLayout from "@/layouts";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import StaffManagement from "@/pages/Personnel/StaffManagement";
import Menus from "@/pages/SystemSettings/Menus";
import { userStore } from "@/store/createStore.ts";
const NoMatch = () => <div style={{ color: "#000" }}>No Match</div>;
interface routerItemInterface {
  path: string;
  element: React.ReactNode | null;
  children?: Array<routerItemInterface>;
}
const routers: Array<routerItemInterface> = [
  {
    path: "/",
    element: <MyLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: `/personnel/staffManagement`, element: <StaffManagement /> },
      { path: `/systemSettings/menus`, element: <Menus /> },
      { path: "/404", element: <NoMatch /> },
      { path: "/*", element: <NoMatch /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
const BaseRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const updateSelectedKeys = userStore((state) => state.updateSelectedKeys);
  const updateOpenKeys = userStore((state) => state.updateOpenKeys);
  const pathMenuList = userStore((state) => state.pathMenuList);
  const pathMenuListObj = userStore((state) => state.pathMenuListObj);
  useEffect(() => {
    //判断登录状态，未登录状态则跳转登录页面
    if (location.pathname !== "/login" && !isLoggedIn) {
      navigate("/login");
    }
    let menuIndex = "";
    //todo 判断是否有菜单权限，没有则显示404页面或者显示没有页面访问权限？
    Object.keys(pathMenuListObj).some((key: string) => {
      if (pathMenuListObj[key].includes(location.pathname)) {
        menuIndex = key;
        return true;
      }
    });
    if (isLoggedIn) {
      if (menuIndex) {
        let selectedKeys: any[] = [];
        const openKeys = pathMenuList[Number(menuIndex)].map((item: any) => {
          if (item.path === location.pathname) {
            selectedKeys = [item?.id];
          }
          return item.id;
        });
        updateSelectedKeys(selectedKeys);
        updateOpenKeys(openKeys);
      } else if (location.pathname !== "/login") {
        navigate("/404");
      }
    }
  }, [location.pathname]);
  return useRoutes(routers);
};
export default BaseRouter;
