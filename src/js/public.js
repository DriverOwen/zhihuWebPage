import {AskSubmit, getElement} from "../utils/public.js";
import {verify} from "../utils/Verify.js";
import {createQuestion} from "./question/putQuestion.js";
import {Cookie} from "../utils/Cookie.js";
let myCookie = new Cookie();

function HeaderAndModalEvent() {
  /* 导航栏tap点击事件 Navbar home event */
  let AppHeaderTabsLink = getElement(".AppHeader-TabsLink");
  AppHeaderTabsLink.forEach((tab,index) => {
    tab.onclick = ()=> {
      for (let Links of AppHeaderTabsLink) {
        Links.classList.remove("is-active");
      }
      tab.classList.add("is-active");
    }
  })

  /*  导航栏搜索栏点击事件 Search Bar hover */
  let askButton = getElement(".SearchBar-askButton")[0],
    SearchBarBox = getElement(".SearchBar-box")[0],
    SearchInput = getElement("#Popover1-toggle")[0],
    iconSearch = getElement(".icon-search")[0];

  SearchInput.onfocus = ()=> {
    askButton.style.opacity = "0";
    askButton.style.transform = "scale(0)";
    SearchBarBox.style.width = "400px";
    SearchBarBox.style.border = "1px solid rgb(132,142,165)";
    SearchBarBox.style.background = "#fff";
    iconSearch.style.color = "#0084ff";
  }
  SearchInput.onblur = ()=> {
    askButton.style.opacity = "1";
    askButton.style.transform = "scale(1)";
    SearchBarBox.style.width = "326px";
    SearchBarBox.style.border = "1px solid #ebebeb";
    SearchBarBox.style.background = "#f6f6f6";
    iconSearch.style.color = "rgb(133,144,166)";
  }

  /*  导航栏滚动切换事件 window scroll*/
  let PageHeader = getElement(".PageHeader")[0],
    AppHeaderInner = getElement(".AppHeader-inner")[0],
    AppHeader = getElement(".AppHeader")[0];
  window.onscroll = ()=> {
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    if(t>0){
      AppHeaderInner.style.transform = "translateY(-100%)";
      PageHeader.style.transform = "translateY(0%)";
      AppHeader.style.position="fixed";
      AppHeader.style.top = 0 + "px";
      AppHeader.style.left = 0 + "px";

    }else{
      AppHeaderInner.style.transform = "translateY(0%)";
      PageHeader.style.transform = "translateY(100%)";
      AppHeader.style.position="relative";
    }
  }

  /*  个人头像点击事件 Float Menu */
  let PopoverMenu = getElement(".Popover-content")[0],
    PopoverArrow = getElement(".Popover-arrow")[0],
    AppHeaderProfile = getElement(".AppHeader-profile")[0],
    MenuBox = getElement(".Menu-box")[0],
    ApFlag = true;

  AppHeaderProfile.onclick = (e)=> {
    e.stopPropagation();
    MenuBox.style.display = "flex";
    let left = AppHeaderProfile.getBoundingClientRect().left,
      top = AppHeaderProfile.getBoundingClientRect().top,
      w = AppHeaderProfile.getBoundingClientRect().width,
      h = AppHeader.getBoundingClientRect().height,
      boxW = PopoverMenu.getBoundingClientRect().width;
    // console.log(PopoverMenu.getBoundingClientRect());
    if(ApFlag){
      PopoverMenu.style.left = left -boxW/2 + w/2 + "px";
      PopoverMenu.style.top = h + 8 + "px";
      PopoverArrow.style.left = boxW/2 + "px";
      // console.log(AppHeaderProfile.getBoundingClientRect());
      ApFlag = !ApFlag;
    }else{
      MenuBox.style.display = "none";
      ApFlag = !ApFlag;
    }
  }


  /* 个人头像子菜单点击事件  menu event */
  let userPage = getElement(".userPage")[0],
    changeInfo = getElement(".changeInfo")[0],
    userLogout = getElement(".userLogout")[0];
  /* enter user page */
    userPage.onclick = ()=> {
      window.location.href = "user.html";
    }
  /* change info  */

  /* logout */
  userLogout.onclick = ()=> {
    myCookie.delCookie("token");
    window.location.href = "index.html";
  }

  /* 提问模态框点击事件  Modal event */
  let ModalCloseButton = getElement(".Modal-closeButton")[0],
    ModalWrapper = getElement(".Modal-wrapper")[0],
    SearchBarSskButton = getElement("#mainAskBtn")[0],
    MiniBtn = getElement("#miniAskBtn")[0],
    Modal = getElement(".Modal")[0],
    ModalBackdrop = getElement(".Modal-backdrop")[0];

  SearchBarSskButton.onclick = (e)=> {
    e.stopPropagation();
    ModalWrapper.style.display = "flex";
    document.body.style.overflowY="hidden";
  }

  ModalCloseButton.onclick = ()=> {
    document.body.style.overflowY="scroll";
    ModalWrapper.style.display = "none";
  }

  MiniBtn.onclick = (e)=> {
    e.stopPropagation();
    ModalWrapper.style.display = "flex";
    document.body.style.overflowY="hidden";
  }

  /* 个人头像和模态框点击取消事件 */
  window.onclick = (e)=> {

    if(e.target == ModalBackdrop ){
      document.body.style.overflowY="scroll";
      ModalWrapper.style.display = "none";
    }else if(e.target != MenuBox && ApFlag == false){
      MenuBox.style.display = "none";
      ApFlag = !ApFlag;
    }
  }

  /* 提问限制事件 AskQuestion events */
  let AskTitleIpt = getElement(".Ask-title-ipt")[0],
    AskTitleWarn = getElement(".Ask-title-warn")[0],
    AskDetailAreas = getElement(".AskDetail-areas")[0],
    AskSubmitBtn = getElement(".Ask-submitBtn")[0],
    AskForm = getElement(".Ask-form")[0];

  AskTitleIpt.onkeyup = ()=> {
    if(AskTitleIpt.value.length < 4){
      AskTitleWarn.innerHTML =  "至少输入 4 个字";
    }else if(AskTitleIpt.value.length > 4){
      let AskValue = AskTitleIpt.value;
      console.log(AskValue.substr(-1));
      if((AskValue.substr(-1) != "?" && AskValue.substr(-1) != "？" ) && AskValue.length > 4){
        AskTitleWarn.innerHTML =  "你还没有给问题添上问号";
        AskSubmitBtn.setAttribute("disabled","disabled");
        AskSubmitBtn.classList.add("disabled");
      }else{
        if(AskDetailAreas.value == ""){
          AskTitleWarn.innerHTML = "请描述你的问题"
        }else{
          AskTitleWarn.innerHTML =  "";
          AskSubmitBtn.removeAttribute("disabled");
          AskSubmitBtn.classList.remove("disabled");
        }
      }
    }
  }

  AskDetailAreas.onkeyup = ()=> {
    if(AskDetailAreas.value.length >0 && AskTitleIpt.value.length >4){
      AskTitleWarn.innerHTML =  "";
      AskSubmitBtn.removeAttribute("disabled");
      AskSubmitBtn.classList.remove("disabled");
    }
  }
  /* 发布问题 */
  AskSubmitBtn.onclick = ()=> {
    verify.then(data => {
      createQuestion(data.data._id,AskTitleIpt.value,AskDetailAreas.value,[]).then(data =>{
        if(data){
          AskSubmit(AskSubmitBtn,"rgb(82,196,26)","发布成功");
          return "close"
        }else{
          AskSubmit(AskSubmitBtn,"#E71D36","创建失败");
        }
      }).then(data => {
        if(data == "close"){
          setTimeout(()=>{
            window.location.reload();
          },500);
        }
      })
    })
  }
}
export {
  HeaderAndModalEvent
}