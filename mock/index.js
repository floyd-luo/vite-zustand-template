import { servicesMock } from "@/utils/host";
const { SSO, USERCENTER } = servicesMock;
export default [
  {
    url: `${USERCENTER}/menus/current`,
    method: "GET",
    response: () => {
      return {
        resp_code: 0,
        resp_msg: "",
        data: [
          {
            id: "1",
            parentId: "-1",
            icon: "DashboardOutlined",
            path: "",
            isDisplayed: true,
            children: [
              {
                id: "101",
                path: "/",
                parentId: "1",
                isDisplayed: true,
                isDefaultSelected: true,
                label: "工作台",
                title: "工作台",
              },
            ],
            label: "Dashboard",
            title: "Dashboard",
          },
          {
            id: "2",
            icon: "UserOutlined",
            parentId: "-1",
            label: "人事管理",
            title: "人事管理",
            path: "",
            isDisplayed: true,
            children: [
              {
                id: "201",
                isDisplayed: true,
                parentId: "2",
                isDefaultSelected: true,
                path: "/personnel/staffManagement",
                label: "员工管理",
                title: "员工管理",
              },
            ],
          },
          {
            id: "3",
            icon: "SettingOutlined",
            parentId: "-1",
            label: "系统设置",
            title: "系统设置",
            path: "",
            isDisplayed: true,
            children: [
              {
                id: "301",
                parentId: "3",
                isDisplayed: true,
                path: "/systemSettings/menus",
                label: "菜单管理",
                title: "菜单管理",
              },
            ],
          },
        ],
      };
    },
  },
];
