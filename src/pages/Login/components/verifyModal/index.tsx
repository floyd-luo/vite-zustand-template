import React, { useState } from "react";
import { Spin, Modal, message } from "antd";
import { CloseOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { localStorage, getAccessCode } from "front-ent-tools";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { userStore, tokenStore } from "@/store/createStore";
import { dataValProps } from "../../index";
import useLongPress from "./LongPress";
import styles from "./index.module.scss";
interface VerifyModalProps {
  values: dataValProps;
  isShow: boolean;
  onCloseModal: () => void;
}
const VerifyModal: React.FC<VerifyModalProps> = (props) => {
  const { values, isShow, onCloseModal } = props;
  const navigate = useNavigate();
  const [moveStart, setMoveStart] = useState(false);
  const [initX, setInitX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [spinLoading, setSpinLoading] = useState(false);
  const { originalImage, yheight, slidingImage, deviceId } = tokenStore(
    (state) => ({
      originalImage: state.originalImage,
      yheight: state.yheight,
      slidingImage: state.slidingImage,
      deviceId: state.deviceId,
    }),
    shallow
  );
  const updateLoginStatus = userStore((state) => state.updateLoginStatus);
  const accessToken = tokenStore((state) => state.accessToken);
  const getValidCode = tokenStore((state) => state.getValidCode);
  const getUserInfo = userStore((state) => state.getUserInfo);
  const getMenuList = userStore((state) => state.getMenuList);
  const goLogin = tokenStore((state) => state.login);
  const defaultSelectedPath = userStore((state) => state.defaultSelectedPath);

  const refreshVerify = async () => {
    setInitX(0);
    setMoveX(0);
    setSpinLoading(true);
    getValidCode();
    setSpinLoading(false);
  };
  const onLongPress = (e: React.TouchEvent & React.MouseEvent): void => {
    setMoveStart(true);
    const touch = e?.touches?.[0];
    setInitX(touch ? touch.clientX : e.clientX);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 100,
  };

  const longPressEvent = useLongPress({
    onLongPress,
    defaultOptions,
  });
  const moveXFn = (x: number) => {
    const langX = x - initX;
    if (langX >= 240) {
      return 240;
    } else if (langX <= 0) {
      return 0;
    }
    return x - initX;
  };
  const moveSlider = (e: React.MouseEvent) => {
    if (!moveStart) return false;
    setMoveX(moveXFn(e?.clientX));
  };
  const moveTouchSlider = (e: React.TouchEvent) => {
    if (!moveStart) return false;
    setMoveX(moveXFn(e?.touches?.[0]?.clientX));
  };

  const moveLeave = async () => {
    if (!moveStart) return false;
    setMoveStart(false);
    await login();
  };

  const handleClose = () => {
    onCloseModal();
  };

  const login = async () => {
    setSpinLoading(true);
    const { username, password } = values;
    const isLoginRes = await goLogin({
      username,
      password,
      deviceId: deviceId,
      grant_type: "password",
      validCode_type: "drag",
      dragXpos: moveX,
      accesCode: getAccessCode("1"),
    });
    if (isLoginRes?.success) {
      onCloseModal();
      const userInfo = await getUserInfo();
      if (userInfo) {
        const { userOtherInfo, user } = userInfo;
        if (userOtherInfo?.weakPwd || user?.isDefPwd) {
          localStorage.remove([
            "user",
            "dataPermission",
            "accessToken",
            "refreshToken",
          ]);
          Modal.error({
            title: "小提示~",
            content: "你的密码为初始密码，避免信息泄漏，请修改密码！",
            onOk: () => {
              navigate("/login/changePassword", {
                state: {
                  token: accessToken,
                  id: user?.id,
                  weakPwd: userOtherInfo?.weakPwd,
                },
              });
            },
            okText: "去修改",
          });
          return;
        }
        await getMenuList();
        updateLoginStatus(true);
        navigate(defaultSelectedPath);
        setSpinLoading(false);
      }
    } else {
      message.error(isLoginRes?.message);
      if (isLoginRes?.message.indexOf("验证失败") >= 0) {
        await refreshVerify();
      } else {
        setInitX(0);
        setMoveX(0);
        onCloseModal();
      }
    }
  };
  return (
    <>
      {isShow ? (
        <div
          className={styles["verify-view"]}
          onTouchMove={(e) => moveTouchSlider(e)}
          onMouseMove={(e) => moveSlider(e)}
          onTouchEnd={moveLeave}
          onMouseUp={moveLeave}
        >
          <div className={styles["content"]}>
            <div className={styles["verify-title"]}>
              <div style={{ marginLeft: "3px" }}>请完成拼图验证</div>
              <div className={styles["verify-close"]} onClick={handleClose}>
                <CloseOutlined />
              </div>
            </div>
            <div className={styles["verify-content"]}>
              <div className={styles["verify-bg"]}>
                {originalImage && (
                  <>
                    <img
                      className={styles["verify-img-bg"]}
                      src={"data:image/png;base64," + originalImage}
                      alt=""
                      onMouseDown={(e) => e.preventDefault()}
                    />
                    <div
                      className={styles["verify-move"]}
                      {...longPressEvent}
                      style={{
                        top: `${yheight}px`,
                        left: `${moveX}px`,
                      }}
                    >
                      <img
                        className={styles["verify-img-slider"]}
                        src={"data:image/png;base64," + slidingImage}
                        alt=""
                        onMouseDown={(e) => e.preventDefault()}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className={styles.sliderContainer}>
                向右滑动填充拼图
                <div
                  className={`${styles["sliderMask"]} ${
                    moveX > 0 ? styles["sidler-border"] : ""
                  }`}
                  style={{ width: `${moveX}px` }}
                ></div>
                <div
                  {...longPressEvent}
                  className={styles["slider"]}
                  style={{ left: `${moveX}px` }}
                >
                  <ArrowRightOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Spin spinning={spinLoading} fullscreen />
    </>
  );
};
export default VerifyModal;
