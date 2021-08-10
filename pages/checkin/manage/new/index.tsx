import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListChoicePageCard from "../../../../components/Page/ListChoicePageCard";
import type AuthenticatedPageProps from "../../../../components/Database/AuthStore/AuthenticatedPageProps";
import { useClassroomsList } from "../../../../components/Http/sdk_course_methods";
import ErrorPage from "../../../../components/Page/ErrorPage";
import LoadingPage from "../../../../components/Page/LoadingPage";
import useAuth from "../../../../components/Database/AuthStore/useAuth";
import AuthErrorPage from "../../../../components/Database/AuthStore/AuthErrorPage";
import { Scope } from "../../../../components/OAuth/Google/scope";

function ClassroomList({ auth }: AuthenticatedPageProps) {
  const router = useRouter();
  const { data, error } = useClassroomsList(auth);

  if (error)
    return (
      <ErrorPage
        errorMessage="無法選擇 Classroom 教室。"
        errorDetails={error.message}
      />
    );

  if (data)
    return (
      <ListChoicePageCard
        choice={data.map(({ name, google_classroom_id }) => ({
          id: `classroom-${name}`,
          name,
          redirect: async () =>
            router.push(`/checkin/manage/new/${google_classroom_id}/now`),
        }))}
        title="選擇學生所在的 Classroom 教室"
        desc="開啟 Google Meet、要簽到學生所在的 Google Classroom"
        icon={faSearch}
      />
    );

  return <LoadingPage reason="正在載入 Classroom 教室名單⋯⋯" />;
}

export default function CheckinManageNewPage() {
  const { auth, error } = useAuth(Scope.Teacher);

  if (error) return <AuthErrorPage authError={error} />;
  if (auth) return <ClassroomList auth={auth} />;

  return <LoadingPage reason="正在確認登入憑證⋯⋯" />;
}
