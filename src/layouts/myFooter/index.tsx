import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const MyFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Copyright © 2015 - {new Date().getFullYear()} By 第壹街舞 All Rights
      Reserved
      <span style={{ padding: "0 10px" }}>|</span> ICP证:
      <a
        href="https://beian.miit.gov.cn/"
        style={{ marginLeft: "5px" }}
        target="_blank"
        rel="noreferrer"
      >
        粤ICP备2021154047号
      </a>
    </Footer>
  );
};
export default MyFooter;
