import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function getComments(q_id,ans_id) {
  return Aj.get(`/questions/${q_id}/answers/${ans_id}/comments`)
}

export {
  getComments
}