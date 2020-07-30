import {getElement,loginOrUpWarning} from "../../utils/public.js";
import {Ajax} from "../../utils/ajax.js";

let loginAjax = new Ajax(),
  userIptSign = getElement(".user_ipt_sign")[0],
  pIptSign = getElement(".password_ipt_sign")[0],
  pdIptSignRep = getElement(".password_ipt_sign_rep")[0],
  phoneIptSignRep = getElement(".phone_ipt_sign_rep")[0];

function signUp(username,password,phone) {
  let instance = loginAjax.post("/users/create",{
    username,
    password,
    phone
  });
  instance.then(data => {
    console.log(data);
    if(data.status === 409){
      throw data.message;
    }else if(data.errno === 0){
      window.location.href = "page/success.html";
    }
  }).catch(err => {
    cleanInput();
    loginOrUpWarning(err,"注册");
    console.log(err);
  })
}

function cleanInput() {
  userIptSign.value = "";
  pIptSign.value = "";
  pdIptSignRep.value = "";
  phoneIptSignRep.value = "";
  userIptSign.focus();
}

export {
  signUp
}