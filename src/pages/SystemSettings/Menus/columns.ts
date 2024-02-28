export interface DataType {
  id: string;
  icon: string;
  path: number;
  title: string;
  isDisplayed: string[];
  children?: Array<DataType>;
}
export interface Column {
  title: string;
  dataIndex: string;
  key?: string;
  align?: string;
  width?: number | string;
  [propName: string]: any;
}
const columns: Array<Column> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "菜单名称",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "菜单URL",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "菜单ICON",
    dataIndex: "icon",
    key: "icon",
  },
  {
    title: "是否显示",
    dataIndex: "isDisplayed",
    key: "isDisplayed",
  },
];
export default columns;
