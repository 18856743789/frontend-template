import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "./scripts/plugins";
import router, { setupRouter } from "@/router";

class Main {
  public async init() {
    const app = this.app();
    await router.isReady();
    app.mount("#app");
  }
  //初始应用
  private app() {
    const app = createApp(App);
    setupRouter(app);
    setupPlugins(app);
    return app;
  }
}

new Main().init();
