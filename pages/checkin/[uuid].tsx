import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRouter } from "next/router";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

export default function CSCStudentCheckin() {
  const router = useRouter();
  const { uuid } = router.query;

  if (!uuid) return null;

  return (
    <HeaderPageCard
      id="checkin-student"
      title={`簽到「${uuid}」課程`}
      desc="按下「簽到」按鈕即可完成簽到。"
      headerColor="blue-900"
      icon={faCheck}
    >
      todo
    </HeaderPageCard>
  );
}
