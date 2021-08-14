import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import type { AuthUserResponse } from "cscheckin-js-sdk/dist/types";
import useHttpBuilder from "./useHttpBuilder";
import type { HttpResponse } from "./HttpResponse";

export const useClientId = (): HttpResponse<string> =>
  useHttpBuilder("auth/client_id", async () => {
    const GetClientId = await import("cscheckin-js-sdk").then(
      (mod) => mod.GetClientId
    );
    const clientId = await GetClientId();
    return clientId.client_id;
  });

export const useUserInfo = (auth: CSCAuth): HttpResponse<AuthUserResponse> =>
  useHttpBuilder("auth/user_info", async () => auth.userInfo());

export default {
  useClientId,
};
