import {getElement,loginOrUpWarning} from "../../utils/public.js";
import {login} from "./login.js";
import {signUp} from "./signUp.js";
/* click event */

/*tab change event*/
let accountTabs = getElement(".account-tab"),
  accountInput = getElement(".account-input")[0],
  accountNoPd = getElement(".account-input-noPd")[0],
  isSignOrLogin = false;

accountTabs.forEach((item,index)=>{
  item.onclick = ()=> {
    for (let accountTab of accountTabs) {
      accountTab.classList.remove("account-tab-active");
    }
    item.classList.add("account-tab-active");
    if(index == 0){
      accountNoPd.classList.add("tab-show");
      accountInput.classList.remove("tab-show");
      submitBtn.innerHTML = "注册";
      isSignOrLogin = true;
    }else{
      accountInput.classList.add("tab-show");
      accountNoPd.classList.remove("tab-show");
      submitBtn.innerHTML = "登录";
      isSignOrLogin = false;
    }
  }
  // console.log(item,index);
})

/* submit or signUp  */
let userIptSign = getElement(".user_ipt_sign")[0],
  pIptSign = getElement(".password_ipt_sign")[0],
  pdIptSignRep = getElement(".password_ipt_sign_rep")[0],
  phoneIptSignRep = getElement(".phone_ipt_sign_rep")[0],
  submitBtn = getElement(".button-submit")[0],
  errorInfo = getElement(".errorInfo");

function changeOnblur(element,str,color,type){
  element.value = str;
  element.style.color = color;
  element.type = type;
}

userIptSign.onblur = ()=> {
  if(userIptSign.value == ""){
    changeOnblur(userIptSign,"请输入账号","red");

  }
}
userIptSign.onfocus = ()=> {
  if(userIptSign.value == "请输入账号"){
    changeOnblur(userIptSign,"","black");
  }
}

pIptSign.onblur = ()=> {
  if(pIptSign.value == ""){
    changeOnblur(pIptSign,"设置密码","red");
  }
}
pIptSign.onfocus = ()=> {
  if(pIptSign.value == "设置密码"){
    changeOnblur(pIptSign,"","black","password");
  }
}

pdIptSignRep.onblur = ()=> {
  if(pdIptSignRep.value == ""){
    changeOnblur(pdIptSignRep,"确定密码","red");

  }
}
pdIptSignRep.onfocus = ()=> {
  if(pdIptSignRep.value == "确定密码"){
    changeOnblur(pdIptSignRep,"","black","password");
  }

}
function judgeIdt(){
  if(pdIptSignRep.value != pIptSign.value){
    pdIptSignRep.nextElementSibling.style.display = "block";
    pdIptSignRep.nextElementSibling.innerHTML = "两次密码不一样，请重新输入"

  }else{
    pdIptSignRep.nextElementSibling.style.display = "none";
    pdIptSignRep.nextElementSibling.innerHTML = ""
  }
}
pdIptSignRep.onkeyup = ()=> {
  judgeIdt();
}

phoneIptSignRep.onblur = ()=> {
  if(phoneIptSignRep.value == ""){
    changeOnblur(phoneIptSignRep,"请输入手机号码","red");
    phoneIptSignRep.nextElementSibling.style.display = "none";
    phoneIptSignRep.nextElementSibling.innerHTML = ""
    SignUpStatus = false;
  }
}
phoneIptSignRep.onfocus = ()=> {
  if(phoneIptSignRep.value == "请输入手机号码"){
    changeOnblur(phoneIptSignRep,"","black");
  }

}
phoneIptSignRep.onkeyup = ()=> {
  phoneIptSignRep.value = phoneIptSignRep.value.replace(/[^\d]/g,'');
  if(phoneIptSignRep.value != ""){
    if(isPoneAvailable(phoneIptSignRep.value)){
      phoneIptSignRep.nextElementSibling.style.display = "none";
      phoneIptSignRep.nextElementSibling.innerHTML = ""
    }else{
      phoneIptSignRep.nextElementSibling.style.display = "block";
      phoneIptSignRep.nextElementSibling.innerHTML = "你输入的手机格式有误"
    }
  }
}
function isPoneAvailable($poneInput) {
  let myReg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myReg.test($poneInput)) {
    return false;
  } else {
    return true;
  }
}


/*input value listen*/

let inputText = getElement(".user_ipt")[0],
  inputPd = getElement(".password-ipt")[0],
  eyeShow = getElement(".isShow-pd")[0],
  SignUpStatus = false;
console.log(inputText,inputPd);
inputText.onblur = ()=> {
  if(inputText.value == ""){
    changeOnblur(inputText,"请输入手机号或邮箱","red");
  }
}
inputText.onfocus = ()=> {
  if(inputText.value == "请输入手机号或邮箱"){
    changeOnblur(inputText,"","black");
  }
}
inputPd.onblur = ()=> {
  if(inputPd.value == ""){
    changeOnblur(inputPd,"请输入密码","red","text");
  }
}
/* isShow password */
inputPd.onfocus = ()=> {
  if(inputPd.value == "请输入密码"){
    changeOnblur(inputPd,"","black","password");
  }
}
eyeShow.onclick = ()=> {
  if(inputPd.type == "password"){
    inputPd.type = "text"
    eyeShow.classList.remove("icon-icon-test1");
    eyeShow.classList.add("icon-icon-test2");
  }else{
    inputPd.type = "password";
    eyeShow.classList.remove("icon-icon-test2");
    eyeShow.classList.add("icon-icon-test1");
  }
}

/* submit */
submitBtn.onclick = () => {
  console.log(isSignOrLogin)
  let isStatus;
  if(isSignOrLogin){
    if(userIptSign.value != "" &&
      pIptSign.value === pdIptSignRep.value &&
      phoneIptSignRep.value != ""){
      errorInfo.forEach((item,index) => {
        if(item.innerHTML != ""){
          isStatus = false;
        }else{
          isStatus = true;
        }
      });
      if(isStatus){
        signUp(userIptSign.value,pIptSign.value,phoneIptSignRep.value);
        console.log("可以注册");
      }else{
        loginOrUpWarning("注册信息填写错误","注册");
        console.log("不可以注册");
      }
      console.log(errorInfo);
    }else{
      console.log("注册error");
    }
  }else{
    if(inputText.value != "" && inputPd.value != ""){
      login(inputText.value,inputPd.value);
      console.log("submit");
    }else{
      console.log("error");
    }
  }
}
/* qrcodeTa change */
let userBox = getElement(".userPd")[0],
  qrcodeTa = getElement(".qrcodeTa")[0],
  qrcodeTaBox = getElement(".qrcodeTa-box")[0],
  qrcodeText = getElement(".qrcode-ta2")[0];

qrcodeTa.onclick = ()=> {
  userBox.classList.add("isShow");
  qrcodeTaBox.style.display = "block";
}
qrcodeText.onclick = ()=> {
  userBox.classList.remove("isShow");
  qrcodeTaBox.style.display = "none";
}

