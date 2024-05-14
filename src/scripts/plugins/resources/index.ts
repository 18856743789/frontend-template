import "@/styles/index.scss";
import { App } from "vue";
import * as Icons from "@element-plus/icons-vue";

// 引入静态资源
export default (app: App) => {
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
};
