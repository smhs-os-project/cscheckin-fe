import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { reportExceptionMessage } from "../../utilities/ErrorReporting/reportExceptionMessage";
import useQueryParam from "./useQueryParam";

const isRelative = (url: string) => /^\/[^/\\]/.exec(url);

export default function useRedirect(defaultRedirect?: string): {
  redirect: () => Promise<boolean>;
  redirectTo: string | null;
} {
  const router = useRouter();
  const { value: redirect, notSpecified } = useQueryParam("redirect");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!notSpecified && redirect) {
      if (isRelative(redirect)) {
        setRedirectTo(redirect);
        return;
      }

      reportExceptionMessage(
        "Someone tried to pass a malicious redirect URI.",
        {
          redirect,
        }
      );
    }

    if (defaultRedirect) setRedirectTo(defaultRedirect);
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
