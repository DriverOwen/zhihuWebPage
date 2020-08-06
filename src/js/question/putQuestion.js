import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

/* 放弃了话题功能 */
export function createQuestion(questioner,title,description,topics){
  return Aj.post("/question/create", {
    title,
    questioner,
    description
  },{
    name:"Authorization",
    value: Ck.getCookie("token")
  }).then(data => {
    //console.log(data);
    if (data.errno === 0) {
      return true
    } else {
      return false
    }
  })
}