import React, { useEffect } from "react";
import { localStorage } from "rct-utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routerConfig from "../router/config";
import AllComponents from "./index";

const RouterUI = (props) => {
  const local = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.get("accessToken");
  let routers = [];
  routerConfig["menus"]?.forEach((item) => {
    if (item?.children) {
      routers = [...routers, ...item.children];
    }
  });
  useEffect(() => {
    if (local.pathname === "/") {
      navigate(accessToken ? "/app/system/home" : "/login");
    }
  }, [local]);
  const renderRouter = (items) =>
    items.map((router) => {
      const { path, key, exact, component } = router;
      const Component = component && AllComponents[component];
      return (
        <Route key={key} path={path} exact={!!exact} element={<Component />} />
      );
    });
  const NoMatch = () => <div>No Match</div>;
  return (
    <Routes>
      {renderRouter(routers)}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
export default RouterUI;
