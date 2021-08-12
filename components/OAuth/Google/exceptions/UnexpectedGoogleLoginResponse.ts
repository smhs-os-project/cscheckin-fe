export default class UnexpectedGoogleLoginResponse extends Error {
  constructor(public content: unknown) {
    super("應收到符合 GoogleLoginResponse interface 的物件，卻收到未知物件。");
    this.name = "UnexpectedGoogleLoginResponse";
  }
}
