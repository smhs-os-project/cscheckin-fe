import type { GetStaticProps } from "next";

export default function CheckinIndex() {
  return null;
}

export const getStaticProps: GetStaticProps = async () => ({
  redirect: {
    permanent: false,
    destination: "/checkin/create/choose-cr",
  },
});
