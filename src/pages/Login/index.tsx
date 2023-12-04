import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import resource from "@resource";
import { useStore } from "@/store/createStore";
import VerifyModal from "./components/verifyModal";
import styles from "./index.module.scss";
const FormItem = Form.Item;
const Login = (props) => {
  const [form] = Form.useForm();
  const getValidCode = useStore((state) => state.getValidCode);
  const [dataVal, setDataVal] = useState<object>({});
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
      getValidCode();
    } catch (errors) {
      console.log(errors);
    }
  };
  const handleKeyUp = async (e) => {
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
        <div className={styles["copyright"]}>
          Copyright © 2015 - {new Date().getFullYear()} By 第壹街舞 All Rights
          Reserved
          <span styles={{ padding: "0 10px" }}>|</span> ICP证:
          <a
            href="https://beian.miit.gov.cn/"
            styles={{ marginLeft: "5px" }}
            target="_blank"
            rel="noreferrer"
          >
            粤ICP备2021154047号
          </a>
        </div>
      </div>
      {verifyFlag && (
        <VerifyModal values={dataVal} onCloseModal={handleClose} />
      )}
    </div>
  );
};
export default Login;
