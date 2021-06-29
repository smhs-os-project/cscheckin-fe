import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRedirect(defaultRedirect?: string): {
  redirect: () => Promise<boolean>;
  redirectTo: string | null;
} {
  const router = useRouter();
  const { redirect } = router.query;
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof redirect === "string") {
      setRedirectTo(redirect);
    } else if (defaultRedirect) {
      setRedirectTo(defaultRedirect);
    }
  }, [redirect, defaultRedirect]);

  return {
    async redirect() {
      if (redirectTo) {
        return router.push(redirectTo);
      }

      return false;
    },
    redirectTo,
  };
}
