import {getElement,sortQuestion,Voted,AskSubmit} from "../../utils/public.js";
import {Cookie} from "../../utils/Cookie.js";
import {loadQuestion} from "../question/loadQuestions.js";
import {questionList} from "../../template/question.js";
import {header} from "../../template/header.js";
import {noQuestion} from "../../template/noQuestion.js";
import {getAns} from "../answer/getAnswers.js";
import {dislikeOrVote,getUserVote,dislike} from "../liker.js";
import {verify} from "../../utils/Verify.js";
import {createQuestion} from "../question/putQuestion.js";
import {modal} from "../../template/modal.js";
import {HeaderAndModalEvent} from "../public.js";
/* 网页加载判断事件 判断用户是否登录 window load limitation */
let myCookie = new Cookie();
window.onload = ()=> {
  if(myCookie.getCookie("token")){

  }else {
    document.location.href = "index.html";
  }
}

/* 监听dom加载情况 */
new Promise((resolve, reject) => {
  let timer = setInterval(()=>{
    if(document && document.getElementsByTagName && document.getElementById && document.body)
    {
      initDom();
      clearInterval(timer);
      resolve("dom ok");
    }
  },10)
})

function initDom() {
  /* 加载header modal */
  let headBox = getElement(".headerBox")[0],
    modalBox = getElement(".ModalBox")[0];
  verify.then(data => {
    console.log(data);
    headBox.innerHTML = header(data.data.avatar_url);
    modalBox.innerHTML = modal(data.data.avatar_url);
    return "ok"
  }).catch(err => {
    console.log(err);
  }).then(data =>{
    domEvent();
  })

}


function domEvent() {
  /* 加载question列表 */
  let TopstoryBox = getElement(".TopstoryBox")[0];
  /* 初始化问题列表 同时监听 按钮事件 */
  loadQuestion().then(data => {
    console.log(data.data.length)
    let length = data.data.length;
    let result,
      isVote;
    if(length == 0){
      /* 问题列表为0 返回无问题模板 */
      TopstoryBox.innerHTML = noQuestion();
    }else{
      /* 初始化问题的默认回答 */
      for (let i = 0;i < data.data.length;i++){
        result = getAns(data.data[i]._id).then(ans => {
          // console.log(ans);
          if(ans.data.length == 0){
            TopstoryBox.innerHTML += questionList(data.data[i].title,
              `暂时没有任何人回答该问题，赶紧去试试!`,
              data.data[i].createdAt,
              0,
              0,
              "",
              isVote,
              data.data[i]._id);
          }else{
            TopstoryBox.innerHTML += questionList(data.data[i].title,
              `${ans.data[0].answerer.username}:&nbsp;&nbsp;${ans.data[0].content}`.substring(0,97)+"...",
              data.data[i].createdAt,
              ans.data.length,
              ans.data[0].voteCount,
              ans.data[0]._id,
              isVote,
              data.data[i]._id);
          }
          return getElement(".TopstoryItem")
        }).then(data => {
          if(data.length == length){
            sortQuestion(data);
            /* 赞同 和 取消 事件 */
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
        })
      }
    }
    return result
  }).catch(err => {
    console.log(err);
  })

  HeaderAndModalEvent();
  /*  */
}
