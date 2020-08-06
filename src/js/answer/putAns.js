import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function putAns(id,content) {
  return Aj.post(`/answers/${id}`,{
    content
  },{
    name:"Authorization",
    value: Ck.getCookie("token")
  });
}

export {
  putAns
}