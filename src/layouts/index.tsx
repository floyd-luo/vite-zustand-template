import { Layout, Breadcrumb } from "antd";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import MySider from "./mySider";
import MyHeader from "./myHeader";
import MyFooter from "./myFooter";
import styles from "./copyright.module.scss";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

const { Content } = Layout;
const itemRender = (
  route: ItemType,
  params: any,
  routes: ItemType[],
  paths: string[]
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join("/")} state={params}>
      {route.title}
    </Link>
  );
};
const MyLayout = () => {
  const breadProps = {
    itemRender,
    items: [
      {
        title: "Home",
      },
      {
        title: "Application Center",
      },
      {
        title: "Application List",
      },
      {
        title: "An Application",
      },
    ],
  };
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
          <Breadcrumb {...breadProps} />
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
