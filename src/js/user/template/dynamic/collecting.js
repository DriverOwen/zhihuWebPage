import {diffTime} from "../../../../utils/public.js";

function collecting(date,title,q_id) {
  let template = `
  <div class="List-item">
    <div class="List-itemMeta">
      <div class="ActivityItem-meta">
        <span class="ActivityItem-metaTitle">
          关注了问题
        </span>
        <span>${diffTime(date)}</span>
      </div>
    </div>
    <div class="ContentItem AnswerItem">
      <h2 class="ContentItem-title">
        <a href="#/question/${q_id}" style="color:inherit;">${title}</a>
      </h2>
    </div>
  </div>
  `
  return template
}
export {
  collecting
}