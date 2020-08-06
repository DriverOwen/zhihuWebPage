import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function putComments(q_id,ans_id,content) {
  return Aj.post(`/questions/${q_id}/answers/${ans_id}/comments`,{
    content
  },{
    name:"Authorization",
    value: Ck.getCookie("token")
  })
}

export {
  putComments
}