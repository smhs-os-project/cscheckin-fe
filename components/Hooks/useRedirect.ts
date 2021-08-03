import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useQueryParam from "./useQueryParam";

export default function useRedirect(defaultRedirect?: string): {
  redirect: () => Promise<boolean>;
  redirectTo: string | null;
} {
  const router = useRouter();
  const { value: redirect, notSpecified } = useQueryParam("redirect");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (notSpecified && defaultRedirect) setRedirectTo(defaultRedirect);
    else setRedirectTo(redirect);
  }, [redirect, defaultRedirect, notSpecified]);

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
