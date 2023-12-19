import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MySider from "./mySider";
import MyHeader from "./myHeader";
import MyFooter from "./myFooter";

const { Content } = Layout;

const MyLayout = () => {
  return (
    <Layout>
      <MySider />
      <Layout>
        <MyHeader />
        <Content style={{ minHeight: "auto", paddingTop: "10px" }}>
          <Outlet />
        </Content>
        <MyFooter />
      </Layout>
    </Layout>
  );
};
export default MyLayout;
