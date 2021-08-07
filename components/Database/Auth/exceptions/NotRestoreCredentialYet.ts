export default class NotRestoreCredentialYet extends Error {
  constructor() {
    super("尚未呼叫過 AuthStore 的 storeCredential() 或是 restore() 函數。");
  }
}
