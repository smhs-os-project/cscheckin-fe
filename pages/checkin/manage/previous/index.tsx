import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useAuth from "../../../../components/Database/AuthStore/useAuth";
import AuthErrorPage from "../../../../components/Database/AuthStore/AuthErrorPage";
import LoadingPage from "../../../../components/Page/LoadingPage";
import type AuthenticatedPageProps from "../../../../components/Database/AuthStore/AuthenticatedPageProps";
import { useCoursesList } from "../../../../components/Http/sdk_course_methods";
import ErrorPage from "../../../../components/Page/ErrorPage";
import ListChoicePageCard from "../../../../components/Page/ListChoicePageCard";
import { Scope } from "../../../../components/OAuth/Google/scope";

function AuthenticatedCheckinManagePreviousPage({
  auth,
}: AuthenticatedPageProps) {
  const router = useRouter();
  const { data, error } = useCoursesList(auth);

  if (error)
    return (
      <ErrorPage
        errorMessage="無法取得簽到課程資料。"
        errorDetails={error.message}
      />
    );

  if (data) {
    return (
      <ListChoicePageCard
        title="查看以往簽到記錄"
        desc="依開課時間新到舊排序。"
        icon={faSearch}
        choice={data
          .sort((entryA, entryB) => entryB.id - entryA.id)
          .map((entry) => ({
            id: `previous-courses-entry-${entry.google_classroom_id}-${entry.id}`,
            name: `${entry.name} - ${entry.start_timestamp.toLocaleString(
              "zh-TW"
            )}`,
            redirect: () =>
              router.push(`/checkin/manage/dashboard/${entry.id}`),
          }))}
      />
    );
  }

  return <LoadingPage reason="正在載入簽到課程名單⋯⋯" />;
}

export default function CheckinManagePreviousPage() {
  const { auth, error } = useAuth(Scope.Teacher);

  if (error) return <AuthErrorPage authError={error} />;
  if (auth) return <AuthenticatedCheckinManagePreviousPage auth={auth} />;

  return <LoadingPage reason="正在取得登入資訊⋯⋯" />;
}
