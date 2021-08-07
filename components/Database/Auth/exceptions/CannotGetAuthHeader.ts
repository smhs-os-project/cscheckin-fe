export default class CannotGetAuthHeader extends Error {
  constructor() {
    super(`無法取得認證 (Authorization) token。`);
  }
}
