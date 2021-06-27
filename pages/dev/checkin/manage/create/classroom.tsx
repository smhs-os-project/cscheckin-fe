import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ListChoicePageCard from "../../../../../components/Page/ListChoicePageCard";

export default function CSCManageCreateClassroom() {
  return (
    <ListChoicePageCard
      id="csc-manage-create-classroom"
      title="選擇開課教室"
      desc="也就是開啟 Google Meet 和學生所在的 Google Classroom"
      icon={faSearch}
    >
      {[]}
    </ListChoicePageCard>
  );
}
