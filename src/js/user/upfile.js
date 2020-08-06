import {getElement} from "../../utils/public.js";
import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";

let Aj = new Ajax(),
  Ck = new Cookie();

function uploadFile(file) {
  return Aj.post("/upload",file);
}
export {
  uploadFile
}