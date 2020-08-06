import {diffTime} from "../../../../utils/public.js";

function dynamicContent(date,title,editable,describe,q_id) {
  let template = `
  <div class="List-item">
    <div class="List-itemMeta">
      <div class="ActivityItem-meta">
        <span class="ActivityItem-metaTitle">
          添加了问题
        </span>
        <span>${diffTime(date)}</span>
      </div>
    </div>
    <div class="ContentItem AnswerItem">
      <h2 class="ContentItem-title">
        <a href="#/question/${q_id}" style="color:inherit;">${title}</a>
      </h2>
     ${(function () {
  if(editable){
    return ` <div class="RichContent" style="padding: 10px 0px 10px 0px;">
        <span class="RichText">
        ${describe}  
        </span>
      </div>
  <div class="EditQuestion" style="display: flex;justify-content: flex-end;">
  <button id="${q_id}" type="button" class="delBtn Button" style="background: rgb(241,64,60);color:#fff;margin-right: 10px;">删除问题</button>
  <button id="${q_id}" type="button" class="editBtn Button" style="background: #0084ff;color:#fff;" >编辑此问题</button>
</div>
`
  }else{
    return ""
  }
  })()}
    </div>
  </div>
  `
  return template
}
export {
  dynamicContent
}