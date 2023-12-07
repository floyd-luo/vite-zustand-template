import React from "react";
import { Layout } from "antd";
import { websiteApprove } from "@/utils";
import style from "@/styls/copyright.module.scss";
const { Footer } = Layout;
const MyFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }} className={style["copyright"]}>
      © 2015 - {new Date().getFullYear()}
      <span style={{ padding: "0 5px" }}>
        {websiteApprove?.companyMain} 版权所有
      </span>
      <span style={{ padding: "0 5px" }}>|</span> ICP证:
      <a
        href="https://beian.miit.gov.cn/"
        className={style["copyright-no"]}
        target="_blank"
        rel="noreferrer"
      >
        {websiteApprove?.number}
      </a>
    </Footer>
  );
};
export default MyFooter;
