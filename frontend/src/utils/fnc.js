import { message } from "antd";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { signout } from "../redux/features/login/loginSlice";
import { store } from "../redux/store";
import _ from "lodash";

export function validjwt(fnc) {
  const token = Cookies.get("token");
  const utoken = store.getState().login.accessToken;
  const exp = jwt_decode(utoken ? utoken : token).exp;
  const now = new Date().getTime() / 1000;
  if (!utoken && !token) return null;
  if (!exp || exp > now) {
    fnc();
    return null;
  }
  message.error("Access expired login again");
  store.dispatch(signout());
  return null;
}

export function compare(a, b) {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
}

export function noupdates(obj1, ref) {
  _.isEqual(obj1, ref.getFieldValue())
    ? message.error("No updates in field")
    : ref.submit();
}
export const trimspace = (value) => value.trim();
