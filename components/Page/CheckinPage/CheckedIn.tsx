import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";
import type { CheckinResponse } from "cscheckin-js-sdk/dist/types";
import { useUserInfo } from "../../Http/sdk_auth_methods";
import type AuthenticatedPageProps from "../../Database/AuthStore/AuthenticatedPageProps";
import GetCheckinStatusBrief from "../../Http/Utility/getCheckinStatusBrief";
import HeaderPageCard from "../HeaderPageCard";
import FullWidthButton from "../../Elements/Button/FullWidthButton";

interface CheckedInProps extends AuthenticatedPageProps {
  checkinData: CheckinResponse;
}

export default function CheckedIn({ auth, checkinData }: CheckedInProps) {
  const { data: userInfo } = useUserInfo(auth);
  const entry = (title: string, value: unknown) =>
    value && (
      <tr>
        <td className="text-text-secondary pr-4 pb-2">{title}</td>
        <td className="pb-2">{`${value}`}</td>
      </tr>
    );

  return (
    <HeaderPageCard
      title="Perfect!"
      desc="簽到完成。您可保存此簽到憑據。"
      headerColor="bg-positive"
      icon={faCheck}
    >
      <table className="mb-4">
        {entry("簽到 ID", checkinData.id)}
        {entry("課程 ID", checkinData.course_id)}
        {entry("學生 ID", checkinData.student_id)}
        {entry("簽到", GetCheckinStatusBrief(checkinData.state))}
        {entry("姓名", userInfo?.name)}
        {entry("信箱", userInfo?.email)}
        {entry("班級", userInfo && (userInfo.student?.class ?? "⚠️ 未設定"))}
        {entry("座號", userInfo && (userInfo.student?.number ?? "⚠️ 未設定"))}
        {entry("時間", new Date(checkinData.updated_at).toLocaleString())}
      </table>
      <Link href="/config/info" passHref>
        <FullWidthButton onClick={() => null} rightIcon>
          設定或重設班級座號
        </FullWidthButton>
      </Link>
    </HeaderPageCard>
  );
}
