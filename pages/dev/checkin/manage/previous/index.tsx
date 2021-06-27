import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ListChoicePageCard from "../../../../../components/Page/ListChoicePageCard";

export default function CSCManagePrevious() {
  return (
    <ListChoicePageCard
      id="csc-manage-previous"
      title="查看以往簽到記錄"
      desc="依時間由上往下排序。"
      icon={faSearch}
    >
      {[]}
    </ListChoicePageCard>
  );
}
