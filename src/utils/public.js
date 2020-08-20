/* 定义公共方法 */

/* get html dom element */
import {dislike, dislikeOrVote, getUserVote} from "../js/liker.js";
import {verify} from "./Verify.js";

function getElement(element) {
  return document.querySelectorAll(element);
}
/* 注册和登录 input事件 */
function loginOrUpWarning(message,call) {
  if(!message | !call) return;
  let btnSubmit = getElement(".button-submit")[0];
  btnSubmit.style.background = "#E71D36";
  btnSubmit.style.animation = "warningAnm 0.5s";
  btnSubmit.innerHTML = message;

  let timer = setTimeout(()=>{
    btnSubmit.style.background = "#0084ff";
    btnSubmit.style.animation = "";
    btnSubmit.innerHTML = call;
    clearTimeout(timer);
  },800);
}

/* 取消异步数据请求导致的乱序问题 */
function sortQuestion(data){
  let TopstoryBox = getElement(".TopstoryBox")[0];
  console.log("执行排序");
  let child = [];
  console.log(data);
  for (let i = 0; i < data.length; i++){
    child.push(data[i]);
  }
  child.sort((a,b) => {
    let date1 = new Date(a.getAttribute("q_id")),
      date2 = new Date(b.getAttribute("q_id"));
    return date1 > date2 ? 1 : -1;
  })
  TopstoryBox.innerHTML = "";
  for (let i = 0; i < child.length; i++){
    TopstoryBox.appendChild(child[i]);
  }
}

/* 改变赞同按钮状态 */
function Voted(btn,voteNum) {
  btn.innerHTML = "已赞同 "+voteNum
  btn.classList.add("is-active");
}
function DisVoted(btn,voteNum) {
  btn.innerHTML = "赞同 "+ voteNum
}
function AskSubmit(btn,color,text){

  btn.style.background = color;
  btn.style.animation = "warningAnm 0.5s ease";
  btn.innerHTML = text;

  let timer = setTimeout(()=>{
    btn.style.background = "0084ff";
    btn.style.animation = "";
    btn.innerHTML = "发布问题";
    clearTimeout(timer);
  },800);
}

/* 检查文件类型 */
function Check_FileType(str) {
  let pos = str.lastIndexOf(".");
  let lastname = str.substring(pos,str.length)  //此处文件后缀名也可用数组方式获得str.split(".")
  if (lastname.toLowerCase()!=".jpg" && lastname.toLowerCase()!=".jpeg" && lastname.toLowerCase()!=".png") {
    alert("您上传的文件类型为"+lastname+"，图片必须为.jpg,.png等类型");
    return false;
  } else {
    return true;
  }
}

/* 时间过滤器 */
function diffTime(date) {
  //console.log(date);
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const yearseconds = 365 * 24 * 60 * 60;// 一年有多少秒
  const monthseconds = 30 * 24 * 60 * 60; //  一个月有多少秒
  const dateseconds = 24 * 60 * 60;// 一天有多少秒

  let interval = 0;

  if (seconds > yearseconds) {
    return createAt(date);
  } else if (seconds > monthseconds) {
    interval = Math.floor(seconds / monthseconds);
    return interval + ' 月前';
  } else if (seconds > dateseconds) {
    interval = Math.floor(seconds / dateseconds);
    return interval + ' 天前';
  } else if (seconds > 3600) {
    interval = Math.floor(seconds / 3600);
    return interval + ' 小时前';
  } else if (seconds > 60) {
    interval = Math.floor(seconds / 60);
    return interval + ' 分钟前';
  } else {
    return '刚刚';
  }
  function createAt (date) {
    let time = new Date(date);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hh = time.getHours();
    let mm = time.getMinutes();
    return year + '年' + month + '月' + day + '日' + ' ' + hh + ':' + mm;
  }
}

function upQstElement(title,describe,parent,id) {
  let input = document.createElement("input"),
    textarea = document.createElement("textarea"),
    btn  = document.createElement("button"),
    divBox = document.createElement("div");
  btn.innerHTML = "更新问题";
  btn.classList.add("Button");
  btn.classList.add("updateQst");
  btn.id = id;
  input.value = title;
  input.className = "upQstIpt";
  textarea.value = describe;
  textarea.className = "upQstArea";
  divBox.className = "UpdateWrapper";
  divBox.appendChild(input);
  divBox.appendChild(textarea);
  divBox.appendChild(btn);
  parent.appendChild(divBox);
}

/* 按钮赞同和踩事件 */
function VoteBtnEvent(){
  getElement(".vote").forEach((btn,index) => {
    btn.addEventListener("click",()=>{
      let ans_id = btn.id;
      dislikeOrVote(ans_id,btn);
    })
    verify.then(data =>{
      getUserVote(data.data._id).then(data => {
        let list = data.data
        console.log(list);
        let currentActive = list.filter(item => item._id === btn.id)
        console.log(currentActive);
        if (currentActive.length > 0) {
          Voted(btn,currentActive[0].voteCount);
        }
      })
    })
  })
  /* 踩 事件 */
  getElement(".disVote").forEach((btn,index) =>{
    let flag = true;
    btn.addEventListener("click",()=>{
      let ans_id = btn.getAttribute("ans_id");
      if(!btn.classList.contains("is-active")){
        dislike(ans_id,btn,flag);
        flag = false;
      }else{
        btn.classList.remove("is-active");
      }
    })
  })
}

/* 搜索防抖 */
function debounce(func,delay){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

export {
  getElement,
  loginOrUpWarning,
  sortQuestion,
  Voted,
  AskSubmit,
  Check_FileType,
  diffTime,
  upQstElement,
  VoteBtnEvent,
  debounce
}
