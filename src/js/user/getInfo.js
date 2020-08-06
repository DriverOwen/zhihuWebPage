function userInfo(employments,educations,business) {
  let template = `
      <div class="ProfileHeader-infoItem">
        <span class="infoItem">居住地</span>
        <span class="infoIntro">现居中国</span>
      </div>
      <div class="ProfileHeader-infoItem">
        <span class="infoItem">所在行业</span>
        <span class="infoIntro">${business ? business : "暂无，请补充用户资料"}</span>
      </div>
      <div class="ProfileHeader-infoItem">
        <span class="infoItem">教育背景</span>
        <span class="infoIntro">${educations ? educations : "暂无，请补充用户资料"}</span>
      </div>
      <div class="ProfileHeader-infoItem">
        <span class="infoItem">职业经历</span>
        <span class="infoIntro">${employments ? employments : "暂无，请补充用户资料"}</span>
      </div>
    `
  return template;
}
export {
  userInfo
}