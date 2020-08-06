import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax();
let Ck = new Cookie();

function delQst(id) {
  return Aj.delete(`/question/${id}`,"",{name:"Authorization", value: Ck.getCookie("token")})
}
export {
  delQst
}