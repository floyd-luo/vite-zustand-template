import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import resource from "@/resource";
import { useStore } from "@/store/createStore";
import VerifyModal from "./components/verifyModal";
import { websiteApprove } from "@/utils";
import style from "@/styls/copyright.module.scss";
import styles from "./index.module.scss";
const FormItem = Form.Item;
export interface dataValProps {
  username?: string;
  password?: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const getValidCode = useStore((state) => state.getValidCode);
  const [dataVal, setDataVal] = useState<dataValProps>({});
  const [verifyFlag, setVerifyFlag] = useState<boolean>(false);
  useEffect(() => {
    //监听键盘事件
    document.addEventListener("keyup", handleKeyUp, false);
    return () => {
      //销毁键盘事件
      document.removeEventListener("keyup", handleKeyUp, false);
    };
  }, []);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setDataVal(values);
      setVerifyFlag(true);
      await getValidCode();
    } catch (errors) {
      console.log(errors);
    }
  };
  const handleKeyUp = async (e: KeyboardEvent) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      await handleOk();
    }
  };
  const handleClose = () => {
    setVerifyFlag(false);
  };
  return (
    <div className={styles["login"]}>
      <div className={styles["warp"]}>
        <div className={styles["content-warp"]}>
          <div className={styles["content"]}>
            <div className={styles["left"]}>
              <img
                src="https://filecdn.ailecheng.com/20230612/d407580a001d2a86dbbf9bde6b90d8b0.jpg"
                alt=""
              />
            </div>
            <div className={styles["right"]}>
              <div className={styles["right-content"]}>
                <div className={styles["logo"]}>
                  <img src={resource.logo} alt="" />
                  <div className={styles["welcome"]}>后台管理系统</div>
                </div>
                <div className={styles["form-warp"]}>
                  <Form form={form}>
                    <FormItem
                      hasFeedback
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "请输入员工账号",
                        },
                      ]}
                    >
                      <Input
                        className={styles["input-form"]}
                        prefix={
                          <i
                            className={[styles.userIcon, styles.icon].join(" ")}
                          ></i>
                        }
                        placeholder="请输入员工账号"
                        size="large"
                        onPressEnter={handleOk}
                      />
                    </FormItem>
                    <FormItem
                      hasFeedback
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "请输入登录密码",
                        },
                      ]}
                    >
                      <Input
                        placeholder="请输入登录密码"
                        className={styles["input-form"]}
                        type="password"
                        size="large"
                        prefix={
                          <b
                            className={[styles.passwordIcon, styles.icon].join(
                              " "
                            )}
                          ></b>
                        }
                        onPressEnter={handleOk}
                      />
                    </FormItem>
                  </Form>
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleOk}
                  className={styles["login-btn"]}
                >
                  登录
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={style["copyright"]}>
          © 2015 - {new Date().getFullYear()}
          <span style={{ padding: "0 5px" }}>
            {websiteApprove?.companyMain}
          </span>
          版权所有
          <span style={{ padding: "0 5px" }}>|</span> ICP证:
          <a
            href="https://beian.miit.gov.cn/"
            className={style["copyright-no"]}
            target="_blank"
            rel="noreferrer"
          >
            {websiteApprove?.number}
          </a>
        </div>
      </div>
      <VerifyModal
        isShow={verifyFlag}
        values={dataVal}
        onCloseModal={handleClose}
      />
    </div>
  );
};
export default Login;
