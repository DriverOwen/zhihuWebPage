import {Ajax} from "./ajax.js";
import {Cookie} from "./setCookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

/* 根据token 获取用户 */

let verify = Aj.get("/users/getUser","",{
  name:"Authorization",
  value: Ck.getCookie("token")
}).then(data => {
  return data;
}).catch(err => {
  console.log(err);
})

export {
  verify
}