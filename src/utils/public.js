/* 定义公共方法 */

/* get html dom element */
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

export {
  getElement,
  loginOrUpWarning,
  sortQuestion,
  Voted,
  AskSubmit
}
