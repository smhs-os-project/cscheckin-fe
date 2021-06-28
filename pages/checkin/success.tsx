import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

export default function CSCStudentCheckinSuccess() {
  return (
    <HeaderPageCard
      id="checkin-student-success"
      title="Perfect!"
      desc="簽到完成。您可保存此簽到憑據。"
      headerColor="green-900"
      icon={faCheck}
    >
      todo
    </HeaderPageCard>
  );
}
