import { ValidationError } from "myzod";
import { GetOrganization } from "cscheckin-js-sdk";
import type { Organization } from "cscheckin-js-sdk/dist/types";
import { OrgInfoResponseSchema } from "cscheckin-js-sdk/dist/types";
import Sentry from "../../utilities/sentry";

export default async function getSpecifiedClientId(
  org: Organization
): Promise<string | null> {
  const srcResponse = await GetOrganization(org);
  const response = OrgInfoResponseSchema.try(srcResponse);

  if (response instanceof ValidationError) {
    Sentry.captureMessage(`failed to get the client id: ${srcResponse}`);
    Sentry.captureException(response);
    return null;
  }
  return response.client_id;
}
