import { defineStore } from "pinia";
import { UserState } from "@/store/interface";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: "",
      userInfo: { name: "zhangyh" }
    };
  },
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  }
});
