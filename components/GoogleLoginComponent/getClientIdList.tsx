import { GetOrganizationList } from "cscheckin-js-sdk";
import { OrgInfoListResponseSchema } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";
import { ValidationError } from "myzod";
import { map } from "./idNameMap";

export default async function getClientIdList() {
  const srcResponse = await GetOrganizationList();
  const response = OrgInfoListResponseSchema.try(srcResponse);

  if (response instanceof ValidationError) return [];
  return response.map(({ chinese_name, ...rest }) => ({
    ...rest,
    id: map[chinese_name],
    chinese_name,
  }));
}
