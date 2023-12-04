import { AppstoreOutlined } from "@ant-design/icons";
export interface IFMenuBase {
  key: string;
  path: string;
  label: string;
  icon?: string | null;
  disabled?: boolean;
  component?: string;
  query?: string;
  requireAuth?: string;
  route?: string;
  /** 是否登录校验，true不进行校验（访客） */
  login?: boolean;
}

export interface IFMenu extends IFMenuBase {
  children?: IFMenu[];
}

const menus: {
  menus: IFMenu[];
  others: IFMenu[] | [];
  [index: string]: any;
} = {
  menus: [
    {
      key: "system",
      path: "/app/system",
      label: "系统",
      icon: "scan",
      children: [
        {
          key: "systemHome",
          path: "/app/system/home",
          label: "首页",
          icon: null,
          disabled: false,
          component: "Home",
        },
        {
          key: "page1",
          path: "/app/system/page1",
          label: "Page1",
          icon: null,
          disabled: false,
          component: "Page1",
        },
      ],
    },
  ],
  others: [], // 非菜单相关路由
};

export default menus;
