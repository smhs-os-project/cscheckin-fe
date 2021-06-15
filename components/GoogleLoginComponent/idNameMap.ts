// Since the API didn't give us the ID-Name mapping,
// we determine it in frontend.
//
// It should be fixed.

import { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import type { OrgInfoResponse } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";

// FIXME TODO
export const map: Record<string, Organization> = {
  高雄市立三民高中: Organization.SMHS,
  國立鳳山高中: Organization.FSSH,
  "Google 個人或其他帳戶": Organization.SMHS,
};

export interface MappedOrgInfoResponse extends OrgInfoResponse {
  id: Organization;
}

export type MappedOrgInfoListResponse = MappedOrgInfoResponse[];
