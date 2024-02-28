import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { tokenStore } from "@/store/createStore";
import { localStorage } from "front-ent-tools";
import Router from "@/router";
import AntdWrapApp from "./message";

let flag = false;

const App = () => {
  const getAppToken = tokenStore((state) => state.getAppToken);
  useEffect(() => {
    const appToken = localStorage.get("appToken");
    const expireDate = localStorage.get("appTokenExpireTime");
    if (flag) return;
    if (
      !appToken ||
      !expireDate ||
      isNaN(parseInt(expireDate)) ||
      parseInt(expireDate) < new Date().getTime() - 86400000
    ) {
      flag = true;
      getAppToken();
    }
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF7400",
        },
      }}
    >
      <AntdWrapApp />
      <Router />
    </ConfigProvider>
  );
};
export default App;
