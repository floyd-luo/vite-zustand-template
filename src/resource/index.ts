import * as host from "@/utils/host";
interface resourceInterface {
  [propsName: string]: string;
}
const resource: resourceInterface = {
  avater: `${host?.staticResourceHost}/20230528/8af6e855557d3cbff6611af19b86c71e.jpg`,
  logo: `${host?.staticResourceHost}/20221023/4c9a6f04894ef7b48a882b9749e69f2a.png`,
  defaultMaleProfilePicture: `${host?.staticResourceHost}/20231216/8af6e855557d3cbff6611af19b86c71e.jpg`,
  defaultFemaleProfilePicture: `${host?.staticResourceHost}/20231028/c1b4929a3175caf22c078cd192ed0afa.jpg`,
  none: `${host?.staticResourceHost}/20231219/05f8d4612d2f970b9092cca56fe7fc05.png`,
};
export default resource;
