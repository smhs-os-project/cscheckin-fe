import { GetClientId } from "cscheckin-js-sdk";
import useHttpBuilder from "./useHttpBuilder";

export const useClientId = async () =>
  useHttpBuilder(async () => {
    const clientId = await GetClientId();
    return clientId.client_id;
  });
