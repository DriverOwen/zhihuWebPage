import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/setCookie.js";
import {getElement} from "../../utils/public.js";


let Aj = new Ajax();
let Ck = new Cookie();

let upSvg = `<svg class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg>`

/* 赞同和取消赞同事件 */

function dislikeOrVote(ans_id,dom) {
    Aj.put(`/users/likingAnswers/${ans_id}`,"",{
      name:"Authorization",
      value: Ck.getCookie("token")
    }).then(data => {
      if(data.errno === -1){
        Aj.put(`/users/dislikingAnswers/${ans_id}`,"",{
          name:"Authorization",
          value: Ck.getCookie("token")
        }).then(data => {
          let count = parseInt(dom.innerText.replace(/[^0-9]/ig,""))
          count--;
          if(count<0) count=0;
          dom.innerHTML = upSvg + " 赞同 " + count;
          dom.classList.remove("is-active");
        })
      }else{
        let count = parseInt(dom.innerText.replace(/[^0-9]/ig,""))
        count += 1;
        dom.innerHTML = "已赞同 " + count;
        dom.classList.add("is-active");
        dom.nextElementSibling.classList.remove("is-active");
      }
      console.log(data);
    })
}

function dislike(ans_id,dom,flag) {
  Aj.put(`/users/dislikingAnswers/${ans_id}`,"",{
    name:"Authorization",
    value: Ck.getCookie("token")
  }).then(data => {
    let count = parseInt(dom.previousElementSibling.innerText.replace(/[^0-9]/ig,""))
      if(dom.previousElementSibling.classList.contains("is-active")){
        count--;
        if(count<0) count=0;
      }
    dom.previousElementSibling.innerHTML = upSvg + " 赞同 " + count;
    dom.previousElementSibling.classList.remove("is-active");
    dom.classList.add("is-active");
  })
}

function getUserVote(_id) {
 return Aj.get(`/users/${_id}/likingAnswers`,"",{
   name:"Authorization",
   value: Ck.getCookie("token")
 })
}
export {
  dislikeOrVote,
  getUserVote,
  dislike
}