import { Login } from "@/api/interface/index";
import http from "@/scripts/utils/http";

enum Api {
  Login = "/login",
  Logout = "/logout"
}

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(Api.Login, params, { loading: false }); // 正常 post json 请求  ==>  application/json
};
