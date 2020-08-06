import {diffTime} from "../../../utils/public.js";
function commentContent(comment) {
  let template = `
   <ul class="NestComment">
    <li>
      <div class="CommentItemV2">
        <div>
          <div class="CommentItemV2-meta">
              <span class="CommentItemV2-avatar">
                <div class="Popover">
                  <img class="Avatar UserLink-avatar" width="24" height="24" src="${comment.commentator.avatar_url}" alt="usercover">
                </div>
              </span>
            <span class="commentUser">
              ${comment.commentator.username}
            </span>
            
            <span class="CommentItemV2-time">
              ${diffTime(comment.createdAt)}
            </span>
          </div>
          <div class="CommentItemV2-metaSibling">
            <div class="CommentRichText">
              <div class="RichText">
                <p>${comment.content}</p>
              </div>
            </div>
            <div class="CommentItemV2-footer">
              <button disabled="" type="button" class="Button CommentItemV2-likeBtn"><span style="display: inline-flex; align-items: center;">&#8203;<svg class="Zi Zi--Like" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 5px;"><path d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z" fill-rule="evenodd"></path></svg></span>赞</button>
              <button type="button" comment_id="${comment._id}" class="Button"><span style="display: inline-flex; align-items: center;">&#8203;<svg class="Zi Zi--Trash" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 5px;"><path d="M16.464 4s.051-2-1.479-2H9C7.194 2 7.465 4 7.465 4H4.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S5.965 22 7.475 22h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM8.936 18.5l-.581-9h1.802v9H8.936zm4.824 0v-9h1.801l-.61 9H13.76z" fill-rule="evenodd"></path></svg></span>删除</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  `
  return template;
}
export {
  commentContent
}