import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import HeaderPageCard from "../../../components/Page/HeaderPageCard";
import randBackgroundColor from "../../../utilities/randcolor";

export default function CheckinCreate() {
  const [, setSelectedClassroom] = useState("");
  const classrooms = ["201魷魚課", "202魷魚課", "203魷魚課"];

  return (
    <HeaderPageCard
      id="checkin-choose-classroom"
      title="選擇 Classroom 教室"
      desc="選擇要設定簽到的 classroom。"
      contentPadding={false}
    >
      <div className="flex flex-col w-full classroom-options">
        {classrooms.map((cr) => (
          <div key={`available-classroom-option-${cr}`}>
            <button
              className={`w-full px-6 py-10 text-left text-black hover:text-white transition-all duration-300 rounded-none ${randBackgroundColor(
                true
              )}`}
              type="button"
              onClick={() => setSelectedClassroom(cr)}
            >
              <div className="flex justify-between">
                <div>{cr}</div>
                <div>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </HeaderPageCard>
  );
}
