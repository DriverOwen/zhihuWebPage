import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function getSearchRes(keywords) {
  return Aj.get("/question?",{
    q:keywords
  })
}

export {
  getSearchRes
}