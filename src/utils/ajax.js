class Ajax {
  constructor() {
    this.targetUrl = "http://localhost:8000";
  }
  // 封装ajax
  ajax(url,method,data,header,async){
    let xhr,
      result;
    if(window.XMLHttpRequest){
     xhr = new XMLHttpRequest();
    }else{
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(!data) data = "";
    if(!async) async = true
    if(method === "get"){
      xhr.open('get', url , async);
      xhr.setRequestHeader(header.name,"Bearer " + header.value);
      xhr.send(null);
    }else if(method === "post"){
      xhr.open('post', url , async);
      xhr.setRequestHeader(header.name,"Bearer " + header.value);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.send(data);
    }else if(method === "put"){
      xhr.open('put', url , async);
      xhr.setRequestHeader(header.name,"Bearer " + header.value);
      xhr.send(data);
    }else if(method === "delete"){
      xhr.open('delete', url , async);
      xhr.setRequestHeader(header.name,"Bearer " + header.value);
      xhr.send(data);
    }else{
      console.log("Ajax method is not found");
    }
    // promise 使其异步获取回调数据
    let getData = new Promise((resolve, reject) => {
      xhr.onreadystatechange = function(){
        let result;
        if(xhr.readyState  == 4){
          if(xhr.status >= 200 || xhr < 300){
            result = JSON.parse(xhr.responseText);
            if(result){
              resolve(result);
            }else{
              reject("err");
            }
          }else{
            console.log("请求失败");
            result = false;
            reject(result);
          }
        }else{
          console.log("还在准备");
        }
      }
    })
    return getData;
  }
  // post请求
  post(path,data,header,async) {
    if(!path) path = "";
    if(!data) data = "";
    if(!header) header = {};
    let encodeData = this.encodeFormData(data);
    let url = this.targetUrl + path;
    //console.log(this.encodeFormData(data));
    let receiveData = this.ajax(url,"post",this.encodeFormData(data),header,async);
    //console.log(receiveData);
    return receiveData;
  }
  // get请求
  get(path,data,header,async) {
    if(!path) path = "";
    if(!data) data = "";
    if(!header) header = {};
    let encodeData = this.encodeFormData(data);
    let url = this.targetUrl + path + encodeData;
    let receiveData = this.ajax(url,"get","",header,async);
    return receiveData;
  }
  // put请求
  put(path,data,header,async) {
    if(!path) path = "";
    if(!data) data = "";
    if(!header) header = {};
    let encodeData = this.encodeFormData(data);
    let url = this.targetUrl + path + encodeData;
    let receiveData = this.ajax(url,"put","",header,async);
    return receiveData;
  }
  delete(path,data,header,async) {
    if(!path) path = "";
    if(!data) data = "";
    if(!header) header = {};
    let encodeData = this.encodeFormData(data);
    let url = this.targetUrl + path + encodeData;
    let receiveData = this.ajax(url,"delete","",header,async);
    return receiveData;
  }
  // 转换参数
  encodeFormData(data) {
    //console.log(Object.prototype.toString.call(data));
    console.log(data);
    if (!data || Object.prototype.toString.call(data) !== '[object Object]') return "";
    let pair = [];
    for (let key in data) {
      console.log(key);
      if (!data.hasOwnProperty(key))
        continue;
      if (typeof data[key] === "function") {
        data[key] = data[key]();
      }

      let value = encodeURIComponent(data[key].replace("%20", "+"));
     // let value = encodeURIComponent(data[key]);
      pair.push(key + "=" + value);
    }
    console.log(pair.join("&"));
    return pair.join("&");
  }
}
export {Ajax}