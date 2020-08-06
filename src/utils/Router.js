import {getElement} from "./public.js";
import {questionCard} from "../template/questionCard.js";
import {loadQuestion} from "../js/question/loadQuestions.js";
import {verify} from "./Verify.js";
import {getAns} from "../js/answer/getAnswers.js";
import {dislike, dislikeOrVote, getUserVote} from "../js/liker.js";
import {Voted} from "./public.js";
import {getComments} from "../js/comment/getComment.js";
/* 问题详细页面路由导航 */
function refresh() {
  console.log(location.hash.slice(1));//获取到相应的hash值
  let currentUrl = location.hash.slice(1) || '/';//如果存在hash值则获取到，否则设置hash值为/
  if(currentUrl.substring(0,9) == "/question"){
    let q_id = currentUrl.slice(10);
    let main = getElement("#main")[0];
    let script = document.createElement("script");
    script.type = "module";
    script.src = "js/questionCard.js";
    verify.then(user => {
      loadQuestion(q_id).then(qst => {
        getAns(q_id).then(ans => {
          if(ans.errno === 0 ){
            main.innerHTML = questionCard(user.data,qst.data,ans.data);
            main.appendChild(script);
            return "ok"
          }else{
            main.innerHTML = questionCard(user.data,qst.data,"");
            main.appendChild(script);
            return "ok"
          }
        }).catch(err => {
          console.log(err);
        }).then(data => {
          if(data === "ok"){
            // alert("执行dom");
            getElement(".vote").forEach((btn,index) => {
              btn.addEventListener("click",()=>{
                let ans_id = btn.id;
                dislikeOrVote(ans_id,btn);
              })
              verify.then(data =>{
                getUserVote(data.data._id).then(data => {
                  let list = data.data
                  //console.log(list);
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
            /* 获取评论数 */
            getElement(".commentCount").forEach((CountElement,index) => {
              let q_id = CountElement.parentElement.getAttribute("q_id");
              let ans_id = CountElement.parentElement.getAttribute("ans_id");
              getComments(q_id,ans_id).then(comments => {
                //console.log(comments,"a");
                if(comments.errno === 0 && comments.data.length > 0){
                  CountElement.innerHTML = comments.data.length + " 条评论";
                }else{
                  CountElement.innerHTML = 0 + " 条评论";
                }
              }).catch(err => {
                console.log(err);
              })
            })

            /* 用户关注问题 */


          }
        })
      })
    })
  }
};

window.addEventListener('load', refresh.bind(this), false);
window.addEventListener('hashchange', refresh.bind(this), false);


