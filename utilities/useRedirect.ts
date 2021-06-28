import type { NextRouter } from "next/router";
import { useRouter } from "next/router";

export default function useRedirect(
  defaultRedirect?: string,
  router?: NextRouter
): { redirect: () => Promise<{ success: boolean }> } {
  const iRouter = router || useRouter();
  const { redirect } = iRouter.query;

  return {
    async redirect() {
      if (typeof redirect === "string") {
        await iRouter.push(decodeURIComponent(redirect));
      } else if (defaultRedirect) {
        await iRouter.push(defaultRedirect);
      } else {
        return { success: false };
      }

      return { success: true };
    },
  };
}
