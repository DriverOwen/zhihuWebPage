/* 返回 主页问题列表 html模板 */
export function questionList(q_title,q_content,q_id,count_ans,voteCount,ans_id,isVote) {
  let template = `
<div class="Card TopstoryItem" q_id="${q_id}">
  <div class="TopstoryItemContent">
    <div class="TopstoryTitle">
      <p>${q_title}</p>
    </div>
  </div>
  <div class="RichContent">
    <div class="RichContent-cover">
      <img src="images/home/cover.jpg" alt="">
    </div>
    <div class="RichContent-inner">
      <span class="RichText">
        ${q_content} 
       </span>
    </div>
    <div class="ContentItem-actions">
      <div>
   ${
    (function(){
        if(count_ans>0){
          let result = "";
          if(isVote){
            result = `<button id="${ans_id}" ans_id="${ans_id}" class="VoteButton vote">
          <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp"
           fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg>
      已赞同<span class="voteNum"> ${voteCount}</span>
        </button>
        <button id="disVote"  class="VoteButton disVote">
          <svg class="Zi Zi--TriangleDown" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z" fill-rule="evenodd"></path></svg>
    
        </button>`
          }else{
            result = `<button id="${ans_id}" ans_id="${ans_id}" class="VoteButton vote">
          <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp"
           fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg>
      赞同<span class="voteNum"> ${voteCount}</span>
        </button>
        <button id="disVote"  ans_id="${ans_id}" class="VoteButton disVote">
          <svg class="Zi Zi--TriangleDown" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z" fill-rule="evenodd"></path></svg>
    
        </button>`
          }
          return result
        }else{
            return '';
        }
    })()
}
      </div>
      <a class="ContentItem-action">
        <span>
          <svg class="Zi Zi--Comment Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z" fill-rule="evenodd"></path></svg>
        </span>
        <span>${count_ans} 条评论</span>
      </a>
      <a class="ContentItem-action">
        <span>
          <svg class="Zi Zi--Share Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z" fill-rule="evenodd"></path></svg>
        </span>
        <span>分享</span>
      </a>
      <a class="ContentItem-action">
        <span>
          <svg class="Zi Zi--Star Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z" fill-rule="evenodd"></path></svg>
        </span>
        <span>收藏</span>
      </a>
      <a class="ContentItem-action">
        <span>
          <svg class="Zi Zi--Heart Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z" fill-rule="evenodd"></path></svg>
        </span>
        <span>喜欢</span>
      </a>
      <a class="ContentItem-action">
        <span>
          <svg class="Zi Zi--Dots Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill-rule="evenodd"></path></svg>
        </span>
      </a>
    </div>
  </div>
</div>
`
  return template;
}