import {Ajax} from "../../utils/ajax.js";
import {loginOrUpWarning} from "../../utils/public.js";
import {Cookie} from "../../utils/setCookie.js";
import {getElement} from "../../utils/public.js";

let loginAjax = new Ajax(),
  myCookie = new Cookie(),
  inputText = getElement(".user_ipt")[0],
  inputPd = getElement(".password-ipt")[0];

function login(username,password) {
  console.log(username,password,"ss");
  let instance = loginAjax.post("/users/login",{
    username,
    password
  });
  instance.then(data => {
    console.log(data);
    if(data.errno === 0){
      let token = data.data.token;
      let time = 3;
      myCookie.setCookie("token", token, time)
      window.location.href = "home.html";
    }else if(data.name === "UnauthorizedError"){
      throw "用户名或者密码错误"
    }
  }).catch(err => {
    console.log(err);
    clearInput();
    loginOrUpWarning("用户名或者密码错误","登录");
  });
}

function clearInput() {
  inputText.value = "";
  inputPd.value = "";
  inputText.focus();
}

export {
  login
}