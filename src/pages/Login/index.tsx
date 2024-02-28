import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import resource from "@/resource";
import { userStore, tokenStore } from "@/store/createStore";
import VerifyModal from "./components/verifyModal";
import { websiteApprove, getDefaultHP } from "@/utils";
import style from "@/styls/copyright.module.scss";
import styles from "./index.module.scss";
const FormItem = Form.Item;
export interface dataValProps {
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const logout = tokenStore((state) => state.logout);
  const getValidCode = tokenStore((state) => state.getValidCode);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const updateLoginStatus = userStore((state) => state.updateLoginStatus);
  const [userHP, setUserHP] = useState<string>("");
  const user = userStore((state) => state.user);
  const [dataVal, setDataVal] = useState<dataValProps>({
    username: "",
    password: "",
  });
  const [verifyFlag, setVerifyFlag] = useState<boolean>(false);
  const handleKeyUp = async (e: any) => {
    const keyCode = e.code;
    if (keyCode === "Enter") {
      await handleOk();
    }
  };
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
  const handleClose = () => {
    setVerifyFlag(false);
  };
  const handleEnter = () => {
    navigate("/");
  };
  return (
    <div className={styles["login"]}>
      <div className={styles["warp"]}>
        <div className={styles["content-warp"]}>
          <div className={styles["content"]}>
            <div className={styles["left"]}>
              <img
                src="https://filecdn.ailecheng.com/20231215/75909f362f2dec34a7cdc3fdf5a9116b.webp"
                alt=""
              />
            </div>
            <div className={styles["right"]}>
              <div className={styles["right-content"]}>
                <div className={styles["logo"]}>
                  <img src={resource.logo} alt="" />
                  <div className={styles["welcome"]}>后台管理系统</div>
                </div>
                <div
                  className={classNames({
                    [styles["login-content"]]: true,
                    [styles["login-content-border"]]: isLoggedIn,
                  })}
                >
                  {isLoggedIn ? (
                    <div className={styles["rapidly-enter"]}>
                      <div className={styles["rapidly-title"]}>
                        为保障您的账号安全，请确认继续用以下账号登录
                      </div>
                      <div className={styles["rapidly-head-portrait"]}>
                        <img
                          alt={`${user?.staffName}`}
                          onError={() => {
                            setUserHP(getDefaultHP(user?.sex?.toString()));
                          }}
                          src={userHP}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className={styles["rapidly-userName"]}>
                        {user?.staffName}
                      </div>
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleEnter}
                        className={styles["rapidly-enter"]}
                      >
                        快速进入
                      </Button>
                      <div
                        className={styles["rapidly-other"]}
                        onClick={async () => {
                          const res = await logout();
                          if (res) {
                            updateLoginStatus(false);
                          }
                        }}
                      >
                        使用其他账号登录
                      </div>
                    </div>
                  ) : (
                    <>
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
                                  className={[
                                    styles.userIcon,
                                    styles.icon,
                                  ].join(" ")}
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
                                  className={[
                                    styles.passwordIcon,
                                    styles.icon,
                                  ].join(" ")}
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
                    </>
                  )}
                </div>
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
