import { GetClientId } from "cscheckin-js-sdk";
import useHttpBuilder from "./useHttpBuilder";

export const useClientId = () =>
  useHttpBuilder("auth/client_id", async () => {
    const clientId = await GetClientId();
    return clientId.client_id;
  });
