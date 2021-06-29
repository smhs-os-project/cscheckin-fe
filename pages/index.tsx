import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../components/AuthStore/useAuth";

export default function CSCIndex() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) void router.push("/checkin/manage");
  }, [auth, router]);

  return null;
}
