import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStore } from "@/store/createStore";
import MyLayout from "@/Layouts";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Login from "./pages/Login";

let flag = false;
const NoMatch = () => <div>No Match</div>;
const App = () => {
  const getAppToken = useStore((state) => state.getAppToken);
  useEffect(() => {
    const appToken = localStorage.getItem("appToken");
    const expireDate = localStorage.getItem("appTokenExpireTime");
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
  );
};
export default App;
