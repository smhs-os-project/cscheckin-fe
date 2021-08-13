import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useHttpBuilder from "./useHttpBuilder";

export const useClientId = () =>
  useHttpBuilder("auth/client_id", async () => {
    const GetClientId = await import("cscheckin-js-sdk").then(
      (mod) => mod.GetClientId
    );
    const clientId = await GetClientId();
    return clientId.client_id;
  });

export const useUserInfo = (auth: CSCAuth) =>
  useHttpBuilder("auth/user_info", async () => auth.userInfo());

export default {
  useClientId,
};
