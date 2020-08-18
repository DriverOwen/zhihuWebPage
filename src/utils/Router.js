import {getElement} from "./public.js";
import {questionCard} from "../template/questionCard.js";
import {loadQuestion} from "../js/question/loadQuestions.js";
import {verify} from "./Verify.js";
import {getAns} from "../js/answer/getAnswers.js";
import {dislike, dislikeOrVote, getUserVote} from "../js/liker.js";
import {Voted} from "./public.js";
import {getComments} from "../js/comment/getComment.js";
import {VoteBtnEvent} from "./public.js";
/* 问题详细页面路由导航 （没有抽离业务 整个项目目前只有问题路由导航） */
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
            /* 赞和踩功能 */
            VoteBtnEvent();
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

          }
        })
      })
    })
  }
};

window.addEventListener('load', refresh.bind(this), false);
window.addEventListener('hashchange', refresh.bind(this), false);


