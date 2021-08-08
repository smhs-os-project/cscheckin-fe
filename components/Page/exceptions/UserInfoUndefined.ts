export default class UserInfoUndefined extends Error {
  constructor() {
    super("UserInfo 未定義。");
    this.name = "UserInfoUndefined";
  }
}
