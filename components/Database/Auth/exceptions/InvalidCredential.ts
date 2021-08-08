export enum InvalidCredentialStage {
  AUTH_NOT_DEFINED = "auth_not_defined",
  ACCESS_DATA_CANNOT_FETCH = "access_data_cannot_fetch",
  ACCESS_DATA_EXPIRED = "access_data_expired",
}

export default class InvalidCredential extends Error {
  constructor(public stage: InvalidCredentialStage) {
    super("登入憑證失效或無效。");
    this.name = "InvalidCredential";
  }
}
