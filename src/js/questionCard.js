import {Cookie} from "../utils/Cookie.js";
import {getElement} from "../utils/public.js";
import {verify} from "../utils/Verify.js";
import {header} from "../template/header.js";
import {modal} from "../template/modal.js";
import {HeaderAndModalEvent} from "./public.js";
import {putAns} from "./answer/putAns.js";
import {getComments} from "./comment/getComment.js";
import {commentContent} from "./comment/template/comment.js";
import {putComments} from "./comment/putComment.js";
import {collectingQst,getCollectingQst,delCollectingQst} from "./user/userCollect.js";

let myCookie = new Cookie();
/* 网页加载判断事件 判断用户是否登录 window load limitation */
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
    //console.log(data);
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
  HeaderAndModalEvent();
  let WriteAnswerBtn = getElement(".WriteAnswer")[0],
    AnswersWrapper = getElement(".QuestionAnswers-statusWrapper")[0],
    isWrite = false,
    submitAnswer = getElement(".submitAnswer")[0],
    AnsTextarea = getElement(".AnsTextarea")[0];
  /* 回答问题点击事件 */
  WriteAnswerBtn.onclick = ()=> {
    if(isWrite){
      AnswersWrapper.style.animation = "fadeOut 0.3s ease";
      AnswersWrapper.style.display = "none";
      isWrite = !isWrite;
    }else{
      AnswersWrapper.style.display = "block";
      AnswersWrapper.style.animation = "fadeIn 0.3s ease";
      isWrite = !isWrite;
    }
  }

  /* 用户关注问题事件 */

  let FollowButton = getElement(".FollowButton")[0];
  verify.then(data => {
    getCollectingQst(data.data._id).then(data =>{
      // console.log(data,"用户收藏");
      if(data.errno === 0){
        let FollowId = data.data.filter(item => item._id === FollowButton.id);
        if(FollowId.length > 0){
          FollowButton.classList.add("is-follow");
          FollowButton.innerHTML = "已关注";
          return true
        }else{
          FollowButton.classList.remove("is-follow");
          FollowButton.innerHTML = "关注问题";
          return true
        }
      }
    }).catch(err => {
      console.log(err);
    })
  })
  FollowButton.onclick = ()=> {
    if(FollowButton.classList.contains("is-follow")){
      delCollectingQst(FollowButton.id).then(data => {
        if (data.errno === 0){
          FollowButton.classList.remove("is-follow");
          FollowButton.innerHTML = "关注问题";
        }
      })
    }else{
      collectingQst(FollowButton.id).then(data => {
        if (data.errno === 0){
          FollowButton.classList.add("is-follow");
          FollowButton.innerHTML = "已关注";
        }
      })
    }
  }
  /* 用户回答问题事件 */
  AnsTextarea.onkeyup = ()=> {
    if (AnsTextarea.value != ""){
      submitAnswer.classList.remove("disabled");
      //submitAnswer.removeAttribute("disabled");
    }else{
      submitAnswer.classList.add("disabled");
      //submitAnswer.setAttribute("disabled","disabled");
    }
  }

  submitAnswer.onclick = ()=> {
    putAns(submitAnswer.id,AnsTextarea.value).then(data => {
      // console.log("here");
      // console.log(data);
      if(data.errno === 0){
        submitAnswer.style.background = "#58d42f";
        submitAnswer.innerHTML = "成功";
        setTimeout(()=>{
          window.location.reload();
        },500)
      }else{
        alert("评论失败");
      }
    })
  }

  /* 二级评论事件 */
  let commentBtn = getElement(".commentBtn"),
    CommentsContainer = getElement(".Comments-container");

  commentBtn.forEach((btn,index) => {
    let isComment = false;
    let count = btn.querySelector(".commentCount").innerText.match(/\d+/g);
    btn.onclick = ()=> {
      if(isComment){
        CommentsContainer[index].style.display = "none";
        btn.querySelector(".commentCount").innerHTML = count + " 条评论";
        isComment =! isComment;
      }else{
        CommentsContainer[index].style.display = "block";
        btn.querySelector(".commentCount").innerHTML = "收起评论";
        let q_id = btn.getAttribute("q_id");
        let ans_id = btn.getAttribute("ans_id");
        getComments(q_id,ans_id).then(comments => {
          // console.log("comments");
          // console.log(data);
          if(comments.errno === 0){
            CommentsContainer[index].querySelectorAll(".CommentTopbar-title")[0].innerHTML = "共有 " + count + " 人评论";
            let CommentBox = CommentsContainer[index].querySelectorAll(".CommentListV2")[0];
            CommentBox.innerHTML = "";
            comments.data.forEach((comment,index) => {
              CommentBox.innerHTML += commentContent(comment);
            })
            return {q_id,ans_id};
          }
        }).catch(err => {
          console.log(err);
        }).then(data => {
          let CommentSubmit = getElement(".CommentSubmit"),
            CommentIpt = getElement(".CommentIpt");
          if(data){
            CommentSubmit.forEach((btn,index) => {
              let isClick = false;
              CommentIpt[index].onkeyup = ()=> {
                if(CommentIpt[index].value != ""){
                  btn.classList.remove("disabled");
                }else{
                  btn.classList.add("disabled");
                }
              }
              btn.onclick = ()=> {
                putComments(data.q_id,data.ans_id,CommentIpt[index].value).then(data => {
                  if(data.errno === 0){
                    btn.style.background = "#58d42f";
                    btn.innerHTML = "成功";
                    setTimeout(()=>{
                      window.location.reload();
                    },500)
                  }
                })
              }
            })
          }
          //console.log(data+"Aaaa",CommentSubmit);
        })
        isComment =! isComment;
      }
    }
  });

}