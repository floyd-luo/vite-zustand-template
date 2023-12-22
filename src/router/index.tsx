import React from "react";
import Home from "@/pages/Home";
import StaffManagement from "@/pages/Personnel/StaffManagement";
import Menus from "@/pages/SystemSettings/Menus";

interface routerItemInterface {
  id?: string;
  path: string;
  element: React.ReactNode | null;
}
const routers: Array<routerItemInterface> = [
  { id: "0", path: "/", element: <Home /> },
  { id: "1", path: `/personnel/staffManagement`, element: <StaffManagement /> },
  { id: "2", path: `/systemSettings/menus`, element: <Menus /> },
];
export default routers;
