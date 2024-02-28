import { Layout, Breadcrumb } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { userStore } from "@/store/createStore.ts";
import MySider from "./mySider";
import MyHeader from "./myHeader";
import MyFooter from "./myFooter";
import styles from "./copyright.module.scss";

const { Content } = Layout;
const createBreadItems = (menuObj: any, path: string, menList: any[]) => {
  let r: any[] = [];
  Object.keys(menuObj).forEach((key) => {
    menuObj[key].forEach((_item: string, idx: number) => {
      if (_item === path) {
        const menuListSlice = menList[Number(key)].slice(0, idx + 1);
        r = menuListSlice?.map((item: { path: string; title: string }) => ({
          title: item?.path ? (
            <Link to={item?.path}>{item?.title}</Link>
          ) : (
            item?.title
          ),
        }));
      }
    });
  });
  return r;
};
const MyLayout = () => {
  const location = useLocation();
  const pathMenuList = userStore((state) => state.pathMenuList);
  const pathMenuListObj = userStore((state) => state.pathMenuListObj);
  const breadItems = createBreadItems(
    pathMenuListObj,
    location.pathname,
    pathMenuList
  );
  return (
    <Layout>
      <MySider />
      <Layout>
        <MyHeader />
        <Content
          style={{
            minHeight: "auto",
            paddingTop: "10px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Breadcrumb items={breadItems} />
          <div
            style={{
              background: "#fff",
              marginTop: "10px",
              minHeight: "100%",
              borderRadius: "1px",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <MyFooter
          copyrightClassNames={styles["copyright"]}
          copyrightNoClassNames={styles["copyright-no"]}
        />
      </Layout>
    </Layout>
  );
};
export default MyLayout;
