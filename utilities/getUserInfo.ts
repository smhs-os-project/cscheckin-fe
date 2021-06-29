import type { AuthIdentRequest } from "cscheckin-js-sdk/dist/types";
import AuthStore from "../components/AuthStore";
import { reportException } from "./reportExceptionMessage";

export type UserInfo = AuthIdentRequest;

export default async function getUserInfo(): Promise<UserInfo | null> {
  try {
    const auth = await AuthStore.retrieve();

    if (auth) {
      const info = await auth.userInfo();
      return info?.student ?? null;
    }
  } catch (e) {
    reportException(e, "failed to get user info");
  }

  return null;
}
