/* 定义cookie公共类 */
class Cookie {
  constructor() {

  }
  setCookie(name,value,expireDays){
    if(!name) return;
    let exDate = new Date();
    exDate.setTime(exDate.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires = exDate.toGMTString();
    let result = document.cookie = `${name}=${value};expires=${expires}`;
    return result;
  }
  getCookie(name){
    if(!name) return;
    let arr,
      reg = new RegExp("(^| )"+ name +"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
  }
  delCookie(name){
    if(!name) return;
    let exDate = new Date();
    exDate.setTime(exDate.getTime() - 1);
    let expires = exDate.toGMTString();
    console.log(expires);
    let cval = this.setCookie(name,"",expires);
    console.log("del success",cval);
  }
}

export {
  Cookie
}