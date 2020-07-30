import {getElement} from "../../utils/public.js";
import {Ajax} from "../../utils/ajax.js";
import {getAns} from "../answer/getAnswers.js";

/* 页面加载时 加载问题列表 */

let getQstAjax = new Ajax(),
  template = null;

function loadQuestion(q_id) {
  let id = q_id || "";
  return getQstAjax.get(`/question/${id}`);
}

export {
  loadQuestion
}