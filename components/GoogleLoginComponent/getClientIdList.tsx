import { GetOrganizationList } from "cscheckin-js-sdk";
import { OrgInfoListResponseSchema } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";

export default async function getClientIdList() {
  const srcResponse = await GetOrganizationList();
  const response = OrgInfoListResponseSchema.parse(srcResponse);

  return response;
}
