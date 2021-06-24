import type { GetStaticProps } from "next";

export default function SSOLogin() {
  return null;
}

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    permanent: false,
    destination: "/sso/login",
  },
});
