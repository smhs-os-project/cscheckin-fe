import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import AuthStore from "../AuthStore";
import type { LoginComponentProps } from "./LoginComponent";

export default function internalOnLoginWrapper(
  onLogin: LoginComponentProps["onLogin"]
) {
  return async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const resp = response as GoogleLoginResponse;
    if (resp.tokenId) {
      // check if it is a valid GoogleLoginResponse
      const auth = new CSCAuth(resp.tokenId, resp.accessToken);
      await AuthStore.store(auth);
    }

    if (onLogin) await onLogin(response);
    return undefined;
  };
}
