import {diffTime} from "../utils/public.js";

function questionCard(user,question,answers) {
  let template = `
  <div class="QuestionPage">
      <div class="QstInfo">
        <div>
          <div class="QuestionHeader">
            <div class="QuestionHeader-content">
              <div class="QuestionHeader-main">
                <div class="Tag">无标签</div>
                <h1 class="QuestionHeader-title">${question.title}</h1>
                <p style="margin: 8px 0px;">${question.description ? question.description : "暂无关于问题的更多描述..."}</p>
              </div>
              <div class="QuestionHeader-side">
                <div class="QuestionHeader-follow-status">
                  <div class="QuestionFollowStatus">
                    <div class="QuestionFollowStatus-counts">
                      <div class="NumberBoard-item">
                        <div class="NumberBoard-itemInner">
                          <div class="NumberBoard-itemName">
                            关注者
                          </div>
                          <strong class="NumberBoard-itemValue">0</strong>
                        </div>
                      </div>
                      <div class="NumberBoard-item" style="border-left: 1px solid #ebebeb;">
                        <div class="NumberBoard-itemInner">
                          <div class="NumberBoard-itemName">
                            被浏览
                          </div>
                          <strong class="NumberBoard-itemValue">13</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="QuestionHeader-footer">
              <div class="QuestionHeader-footer-inner">
                <div class="QuestionHeader-footer-main">
                  <div class="QuestionButtonGroup">
                    <button type="button" class="Button FollowButton" id="${question._id}">关注问题</button>
                    <button type="button" class="Button WriteAnswer"><span style="display: inline-flex; align-items: center;">&#8203;<svg style="margin-right: 4px" fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M4.076 16.966a4.19 4.19 0 0 1 1.05-1.76l8.568-8.569a.524.524 0 0 1 .741 0l2.928 2.927a.524.524 0 0 1 0 .74l-8.568 8.57c-.49.49-1.096.852-1.761 1.051l-3.528 1.058a.394.394 0 0 1-.49-.488l1.06-3.53zM20.558 4.83c.59.59.59 1.546 0 2.136l-1.693 1.692a.503.503 0 0 1-.712 0l-2.812-2.812a.504.504 0 0 1 0-.712l1.693-1.693a1.51 1.51 0 0 1 2.135 0l1.389 1.389z"></path></svg></span>写回答</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Question-main">
        <div class="Question-mainColumn">
          <div>
            <div class="QuestionAnswers-statusWrapper">
              <div class="QuestionAnswers-answerAdd">
                <div class="AnswerAdd">
                  <div class="AnswerAdd-header">
                    <div class="AnswerAdd-info">
                      <span class="AuthorInfo-avatarWrapper">
                        <img  width="38" height="38" src="${user.avatar_url}" alt="username" class="AuthorInfo-avatar">
                      </span>
                      <div class="AuthorInfo-content">
                        <div class="AuthorInfo-head">
                          <span class="AuthorInfo-name">
                            ${user.username}
                          </span>
                          <div class="AuthorInfo-detail">
                            <div class="AuthorInfo-badge">
                              <span class="AnswerAdd-bio">${user.headline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="AnswerContent">
                    <textarea class="AnsTextarea" placeholder="请输入您的回答" name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div class="AnswerBtn">
                    <button type="button" id="${question._id}" class="Button submitAnswer disabled">提交</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="QuestionAnswers-answers">
              <div class="Card AnswersNavWrapper">
                <div class="ListShortcut">
                  <div class="List ProfileActivities">
                    <div class="List-content">
                      ${
    (function () {
      if(answers.length > 0){
        let result = "";
        for (let answer of answers){
          result += `<div class="List-item">
                        <div class="ContentItem AnswerItem">
                          <div class="ContentItem-meta">
                            <div class="AuthorInfo">
                              <span class="AuthorInfo-avatarWrapper">
                                <div class="Popover">
                                  <a href="javascript:void(0);" class="UserLink-link">
                                    <img width="38" height="38" src="${answer.answerer.avatar_url}" class="Avatar AuthorInfo-avatar" alt="">
                                  </a>
                                </div>
                              </span>
                              <div class="AuthorInfo-content">
                                <div class="AuthorInfo-head">
                                  <span class="UserLink AuthorInfo-name">
                                    ${answer.answerer.username}
                                  </span>
                                </div>
                                <div class="AuthorInfo-detail">
                                  <div class="AuthorInfo-badge">
                                   ${answer.answerer.headline}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="vote-details">
                              <span>
                                <span class="Voters">
                                <button type="button" class="Button">${answer.voteCount} 人赞同了回答</button>
                                </span>
                              </span>
                            </div>
                          </div>
                          <div class="RichContent">
                            <div class="RichContent-inner">
                              <span class="RichText">
                                ${answer.content}
                               </span>
                            </div>
                            <div class="createdAt">
                              <span>
                                 ${diffTime(answer.createdAt)}
                              </span>
                            </div>
                            <div class="ContentItem-actions">
                              <div>
                               <button id="${answer._id}" ans_id="${answer._id}" class="VoteButton vote">
                                <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp"
                                     fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg>
                                赞同<span class="voteNum"> ${answer.voteCount}</span>
                              </button>
                                <button id="disVote" ans_id="${answer._id}" class="VoteButton disVote">
                                  <svg class="Zi Zi--TriangleDown" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z" fill-rule="evenodd"></path></svg>
                                </button>
                              </div>
                              <a class="ContentItem-action commentBtn" q_id="${question._id}" ans_id="${answer._id}">
                                <span>
                                  <svg class="Zi Zi--Comment Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z" fill-rule="evenodd"></path></svg>
                                </span>
                                <span class="commentCount">评论</span>
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
                          <div class="Comments-container">
                            <div class="CommentsV2">
                              <div class="CommentTopbar">
                                <div class="Topbar-title">
                                  <h2 class="CommentTopbar-title">
                                    一共有人评论
                                  </h2>
                                </div>
                              </div>
                              <div>
                                <div class="CommentListV2">
                
</div>
                              </div>
                              <div>
                                <div class="CommentsV2-footer">
                                  <div class="CommentEditorV2-inputWrap">
                                    <div class="CommentEditorV2-input">
                                      <input type="text" class="CommentIpt" placeholder="写下你的评论...">
                                    </div>
                                    <div class="CommentSubmitBtn">
                                      <button type="button" class="Button disabled CommentSubmit">发布</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`
        }
        return result;
      }else{
        return `<div class="List-item">
<p>暂时没有回答，赶紧来试试！</p>
</div>`
      }
    })()  
  }
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Question-sideColumn">
          <div class="GlobalSideBar">
            <div>
              <div class="Sticky">
                <div class="Card NewGlobalWrite">
                  <div class="NewGlobalWrite-navTop">
                    <a href="javascript:void(0);" class="NewGlobalWrite-topItem">
                      <svg width="40" height="40" viewBox="0 0 40 40" class="NewGlobalWrite-navIcon" fill="currentColor"><g fill="#0084FF" fill-rule="evenodd"><circle cx="20" cy="20" r="20" opacity=".12"></circle><path d="M23.487 10.463c1.896 0 2.583.193 3.277.555a3.824 3.824 0 0 1 1.607 1.573c.371.678.569 1.35.569 3.206v8.472c0 1.855-.198 2.527-.569 3.205a3.824 3.824 0 0 1-1.607 1.573c-.694.363-1.381.556-3.277.556h-6.96c-1.895 0-2.583-.193-3.276-.556a3.824 3.824 0 0 1-1.608-1.573c-.37-.678-.568-1.35-.568-3.205v-8.472c0-1.855.197-2.528.568-3.206.37-.678.915-1.21 1.608-1.573.693-.362 1.38-.556 3.277-.556h6.959zm0 2.08h-6.96c-1.407 0-1.836.081-2.273.31a1.72 1.72 0 0 0-.735.72c-.234.427-.317.847-.317 2.224v8.472c0 1.377.083 1.796.317 2.224.172.316.412.551.735.72.437.229.866.31 2.274.31h6.959c1.407 0 1.836-.081 2.274-.31a1.72 1.72 0 0 0 .735-.72c.234-.428.317-.847.317-2.224v-8.472c0-1.377-.083-1.797-.317-2.225a1.72 1.72 0 0 0-.735-.72c-.438-.228-.867-.309-2.274-.309zm-1.991 9.778v1.873h-5.955V22.32h5.955zm2.977-3.328v1.872h-8.932v-1.872h8.932zm0-3.33v1.873h-8.932v-1.872h8.932z" fill-rule="nonzero"></path></g></svg>
                      <div class="NewGlobalWrite-topTitle">回答问题</div>
                    </a>
                    <a href="javascript:void(0);" class="NewGlobalWrite-topItem">
                      <svg width="40" height="40" viewBox="0 0 40 40" class="NewGlobalWrite-navIcon" fill="currentColor"><g fill="#FF9607" fill-rule="evenodd"><circle cx="20" cy="20" r="20" opacity=".12"></circle><path d="M24.233 24.777v-9.555c0-.942-.748-1.706-1.67-1.706H13.61c-.922 0-1.67.764-1.67 1.707v9.554c0 .943.748 1.707 1.67 1.707h8.954c.921 0 1.669-.764 1.669-1.707zm3.478-10.349a2.302 2.302 0 0 1 3.297.243c.367.434.57.989.57 1.563v7.532c0 1.32-1.047 2.389-2.337 2.389a2.308 2.308 0 0 1-1.53-.583l-1.475-1.306v.512c0 2.073-1.644 3.753-3.672 3.753H13.61c-2.028 0-3.672-1.68-3.672-3.753v-9.555c0-2.074 1.644-3.754 3.672-3.754h8.954c2.028 0 3.672 1.68 3.672 3.754v.51l1.475-1.305zm-1.475 7.13l2.786 2.466a.33.33 0 0 0 .219.083.338.338 0 0 0 .334-.341v-7.532a.346.346 0 0 0-.082-.223.329.329 0 0 0-.47-.035l-2.787 2.466v3.116z" fill-rule="nonzero"></path></g></svg>
                      <div class="NewGlobalWrite-topTitle">发视频</div>
                    </a>
                    <a href="javascript:void(0);" class="NewGlobalWrite-topItem">
                      <svg width="40" height="40" viewBox="0 0 40 40" class="NewGlobalWrite-navIcon" fill="currentColor"><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="#F4C807" opacity=".12"></circle><path d="M6 6h28v28H6z"></path><path fill="#F4C807" d="M20.406 11.772l-2.172 2.176h-2.29c-1.438 0-1.875.085-2.322.324-.33.176-.575.422-.751.752-.24.448-.324.886-.324 2.326v7.12c0 1.44.085 1.878.324 2.326.176.33.421.576.75.752.421.225.834.314 2.08.323l7.35.001c1.438 0 1.876-.084 2.323-.324.33-.176.575-.422.751-.752.24-.448.324-.886.324-2.326v-4.905l2.172-2.175v7.08c0 1.94-.202 2.643-.58 3.352a3.95 3.95 0 0 1-1.643 1.645c-.708.379-1.41.58-3.346.58h-7.108c-1.936 0-2.639-.201-3.347-.58a3.95 3.95 0 0 1-1.642-1.645c-.378-.71-.58-1.413-.58-3.352v-7.12c0-1.94.202-2.643.58-3.352a3.95 3.95 0 0 1 1.642-1.645c.708-.379 1.41-.58 3.347-.58h4.462zm6.908-2.053c.384.116.747.338 1.168.759l.188.189c.42.421.642.785.758 1.17a1.98 1.98 0 0 1 0 1.163c-.116.385-.337.749-.758 1.17l-6.9 6.911c-.62.622-.827.81-1.078 1.004-.251.193-.496.34-.784.47-.288.131-.553.226-1.392.48l-1.088.332a1.303 1.303 0 0 1-1.625-1.629l.33-1.09c.255-.84.35-1.104.48-1.393.13-.29.277-.534.47-.785.193-.252.381-.46 1.001-1.081l6.9-6.911c.42-.421.784-.643 1.168-.76a1.97 1.97 0 0 1 1.162 0zm-3.204 4.096l-4.797 4.805c-.547.548-.709.723-.852.91-.112.146-.19.276-.265.443-.097.214-.175.44-.4 1.182l-.094.31.31-.095c.74-.225.965-.303 1.179-.4.167-.076.297-.154.442-.266.187-.143.361-.305.909-.853l4.797-4.805-1.23-1.23zm2.546-2.43c-.109.033-.23.11-.443.324l-.874.875 1.228 1.231.875-.876c.213-.213.29-.334.323-.444a.24.24 0 0 0 0-.153c-.033-.11-.11-.23-.323-.445l-.189-.188c-.213-.214-.334-.291-.443-.325a.238.238 0 0 0-.154 0z" fill-rule="nonzero"></path></g></svg>
                      <div class="NewGlobalWrite-topTitle">写文章</div>
                    </a>
                    <a href="javascript:void(0);" class="NewGlobalWrite-topItem">
                      <svg width="40" height="40" viewBox="0 0 40 40" class="NewGlobalWrite-navIcon" fill="currentColor"><g fill="#26BFBF" fill-rule="evenodd"><circle cx="20" cy="20" r="20" opacity=".12"></circle><path d="M21.987 11.686v2.169h-6.125c-1.43 0-1.863.064-2.297.306-.332.128-.574.383-.74.702-.255.447-.332.893-.332 2.297v7.018c0 1.442.09 1.876.332 2.297.166.345.408.587.74.766.434.23.868.319 2.297.319h7.018c1.43 0 1.863-.077 2.297-.32.345-.165.587-.408.766-.74.216-.408.296-.816.305-2.054l.001-6.316.025.025h2.17v6.074c0 1.914-.217 2.616-.587 3.318a3.92 3.92 0 0 1-1.634 1.62c-.689.383-1.403.575-3.317.575h-7.018c-1.915 0-2.616-.204-3.318-.575a3.891 3.891 0 0 1-1.62-1.62c-.384-.702-.575-1.404-.575-3.318v-7.018c0-1.914.204-2.629.574-3.318a3.996 3.996 0 0 1 1.62-1.633c.703-.383 1.404-.574 3.318-.574h6.1zm1.889 6.954c1.059 1.06 1.059 2.807 0 3.88l-.039.038a2.719 2.719 0 0 1-3.879 0l-2.45-2.553a.801.801 0 0 0-1.123 0l-.05.052c-.32.357-.32.893 0 1.212a.75.75 0 0 0 .726.217c.51-.128 1.047.23 1.149.74a.946.946 0 0 1-.727 1.148 2.649 2.649 0 0 1-2.527-.74 2.796 2.796 0 0 1 0-3.905l.038-.025c1.098-1.085 2.808-1.085 3.892 0l2.463 2.488a.764.764 0 0 0 1.11 0l.038-.025a.855.855 0 0 0 0-1.187.876.876 0 0 0-.74-.217c-.51.128-1.02-.204-1.148-.727-.128-.51.204-1.021.727-1.149l.013-.013a2.703 2.703 0 0 1 2.527.766zm4.338-9.315v2.578h2.578v1.722h-2.578v2.59h-1.723v-2.602h-2.59v-1.71h2.59V9.325h1.723z" fill-rule="nonzero"></path></g></svg>
                      <div class="NewGlobalWrite-topTitle">写想法</div>
                    </a>
                  </div>
                  <div class="NewGlobalWrite-navBottom">
                    <a href="javascript:void(0);" class="GlobalWriteAnswerLater NewGlobalWrite-answerLater">
                      <div class="NewGlobalWrite-navWrapper">
                        <div class="NewGlobalWrite-navTitle">
                          稍后答
                        </div>
                      </div>
                    </a>
                    <a href="javascript:void(0);" class="GlobalWriteAnswerLater NewGlobalWrite-answerLater">
                      <div class="NewGlobalWrite-navWrapper">
                        <div class="NewGlobalWrite-navTitle">
                          草稿箱
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="Card CreatorEntrance">
                  <a href="javascript:void(0);" class="CreatorEntrance-link">
                    <div class="CreatorEntrance-hint">
                      <svg class="Zi Zi--Creator CreatorEntrance-creator" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M15.075 15.388l-3.024 3.024a4.041 4.041 0 0 0-1.014 1.697l-.26.868C7.844 20.986 4.91 21 2 21c.026-3.325 0-3.304.59-3.956 1.237-1.368 6.251-.68 6.44-2.976.043-.518-.36-1.06-.725-1.69C6.285 8.87 5.512 2 11.5 2c5.988 0 5.15 7.072 3.246 10.378-.357.62-.795 1.217-.724 1.77.073.571.477.958 1.053 1.24zm5.402 1.672c.523.55.523.646.523 3.94a535.11 535.11 0 0 0-4.434-.028l3.911-3.912zm-7.88 2.699c.111-.37.312-.705.584-.978l4.76-4.76a.291.291 0 0 1 .412 0l1.626 1.626a.291.291 0 0 1 0 .411l-4.76 4.76c-.272.273-.608.474-.978.585l-1.96.588a.219.219 0 0 1-.272-.272l.589-1.96zm9.157-6.742a.839.839 0 0 1 0 1.187l-.94.94a.28.28 0 0 1-.395 0l-1.563-1.563a.28.28 0 0 1 0-.395l.94-.94a.839.839 0 0 1 1.187 0l.771.771z" fill-rule="evenodd"></path></svg>
                      <div class="CreatorEntrance-text">
                        <div>
                          创作中心
                          <span>去开通</span>
                        </div>
                      </div>
                      <svg class="Zi Zi--ArrowRight CreatorEntrance-arrow CreatorEntrance-arrow--smallIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg>
                    </div>
                  </a>
                </div>
                <div class="Card Info-bottom">
                  <ul class="GlobalSideBar-navList">
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--Star GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">我的收藏</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--HelpBubble GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M5.74 4h12.52c.961 0 1.74.775 1.74 1.73V16.27c0 .955-.779 1.73-1.74 1.73h-3.825l-1.658 2.044a1 1 0 0 1-1.554 0l-1.658-2.044H5.74C4.78 18 4 17.224 4 16.27V5.73C4 4.775 4.778 4 5.74 4zM12 16a.976.976 0 0 0 .705-.287.951.951 0 0 0 .295-.712.954.954 0 0 0-.295-.714A.976.976 0 0 0 12 14a.962.962 0 0 0-.705.295A.961.961 0 0 0 11 15c0 .284.098.522.295.713A.975.975 0 0 0 12 16zm1.278-4.924a36.81 36.81 0 0 0 1.023-.975c.19-.193.354-.422.492-.688.138-.266.207-.575.207-.928 0-.448-.12-.864-.363-1.246a2.517 2.517 0 0 0-1.029-.906C13.164 6.111 12.652 6 12.072 6c-.624 0-1.17.133-1.638.399-.468.265-.824.6-1.068 1.005-.244.405-.366.804-.366 1.2 0 .19.077.368.231.531a.747.747 0 0 0 .567.246c.38 0 .638-.234.774-.703.144-.449.32-.788.528-1.019.208-.23.532-.345.972-.345.376 0 .683.114.921.342.238.229.357.51.357.841 0 .17-.039.328-.117.473a1.782 1.782 0 0 1-.288.396c-.114.118-.3.294-.555.526a9.71 9.71 0 0 0-.696.688c-.172.194-.31.418-.414.673a2.391 2.391 0 0 0-.156.906c0 .278.071.488.213.63a.716.716 0 0 0 .525.211c.4 0 .638-.216.714-.648.044-.203.077-.345.099-.426.022-.081.053-.162.093-.243.04-.081.101-.17.183-.268.082-.098.191-.21.327-.34z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">我关注的问题</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--Invite GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M4 10V8a1 1 0 1 1 2 0v2h2a1 1 0 0 1 0 2H6v2a1 1 0 0 1-2 0v-2H2a1 1 0 0 1 0-2h2zm10.455 2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7 6c0-2.66 4.845-4 7.272-4C17.155 14 22 15.34 22 18v1.375c0 .345-.28.625-.625.625H8.08a.625.625 0 0 1-.625-.625V18z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">我的邀请</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--Balance GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M19 19.5H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2zm0-12a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3.75c1 0 1 2 2.75 2s1.75-2 2.75-2h3.75a.5.5 0 0 0 .5-.5v-2z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">我的余额</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--Community GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M5.74 4h12.52c.961 0 1.74.775 1.74 1.73V16.27c0 .955-.779 1.73-1.74 1.73h-3.825l-1.658 2.044a1 1 0 0 1-1.554 0l-1.658-2.044H5.74C4.78 18 4 17.224 4 16.27V5.73C4 4.775 4.778 4 5.74 4zM7 8.98c0 .554.449.996 1.003.996h4.994A.992.992 0 0 0 14 8.981a.997.997 0 0 0-1.003-.995H8.003A.992.992 0 0 0 7 8.98zm0 4c0 .554.446.996.995.996h8.01a.993.993 0 0 0 .995-.995.993.993 0 0 0-.995-.995h-8.01A.993.993 0 0 0 7 12.98z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">站务中心</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg width="18" height="18" viewBox="0 0 18 18" class="GlobalSideBar-navIcon" fill="currentColor"><path d="M9 1.5c2.835 0 5.152 2.195 5.247 4.949l.003.176v.253A2.25 2.25 0 0 1 15.75 9v2.25a2.25 2.25 0 0 1-1.5 2.122v.257c0 .547-.2 1.073-.557 1.482l-.102.109-1.06 1.06a.75.75 0 0 1-1.124-.99l.063-.07 1.06-1.061a.75.75 0 0 0 .213-.432l.007-.098V13.5H12a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 .75-.75h.75v-.125C12.75 4.628 11.076 3 9 3 6.98 3 5.34 4.541 5.254 6.464l-.004.286H6a.75.75 0 0 1 .743.648l.007.102v5.25a.75.75 0 0 1-.648.743L6 13.5H4.5a2.25 2.25 0 0 1-2.245-2.096l-.005-.154V9c0-.98.626-1.814 1.5-2.122v-.253C3.75 3.79 6.105 1.5 9 1.5z" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">帮助中心</span>
                      </a>
                    </li>
                    <li class="GlobalSideBar-navItem">
                      <a href="javascript:void(0);" class="GlobalSideBar-navLink">
                        <svg class="Zi Zi--Copyright GlobalSideBar-navIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M16.517 15.815a5.871 5.871 0 0 1-4.481 2.078 5.865 5.865 0 0 1-5.859-5.857 5.865 5.865 0 0 1 5.859-5.859c1.63 0 3.204.7 4.319 1.919.085.093.24.432.209.797a1.086 1.086 0 0 1-.436.779c-.248.193-.516.29-.797.29-.402 0-.7-.198-.814-.314A3.473 3.473 0 0 0 12 8.575a3.464 3.464 0 0 0-3.46 3.461 3.464 3.464 0 0 0 3.46 3.46 3.63 3.63 0 0 0 2.654-1.181c.136-.152.458-.306.806-.306.274 0 .542.095.773.274.35.269.45.588.473.809.032.308-.072.585-.188.723m4.686-7.699C20.67 6.883 19.96 5.82 19.07 4.929c-.891-.89-1.954-1.601-3.188-2.133A9.728 9.728 0 0 0 12 2a9.733 9.733 0 0 0-3.883.796c-1.234.532-2.297 1.243-3.186 2.133-.891.891-1.602 1.954-2.134 3.187A9.713 9.713 0 0 0 2 12a9.752 9.752 0 0 0 .797 3.883c.531 1.233 1.242 2.296 2.134 3.186.89.891 1.953 1.602 3.186 2.134A9.725 9.725 0 0 0 12 22a9.72 9.72 0 0 0 3.883-.797c1.233-.532 2.296-1.243 3.188-2.134.89-.89 1.601-1.953 2.132-3.186A9.73 9.73 0 0 0 22 12a9.69 9.69 0 0 0-.797-3.884" fill-rule="evenodd"></path></svg>
                        <span class="GlobalSideBar-navText">版权服务中心</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <footer class="Footer"><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="//liukanshan.zhihu.com/">刘看山</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="/question/19581624">知乎指南</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="/term/zhihu-terms">知乎协议</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="/term/privacy">知乎隐私保护指引</a><br><a class="Footer-item" target="_blank" href="/app">应用</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="https://app.mokahr.com/apply/zhihu">工作</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="https://zhuanlan.zhihu.com/p/51068775">侵权举报</a><span class="Footer-dot"></span><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="http://www.12377.cn">网上有害信息举报专区</a><br><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="https://tsm.miit.gov.cn/dxxzsp/">京 ICP 证 110745 号</a><br><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="http://www.beian.miit.gov.cn">京 ICP 备 13052560 号 - 1</a><br><a class="Footer-item" target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020088"><img src="https://pic3.zhimg.com/80/v2-d0289dc0a46fc5b15b3363ffa78cf6c7.png">京公网安备 11010802010035 号</a><br><span class="Footer-item">互联网药品信息服务资格证书<br>（京）- 非经营性 - 2017 - 0067</span><span class="Footer-item">违法和不良信息举报：010-82716601</span><br><a class="Footer-item" target="_blank" href="/term/child-jubao">儿童色情信息举报专区</a><br><a class="Footer-item" target="_blank" href="/certificates">证照中心</a><br><a class="Footer-item" target="_blank" href="/contact">联系我们</a><span> © 2020 知乎</span></footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/questionCard.js" type="module"></script>
  `
  return template;
}

export {
  questionCard
}