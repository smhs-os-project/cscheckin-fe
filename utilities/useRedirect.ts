import { useRouter } from "next/router";

export default function useRedirect(defaultRedirect?: string): {
  redirect: () => Promise<{ success: boolean }>;
} {
  const iRouter = useRouter();
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
