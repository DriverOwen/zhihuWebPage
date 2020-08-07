import {Ajax} from "../../utils/ajax.js";
import {Cookie} from "../../utils/Cookie.js";
import {getElement,Check_FileType} from "../../utils/public.js";
import {verify} from "../../utils/Verify.js";
import {header} from "../../template/header.js";
import {modal} from "../../template/modal.js";
import {userInfo} from "../user/getInfo.js";
import {HeaderAndModalEvent} from "../public.js";
import {uploadFile} from "../user/upfile.js";

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
      console.log(UserCover);
    }
    return "ok"

  }).catch(err => {
    console.log(err);
  }).then(data =>{
    domEvent();
  })

}
function domEvent() {

  HeaderAndModalEvent();

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

  /* 上传头像事件 */
  let UserAvatar = getElement(".UserAvatar")[0],
    UploadPictureInput = getElement(".UploadPicture-input")[0],
    UserAvatarMask = getElement(".UserAvatarEditor-mask")[0],
    UserAvatarInner = getElement(".UserAvatar-inner")[0];

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

  /* 各个资料更新事件 */

  /* username */
  let username = getElement(".username")[0],
    userEditBtn = getElement(".userEditBtn")[0];
  userEditBtn.onclick = ()=> {
    verify.then(data => {
      if(username.value != ""){
        Aj.patch(`/users/update/${data.data._id}`,{
          username:username.value
        },{
          name:"Authorization",
          value: myCookie.getCookie("token")
        }).then(data => {
          if(data.errno === 0){
            userEditBtn.style.background = "#43d480";
            userEditBtn.innerHTML = "成功";
            setTimeout(()=>{
              window.location.href = "user.html";
            },500)
          }
        })
      }
    })
  }

  /* gender */
  let genderRadio = document.getElementsByName("gender"),
    genderEditBtn = getElement(".genderEditBtn")[0];
  genderEditBtn.onclick = ()=> {
    for (let i=0; i<genderRadio.length; i++) {
      if (genderRadio[i].checked) {
        verify.then(data => {
          Aj.patch(`/users/update/${data.data._id}`,{
            gender:genderRadio[i].value
          },{
            name:"Authorization",
            value: myCookie.getCookie("token")
          }).then(data => {
            if(data.errno === 0){
              genderEditBtn.style.background = "#43d480";
              genderEditBtn.innerHTML = "成功";
              setTimeout(()=>{
                window.location.href = "user.html";
              },500)
            }
          })
        })
      }
    }

  }
  /* headline */
  let headline = getElement(".headline")[0],
    headlineEditBtn = getElement(".headlineEditBtn")[0];
  headlineEditBtn.onclick = ()=> {
    verify.then(data => {
      if(headline.value != ""){
        Aj.patch(`/users/update/${data.data._id}`,{
          headline:headline.value
        },{
          name:"Authorization",
          value: myCookie.getCookie("token")
        }).then(data => {
          if(data.errno === 0){
            headlineEditBtn.style.background = "#43d480";
            headlineEditBtn.innerHTML = "成功";
            setTimeout(()=>{
              window.location.href = "user.html";
            },500)
          }
        })
      }
    })
  }

  /* submitEdit */
  let submitEditBtn = getElement(".submitEditBtn")[0];
  submitEditBtn.onclick = ()=> {
    let gender;
    for (let i=0; i<genderRadio.length; i++) {
      if (genderRadio[i].checked) {
        gender = genderRadio[i].value;
      }
    }
    if(headline.value != "" && username.value != ""){
      verify.then(data => {
        Aj.patch(`/users/update/${data.data._id}`,{
          username:username.value,
          gender:gender,
          headline:headline.value
        },{
          name:"Authorization",
          value: myCookie.getCookie("token")
        }).then(data => {
          if(data.errno === 0){
            submitEditBtn.style.background = "#43d480";
            submitEditBtn.innerHTML = "更新成功";
            setTimeout(()=>{
              window.location.href = "user.html";
            },500)
          }
        })
      })
    }
  }

  /* business */
  // let business = getElement(".business")[0],
  //   businessEditBtn = getElement(".businessEditBtn")[0];
  // businessEditBtn.onclick = ()=> {
  //   verify.then(data => {
  //     if(business.value != ""){
  //       Aj.patch(`/users/update/${data.data._id}`,{
  //         business:headline.value
  //       },{
  //         name:"Authorization",
  //         value: myCookie.getCookie("token")
  //       }).then(data => {
  //         if(data.errno === 0){
  //           businessEditBtn.style.background = "#43d480";
  //           businessEditBtn.innerHTML = "成功";
  //           setTimeout(()=>{
  //             window.location.href = "user.html";
  //           },500)
  //         }
  //       })
  //     }
  //   })
  // }
  }