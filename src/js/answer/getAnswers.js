import {Ajax} from "../../utils/ajax.js";

let getAnsAjax = new Ajax();

function getAns(p_id) {
  let id = p_id || "";

  let result = getAnsAjax.get(`/answers/${id}`,"",{},false).then(data => {
    data._qid = id;
    return data
  })
  return result;
}

export {
  getAns
}