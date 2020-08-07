import {getElement,sortQuestion,Voted,AskSubmit,Check_FileType,upQstElement} from "../../utils/public.js";
import {Cookie} from "../../utils/Cookie.js";
import {loadQuestion} from "../question/loadQuestions.js";
import {questionList} from "../../template/question.js";
import {header} from "../../template/header.js";
import {noQuestion} from "../../template/noQuestion.js";
import {getAns} from "../answer/getAnswers.js";
import {dislikeOrVote} from "../liker.js";
import {verify} from "../../utils/Verify.js";
import {createQuestion} from "../question/putQuestion.js";
import {modal} from "../../template/modal.js";
import {HeaderAndModalEvent} from "../public.js";
import {uploadFile} from "./upfile.js";
import {Ajax} from "../../utils/ajax.js";
import {userInfo} from "./getInfo.js";
import {getQst,getLikingAns} from "./dynamic.js";
import {dynamicContent} from "./template/dynamic/question.js";
import {likingAns} from "./template/dynamic/likingAns.js";
import {dislike, getUserVote} from "../liker.js";
import {noDynamic} from "./template/dynamic/noDynamic.js";
import {updateQst} from "./updateQuestion.js";
import {delQst} from "./deleteQuestion.js";
import {getCollectingQst} from "./userCollect.js";
import {collecting} from "./template/dynamic/collecting.js";
/* 网页加载判断事件 判断用户是否登录 window load limitation */
let myCookie = new Cookie(),
  Aj = new Ajax();
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
    modalBox = getElement(".ModalBox")[0],
    UserCover = getElement(".UserCover")[0],
    ProfileHeaderInfo = getElement(".ProfileHeader-info")[0],
    UserAvatarInner = getElement(".UserAvatar-inner")[0];
  verify.then(data => {
    console.log(data);
    headBox.innerHTML = header(data.data.avatar_url);
    modalBox.innerHTML = modal(data.data.avatar_url);
    /* 获取用户信息 */
    UserAvatarInner.src = data.data.avatar_url;
   if(data.data.cover){
     let img = document.createElement("img");
     img.className = "UserCover-image";
     img.src = `${data.data.cover}`;
     UserCover.style.height = 240 + 'px';
     UserCover.appendChild(img);
   }
   let userName = getElement(".ProfileHeader-name")[0],
     userSex = getElement(".ProfileHeader-sex")[0],
     headLine = getElement(".ProfileHeader-headline")[0];
   let employment = data.data.employments,
     educations = data.data.educations || "",
     business = data.data.business || "",
     username = data.data.username || "",
     gender = data.data.gender || "",
     headline = data.data.headline || "";

    userName.innerHTML = username;
    headLine.innerHTML = headline;
    if(gender == "male"){
    // <i class="iconfont icon-ziyuan3"></i>
      userSex.innerHTML = `<i class="iconfont icon-ziyuan3"></i>`;
    }else{
      userSex.innerHTML = `<i class="iconfont icon-ziyuan2"></i>`;
    }
   if(employment.length == 0) employment = "";
    ProfileHeaderInfo.innerHTML = userInfo(employment,educations,business);

    /* 加载用户动态 */
    userDynamic(data.data._id);
    /* 加载用户动态 */
    return "ok"

  }).catch(err => {
    console.log(err);
  }).then(data =>{
    domEvent();
  })

}
/* 用户动态内容加载 */
function userDynamic(userId) {
  let ListContent = getElement(".List-content")[0];
  ListContent.innerHTML = "";
  getQst(userId).then(data => {
    if(data.data.length > 0){
      data.data.forEach(item => {
        ListContent.innerHTML += dynamicContent(item.createdAt,item.title,null,null,item._id);
      })
    }

    getCollectingQst(userId).then(data => {
      if(data.errno === 0 && data.data.length > 0){
        data.data.forEach(item => {
          ListContent.innerHTML += collecting(item.createdAt,item.title,item._id);
        })
      }
    })

    getLikingAns(userId).then(data => {
      let ansData = data;
      // ListContent.innerHTML += likingAns(data.data.createdAt,)
      if(data.data.length > 0){
        data.data.forEach((item,index) => {
          //console.log(item);
          getAns(item.questionId).then(ans => {
            //console.log(ans);
            ans.data.forEach((answer,index) => {
              if(answer._id === item._id){
                //console.log(answer);
                loadQuestion(item.questionId).then(question => {
                  ListContent.innerHTML += likingAns(item.updatedAt,
                    question.data.title,
                    answer.answerer.avatar_url,
                    answer.answerer.username,
                    answer.answerer.headline,
                    item.voteCount,
                    item.content,
                    0,
                    answer._id,
                    answer.questionId);
                  return ListContent
                }).catch(err => {
                  console.log(err);
                }).then(data => {
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
                  /*  */
                })
              }
            })
          }).catch(err => {
            console.log(err);
          })
        })
        return true;
      }
      return false
      console.log(data);
    }).catch(err => {
      console.log(err);
    }).then(data => {
      // if(getElement(".List-item").length === 0){
      //   ListContent.innerHTML = noDynamic("刚来提问网?试试去关注感兴趣的话题");
      // }
    });
    //console.log(data);
  }).catch(err => {
    console.log(err);
  })

  return "";
}
/*  */

