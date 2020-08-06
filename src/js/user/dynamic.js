import {loadQuestion} from "../question/loadQuestions.js";
import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

/* 获取用户发布的问题，回答，已经赞过的回答的动态 */
/* question */
function getQst(id) {
  return Aj.get(`/users/${id}/questions`,"");
}
function getAns() {

}
function getLikingAns(id) {
  return Aj.get(`/users/${id}/likingAnswers`,"");
}
export {
  getQst,
  getLikingAns
}