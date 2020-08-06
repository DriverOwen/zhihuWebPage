import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function collectingQst(q_id) {
  return Aj.put(`/users/collectingQuestions/${q_id}`,"",{
    name:"Authorization",
    value: Ck.getCookie("token")
  })
}

function delCollectingQst(q_id) {
  return Aj.delete(`/users/collectingQuestions/${q_id}`,"",{
    name:"Authorization",
    value: Ck.getCookie("token")
  })
}

function getCollectingQst(userId) {
  return Aj.get(`/users/${userId}/collectingQuestions/`)
}

export {
  collectingQst,
  delCollectingQst,
  getCollectingQst
}