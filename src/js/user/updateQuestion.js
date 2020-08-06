import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax();
let Ck = new Cookie();

function updateQst(id,title,description) {
  return Aj.patch(`/question/${id}`,{
    title,
    description
  },{name:"Authorization", value: Ck.getCookie("token")})
}
export {
  updateQst
}