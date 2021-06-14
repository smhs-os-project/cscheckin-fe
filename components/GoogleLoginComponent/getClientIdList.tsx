export function getClientIdList(): Record<string, string> {
  const clientIdJson = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientIdJson)
    throw new Error("You should specify NEXT_PUBLIC_GOOGLE_CLIENT_ID");

  const clientId: unknown = JSON.parse(clientIdJson);
  if (!clientId || typeof clientId !== "object")
    throw new Error("The NEXT_PUBLIC_GOOGLE_CLIENT_ID should be the school.");

  return clientId as Record<string, string>;
}

export default getClientIdList;
