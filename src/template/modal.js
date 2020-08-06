function modal(user_avatar) {
  let template = `
<div class="Modal-wrapper">
  <div class="Modal-backdrop"></div>
  <div class="Modal">
    <div class="Modal-inner">
      <div class="Modal-content">
        <div class="Ask-form">
          <div class="Ask-items">
            <div class="Ask-titleWrapper">
              <img class="Avatar" width="40" height="40" src="${user_avatar}">
              <div class="Ask-title">
                <input type="text" class="Ask-title-ipt" placeholder="写下你的问题，准确地描述问题更容易得到解答">
                <span class="Ask-title-warn"></span>
              </div>
            </div>
          </div>
          <div class="AskDetail">
            <div class="AskDetail-actionsWrapper">
              <div class="AskDetail-actions">
                <a href="javascript:void(0)">
                  <svg class="Zi Zi--Format" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M6.295 15.4L5.06 19H3L7.684 6h1.813l4.684 13h-2.06l-1.235-3.6h-4.59zM17.092 19c-1.548 0-2.647-.962-2.647-2.391 0-1.428 1.063-2.27 2.916-2.384l1.782-.103v-.43c0-.653-.419-.996-1.286-.996-.724 0-1.194.25-1.323.663l-.046.147H14.7l.027-.234c.161-1.366 1.436-2.24 3.196-2.24 1.93 0 3.076.987 3.076 2.66v5.188h-1.81v-.75c-.5.56-1.243.87-2.098.87zM6.89 13.646h3.4L8.59 8.69l-1.7 4.956zM17.582 15.7c-.901.06-1.267.325-1.267.842 0 .504.439.827 1.146.827.973 0 1.682-.6 1.682-1.383v-.385l-1.56.1z"></path></svg>
                </a>
                <a href="javascript:void(0)">
                  <svg class="Zi Zi--InsertImage" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z" fill-rule="evenodd"></path></svg>
                </a>
                <a href="javascript:void(0)">
                  <svg class="Zi Zi--InsertVideo" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M10.546 15c-.466.273-.86.053-.86-.5V9.505c0-.565.385-.778.86-.501l4.278 2.497c.466.272.475.726 0 1.003L10.546 15zM5 5S3 5 3 7v10s0 2 2.002 2H19c2 0 2-2 2-2V7c0-2-2-2-2-2H5z" fill-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
            <div class="AskDetail-inputWrapper">
              <textarea class="AskDetail-areas" name="" id=""></textarea>
            </div>
          </div>
          <div class="Ask-addTopic">
            <span style="display: inline-flex; align-items: center;">&#8203;<svg class="Zi Zi--Plus Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z" fill-rule="evenodd"></path></svg></span>
            <span>添加话题（暂未开发）</span>
          </div>
          <div class="Ask-submit">
            <div class="AskOptions">
              <input id="anonymous-checkbox" class="AskOptions-checkbox" type="checkbox">
              <span>匿名提问(未实现)</span>
            </div>
            <div class="Ask-submit-btn">
              <button type="button" disabled="disabled" class="disabled Ask-submitBtn">发布问题</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="Modal-closeButton"><svg class="Zi Zi--Close Modal-closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></a>
  </div>
 </div>
  `
  return template;
}

export {
  modal
}