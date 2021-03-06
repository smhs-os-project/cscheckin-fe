import CSCAuth from "cscheckin-js-sdk/dist/auth";
import Sentry from "../../../utilities/ErrorReporting/sentry";
import SessionDB from "../SessionDB";
import InvalidCredential, {
  InvalidCredentialStage,
} from "./exceptions/InvalidCredential";

const AUTH_DATA_KEY = "auth.data";
const sessionDB = SessionDB.getInstance();

export default class AuthStore {
  private static instance: AuthStore | null = null;

  private auth: CSCAuth | null = null;

  constructor() {
    if (globalThis.window) this.restore();
  }

  static getCommonInstance(): AuthStore {
    if (!this.instance) {
      this.instance = new AuthStore();
    }
    return this.instance;
  }

  storeCredential(tokenId: string, accessToken: string): void {
    this.setAuth(new CSCAuth(tokenId, accessToken));
  }

  async getAuth(): Promise<CSCAuth> {
    if (this.auth) {
      const accessData = await this.auth.getAccessData();

      if (accessData) {
        if (accessData.exp * 1000 >= Date.now()) {
          const userInfo = await this.auth.userInfo();

          if (userInfo) {
            this.save();
            Sentry.setUser({
              email: userInfo.email,
              name: userInfo.name,
            });
            return this.auth;
          }
        }

        throw new InvalidCredential(InvalidCredentialStage.ACCESS_DATA_EXPIRED);
      }

      throw new InvalidCredential(
        InvalidCredentialStage.ACCESS_DATA_CANNOT_FETCH
      );
    }

    throw new InvalidCredential(InvalidCredentialStage.AUTH_NOT_DEFINED);
  }

  setAuth(auth: CSCAuth) {
    this.auth = auth;
  }

  async logout() {
    await this.auth?.revoke();
    Sentry.setUser(null);
    this.auth = null;
  }

  save(): void {
    if (this.auth) sessionDB.set(AUTH_DATA_KEY, this.auth.export());
  }

  restore(): void {
    const auth = sessionDB.get(AUTH_DATA_KEY);
    if (auth) this.auth = CSCAuth.import(auth);
  }
}
