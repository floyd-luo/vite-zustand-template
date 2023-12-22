import { Layout } from "antd";
import { websiteApprove } from "@/utils";
import style from "@/styls/copyright.module.scss";
import classNames from "classnames";
import React from "react";
const { Footer } = Layout;
interface myFooterInstance {
  copyrightClassNames?: string;
  copyrightNoClassNames?: string;
}
const MyFooter: React.FC<myFooterInstance> = (props: myFooterInstance) => {
  const { copyrightClassNames, copyrightNoClassNames } = props;
  return (
    <Footer
      style={{ textAlign: "center" }}
      className={classNames({
        [style["copyright"]]: true,
        [copyrightClassNames ?? ""]: copyrightClassNames,
      })}
    >
      © 2015 - {new Date().getFullYear()}
      <span style={{ padding: "0 5px" }}>
        {websiteApprove?.companyMain} 版权所有
      </span>
      <span style={{ padding: "0 5px" }}>|</span> ICP证:
      <a
        href="https://beian.miit.gov.cn/"
        className={classNames({
          [style["copyright-no"]]: true,
          [copyrightNoClassNames ?? ""]: copyrightNoClassNames,
        })}
        target="_blank"
        rel="noreferrer"
      >
        {websiteApprove?.number}
      </a>
    </Footer>
  );
};
export default MyFooter;
