import React, { useState, useEffect } from "react";
import { Spin, Modal, message } from "antd";
import { localStorage } from "front-ent-tools";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "@/store/createStore";
import useLongPress from "./LongPress";
import styles from "./index.module.scss";
import { CloseOutlined, ArrowRightOutlined } from "@ant-design/icons";
let isMounted = true;
const VerifyModal = (props) => {
  const { values, onCloseModal } = props;
  const navigate = useNavigate();
  const [moveStart, setMoveStart] = useState(false);
  const [initX, setInitX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [spinLoading, setSpinLoading] = useState(false);
  const { originalImage, yheight, slidingImage, deviceId } = useStore(
    (state) => ({
      originalImage: state.originalImage,
      yheight: state.yheight,
      slidingImage: state.slidingImage,
      deviceId: state.deviceId,
    }),
    shallow
  );
  const accessToken = useStore((state) => state.accessToken);
  const getValidCode = useStore((state) => state.getValidCode);
  const getUserInfo = useStore((state) => state.getUserInfo);
  const goLogin = useStore((state) => state.login);
  useEffect(() => {
    refreshVerify();
    return () => {
      isMounted = false;
    };
  }, []);

  const refreshVerify = async () => {
    setInitX(0);
    setMoveX(0);
    setSpinLoading(true);
    await getValidCode();
    setSpinLoading(false);
  };

  const onLongPress = (e: any): void => {
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

  const moveSidler = (e, isTouch) => {
    if (!moveStart) return false;
    const touch = e?.touches?.[0];
    const x = isTouch && touch ? touch.clientX : e?.clientX;
    setMoveX(() => {
      const langX = x - initX;
      if (langX >= 240) {
        return 240;
      } else if (langX <= 0) {
        return 0;
      }
      return x - initX;
    });
  };

  const moveLeave = () => {
    if (!moveStart) return false;
    setMoveStart(false);
    login();
  };

  const handleClose = () => {
    onCloseModal();
  };

  const login = async () => {
    setSpinLoading(true);
    const isLoginRes = await goLogin({
      ...values,
      deviceId: deviceId,
      grant_type: "password",
      validCode_type: "drag",
      dragXpos: moveX,
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
        navigate("/");
      }
    } else {
      message.error(isLoginRes?.message);
      onCloseModal();
    }
  };
  return (
    <>
      <div
        className={styles["verify-view"]}
        onTouchMove={(e) => moveSidler(e, "touch")}
        onMouseMove={(e) => moveSidler(e, "")}
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
          <Spin spinning={spinLoading} tip="加载中">
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
          </Spin>
        </div>
      </div>
    </>
  );
};
export default VerifyModal;
