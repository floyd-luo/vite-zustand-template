import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStore } from "@/store/createStore";
import { localStorage } from "front-ent-tools";
import MyLayout from "@/layouts";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Login from "./pages/Login";

let flag = false;
const NoMatch = () => <div>No Match</div>;
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
            <Route index element={<Home />} />
            <Route path="Page1" element={<Page1 />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;
