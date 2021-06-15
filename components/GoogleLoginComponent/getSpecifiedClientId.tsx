import { ValidationError } from "myzod";
import { GetOrganization } from "cscheckin-js-sdk";
import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import { OrgInfoResponseSchema } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";

export default async function getSpecifiedClientId(
  org: Organization
): Promise<string | null> {
  const srcResponse = await GetOrganization(org);
  const response = OrgInfoResponseSchema.try(srcResponse);

  if (response instanceof ValidationError) return null;
  return response.client_id;
}
