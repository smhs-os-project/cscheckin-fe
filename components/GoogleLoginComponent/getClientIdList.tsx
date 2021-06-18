import { GetOrganizationList } from "cscheckin-js-sdk";
import { OrgInfoListResponseSchema } from "cscheckin-js-sdk/dist/types";
import { ValidationError } from "myzod";

export default async function getClientIdList() {
  const srcResponse = await GetOrganizationList();
  const response = OrgInfoListResponseSchema.try(srcResponse);

  if (response instanceof ValidationError) {
    console.error("getClientIdList: failed to retrieve the organization list");
    return [];
  }

  return response;
}
