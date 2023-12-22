import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStore } from "@/store/createStore";
import { localStorage } from "front-ent-tools";
import MyLayout from "@/layouts";
import Login from "@/pages/Login";
import routers from "@/router";

let flag = false;
const NoMatch = () => <div style={{ color: "#000" }}>No Match</div>;
const App = () => {
  const getAppToken = useStore((state) => state.getAppToken);
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
      <BrowserRouter>
        <Routes>
          <Route element={<MyLayout />}>
            {routers?.map((item) => (
              <Route
                key={item?.id}
                index={item?.id === "0"}
                path={item?.path}
                element={item?.element}
              />
            ))}
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;