function domEvent() {
  HeaderAndModalEvent();
  /* 更新用户cover背景 */
  let UpPicInput = getElement(".UploadPicture-input")[0],
    DynamicBtn = getElement(".DynamicColorButton")[0],
    UserCover = getElement(".UserCover")[0];

  DynamicBtn.onclick = (e)=> {
    UpPicInput.click();
    UpPicInput.onchange = ()=> {
      console.log(UpPicInput.files);
      const upImg = UpPicInput.files[0];
      const formData = new FormData();
      if(Check_FileType(upImg.name)){
        formData.append("file",upImg);
        uploadFile(formData).then(data => {
          if(data.errno === 0){
            let picUrl = data.data.url;
            verify.then(data => {
              let id = data.data._id;
              console.log(picUrl);
              Aj.patch(`/users/update/${id}`,{
                cover:picUrl
              },{
                name:"Authorization",
                value: myCookie.getCookie("token")
              }).then(data => {
                UserCover.innerHTML = "";
                let img = document.createElement("img");
                img.className = "UserCover-image";
                img.src = `${picUrl}`;
                UserCover.style.height = 240 + 'px';
                UserCover.appendChild(img);
              });
            })
          }else{
            alert("上传失败!");
          }
          console.log(data);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }

  /* 更多资料信息点击查看 */
  let expandButton = getElement(".ProfileHeader-expandButton")[0],
    PHcontentBody = getElement(".ProfileHeader-contentBody")[0],
    epBFlag = false;
  expandButton.onclick = ()=> {
    if(epBFlag){
      PHcontentBody.style.height = 52 + 'px';
      expandButton.innerHTML = "<span style=\"display: inline-flex; align-items: center;\">&#8203;<svg class=\"Zi Zi--ArrowDown\" fill=\"currentColor\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z\" fill-rule=\"evenodd\"></path></svg></span>收起详细资料";
      epBFlag = !epBFlag;
    }else{
      PHcontentBody.style.height = 170 + 'px';
      expandButton.innerHTML = "<span style=\"display: inline-flex; align-items: center;\">&#8203;<svg class=\"Zi Zi--ArrowUp\" fill=\"currentColor\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 11l-3.716 3.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l4.249-4.512a.758.758 0 0 1 1.064 0l4.246 4.512a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063 0L12.002 11z\" fill-rule=\"evenodd\"></path></svg></span>收起详细资料";
      epBFlag = !epBFlag;
    }
  }

  /* 上传头像事件 */
  let UserAvatar = getElement(".UserAvatar")[0],
    UploadPictureInput = getElement(".UploadPicture-input")[0],
    UserAvatarMask = getElement(".UserAvatarEditor-mask")[0],
    UserAvatarInner = getElement(".UserAvatar-inner")[0];
  UserAvatar.onmousemove = ()=> {
    UserAvatarMask.classList.remove("Mask-hidden");
  }
  UserAvatarMask.onmouseleave = ()=> {
    UserAvatarMask.classList.add("Mask-hidden");
  }
  UserAvatarMask.onclick = ()=> {
    UploadPictureInput.click();
    UploadPictureInput.onchange = ()=> {
      console.log(UploadPictureInput.files);
      const upImg = UploadPictureInput.files[0];
      const formData = new FormData();
      if(Check_FileType(upImg.name)){
        formData.append("file",upImg);
        uploadFile(formData).then(data => {
          if(data.errno === 0){
            let Url = data.data.url;
            verify.then(data => {
              let id = data.data._id;
              console.log(Url);
              Aj.patch(`/users/update/${id}`,{
                avatar_url:Url
              },{
                name:"Authorization",
                value: myCookie.getCookie("token")
              }).then(data => {
                UserAvatarInner.src = `${Url}`;
              });
            })
          }else{
            alert("上传失败!");
          }
          console.log(data);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }

  /* tab点击切换事件 */
  let ProfileTabs = getElement(".Tabs-item");
  let ListContent = getElement(".List-content")[0],
    ListHeaderText = getElement(".List-headerText")[0];
  // console.log(ProfileTabs);
  ProfileTabs.forEach((item,index) => {

    item.onclick = ()=> {
      for (let tab of ProfileTabs) {
        tab.children[0].classList.remove("is-active");
      }
      item.children[0].classList.add("is-active");
      switch (index) {
        case 0:
          /* 动态 */
          ListHeaderText.children[0].innerHTML = "我的动态";
          verify.then(data => {
            /* 判断是否有空 */
            ListContent.innerHTML = userDynamic(data.data._id);
          })
          break;
        case 1:
          /* 回答 */
          ListHeaderText.children[0].innerHTML = "我的回答";
          verify.then(data => {
            /* 判断是否有空 */
            ListContent.innerHTML = "";
            ListContent.innerHTML = LikingAns();
              function LikingAns() {
                getLikingAns(data.data._id).then(data => {
                  let ansData = data;
                  // ListContent.innerHTML += likingAns(data.data.createdAt,)
                  if(data.data.length > 0){
                    data.data.forEach((item,index) => {
                      //console.log(item);
                      getAns(item.questionId).then(ans => {
                        //console.log(ans);
                        ans.data.forEach((answer,index) => {
                          if(answer._id === item._id){
                            //console.log(answer);
                            loadQuestion(item.questionId).then(question => {
                              ListContent.innerHTML += likingAns(item.updatedAt,
                                question.data.title,
                                answer.answerer.avatar_url,
                                answer.answerer.username,
                                answer.answerer.headline,
                                item.voteCount,
                                item.content,
                                0,
                                answer._id);
                              return ListContent
                            }).catch(err => {
                              console.log(err);
                            }).then(data => {
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
                              /*  */
                            })
                          }
                        })
                      }).catch(err => {
                        console.log(err);
                      })
                    })
                    return true;
                  }else{
                    ListContent.innerHTML = noDynamic("还没点赞任何的回答，赶紧去查找你需要的问题看看吧!");
                  }
                  return false
                  //console.log(data);
                }).catch(err => {
                  console.log(err);
                });
                return "";
              }
          })
          break;
        case 2:
          /* 提问 */
          ListHeaderText.children[0].innerHTML = "我的提问";
          verify.then(data => {
            /* 判断是否有空 */
            ListContent.innerHTML = "";
            getQuestion();
            function getQuestion() {
              getQst(data.data._id).then(data => {
                if(data.data.length > 0){
                  data.data.forEach(item => {
                    ListContent.innerHTML += dynamicContent(item.createdAt,item.title,true,item.description,item._id);
                  })
                }else{
                  ListContent.innerHTML = noDynamic("还没有发布任何问题，赶紧去发布吧!");
                }
                //console.log(data);
              }).catch(err => {
                console.log(err);
              }).then(data => {
                /* 编辑更新问题 */
                let editBtns = getElement(".editBtn"),
                  listItem = getElement(".List-item"),
                ItemTitle = getElement(".ContentItem-title"),
                  RichText = getElement(".RichText"),
                  delBtn = getElement(".delBtn");

                editBtns.forEach((btn,index) => {
                  let btnFlag = false;
                  btn.onclick = ()=> {
                    if(!btnFlag){
                      upQstElement(ItemTitle[index].innerText,RichText[index].innerText,listItem[index],btn.id);
                      btnFlag = true;
                    }else{
                      let UpdateWrapper = listItem[index].lastChild;
                      listItem[index].removeChild(UpdateWrapper);
                      btnFlag = false;
                    }
                    let upBtn = getElement(".updateQst"),
                      upQstIpt = getElement(".upQstIpt")[0],
                      upQstArea = getElement(".upQstArea")[0];

                    upBtn.forEach((btn,index)=>{
                      btn.onclick = ()=> {
                        if(upQstIpt.value != "" && upQstArea.value != ""){
                          updateQst(btn.id,upQstIpt.value,upQstArea.value).then(data => {
                            if(data.errno === 0){
                              btn.innerHTML = "更新成功";
                              btn.style.background = "#43d480";
                              setTimeout(()=>{
                                let UpdateWrapper = listItem[index].lastChild;
                                listItem[index].removeChild(UpdateWrapper);
                                window.location.reload();
                              },500);
                            }else{
                              alert("更新失败");
                            }
                          })
                        }else{
                          alert("请补充完整问题的标题和描述");
                        }
                      }
                    })
                  }
                });
                delBtn.forEach((btn,index) => {
                  btn.onclick = ()=> {
                    delQst(btn.id).then(data => {
                      if(data.errno === 0 ){
                        listItem[index].style.opacity = "0.5";
                        btn.style.background = "#43d480";
                        btn.innerHTML = "删除成功";
                        setTimeout(()=>{
                          window.location.reload();
                        },500);
                      }else{
                        alert("删除失败");
                      }
                    })
                  }
                })
              })
              return "";
            }
          })
          break;
      }
    }
  })
}
