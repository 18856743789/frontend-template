import { App } from "vue";
import setupPinia from "./pinia";
import setupAssets from "./resources";

export function setupPlugins(app: App) {
  setupAssets(app);
  setupPinia(app);
}
