import { CheckinState } from "cscheckin-js-sdk/dist/types";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import NProgress from "nprogress";
import { isBefore } from "cscheckin-js-sdk";
import useAuth from "../../../../../components/AuthStore/useAuth";
import useError from "../../../../../utilities/useError";
import ErrorPage from "../../../../../components/Page/ErrorPage";
import BasePage from "../../../../../components/Page/BasePage";
import {
  getCheckinStatusIcon,
  getCourseStatus,
} from "../../../../../components/Dashboard/EnumToString";
import BaseButton from "../../../../../components/BaseElements/BaseButton";
import {
  closeCourseActionWrapper,
  refreshData,
  shareLinkActionWrapper,
  syncListActionWrapper,
  useCheckinLink,
  useCheckinList,
  useCourseInfo,
} from "../../../../../components/Dashboard/HooksAndMethods";

function InnerCSCCheckinManageDashboard({ id }: { id: string }) {
  const [error, setError] = useError();
  const [message, setMessage] = useState<string | null>(null);
  const [courseStatus, setCourseStatus] = useState<CheckinState | null>(null);
  const [lockFlag, setLockFlag] = useState(false);
  const { auth, error: authError, recheck } = useAuth();
  const { data: courseInfo, error: courseRespError } = useCourseInfo(id, auth);
  const { data: checkinList, error: checkinListRespError } = useCheckinList(
    id,
    auth
  );
  const { data: checkinLink, error: checkinLinkRespError } = useCheckinLink(
    id,
    auth
  );

  const shareLinkAction = shareLinkActionWrapper({
    id,
    auth,
    setLockFlag,
    setMessage,
    setError,
  });

  const closeCourseAction = closeCourseActionWrapper({
    id,
    auth,
    courseStatus,
    setLockFlag,
    setMessage,
    setError,
  });

  const syncListAction = syncListActionWrapper({
    id,
    auth,
    setLockFlag,
    setMessage,
    setError,
  });

  useEffect(() => {
    void recheck(); // recheck the authentication while doing stuff
  }, [lockFlag, recheck]);

  useEffect(() => {
    if (courseStatus && courseInfo && checkinLink) setLockFlag(false);
    else setLockFlag(true);
  }, [courseStatus, courseInfo, checkinLink]);

  useEffect(() => {
    if (lockFlag) NProgress.start();
    else NProgress.done();
  }, [lockFlag]);

  useEffect(() => {
    if (courseInfo) {
      if (isBefore(courseInfo.start_timestamp, courseInfo.expire_time)) {
        // Date.now() > start time + end duration
        setCourseStatus(CheckinState.NOT_CHECKED_IN);
      } else if (isBefore(courseInfo.start_timestamp, courseInfo.late_time)) {
        // Date.now() > start time + late duration
        setCourseStatus(CheckinState.LATE);
      } else {
        setCourseStatus(CheckinState.ON_TIME);
      }
    }
  }, [lockFlag, courseInfo]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError, setError]);

  useEffect(() => {
    if (courseRespError instanceof Error) {
      setError({
        message: "無法取得課程資訊。",
        details: courseRespError.message,
      });
    } else if (courseRespError) {
      setError({
        message: "無法取得課程資訊。",
        details: `${courseRespError}`,
      });
    }
  }, [courseRespError, setError]);

  useEffect(() => {
    if (checkinLinkRespError instanceof Error) {
      setError({
        message: "無法取得簽到連結。",
        details: checkinLinkRespError.message,
      });
    } else if (checkinLinkRespError) {
      setError({
        message: "無法取得簽到連結。",
        details: `${checkinLinkRespError}`,
      });
    }
  }, [checkinLinkRespError, setError]);

  useEffect(() => {
    if (checkinListRespError instanceof Error) {
      setError({
        message: "無法取得簽到名單。",
        details: checkinListRespError.message,
      });
    } else if (checkinListRespError) {
      setError({
        message: "無法取得簽到名單。",
        details: `${checkinListRespError}`,
      });
    }
  }, [checkinListRespError, setError]);

  if (error) {
    NProgress.done();
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <BasePage id="monitor" title="監控簽到連結" full>
      <div className="flex flex-col items-center justify-around xl:items-baseline xl:flex-row">
        <section className="flex flex-col items-center content-center justify-center mb-5 shadow rounded-xl w-max">
          <div className="p-4 text-center link-section">
            <label htmlFor="#checkin-link" className="block text-xl text-align">
              把簽到連結擴散出去吧！
              <input
                type="input"
                className="block mt-4 font-mono text-2xl border-b border-black outline-none"
                value={checkinLink?.link ?? "正在載入⋯⋯"}
                id="checkin-link"
                readOnly
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </label>
          </div>
          <div className="w-10/12 mb-5 text-center course-status">
            {courseStatus && getCourseStatus(courseStatus)}
          </div>
          <div className="w-10/12 mb-5 text-center message">{message}</div>
          <div className="flex flex-col self-center p-4 mb-4 space-x-0 space-y-2 text-center xl:space-y-0 xl:space-x-2 xl:flex-row justify-self-center">
            <BaseButton solid onClick={shareLinkAction} disabled={lockFlag}>
              分享到 Classroom
            </BaseButton>
            <CopyToClipboard
              text={checkinLink?.link ?? ""}
              onCopy={() => {
                setMessage("📝 已複製！");
              }}
            >
              <BaseButton disabled={lockFlag}>複製連結</BaseButton>
            </CopyToClipboard>
            <BaseButton onClick={closeCourseAction}>結束簽到</BaseButton>
          </div>
        </section>
        <section>
          <div className="flex items-center content-start justify-end mb-5">
            <div className="pr-2">
              <ul className="list-disc">
                <li>系統每 30 秒會自動更新所有資料。</li>
                <li>如果列表資料不完整，請點選右側的更新資料按鈕。</li>
                <li>
                  如果系統仍無法正常運作，請點選右下角的「
                  <FontAwesomeIcon icon={faBug} />
                  」來回報問題，感謝。
                </li>
              </ul>
            </div>
            <BaseButton
              onClick={async () => syncListAction().then(() => refreshData())}
              disabled={lockFlag}
            >
              更新資料
            </BaseButton>
          </div>
          <table className="w-full table-text-lg table-py-4 table-px-4 xl:table-px-12">
            <thead>
              <tr className="border-b border-gray-500">
                <th>簽到狀況</th>
                <th>(班級-座號) 姓名</th>
                <th>簽到時間</th>
              </tr>
            </thead>
            <tbody>
              {checkinList?.map((stu) => (
                <tr
                  key={`cl-${stu.checkin_id}-${stu.class}${stu.number}-${stu.name}`}
                >
                  <td>{getCheckinStatusIcon(stu.state)}</td>
                  <td>
                    ({stu.class !== "" ? stu.class : "?"}-
                    {stu.number !== "" ? stu.number : "?"}) {stu.name}
                  </td>
                  <td>{stu.created_at.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </BasePage>
  );
}

export default function CSCCheckinManageDashboard() {
  const router = useRouter();
  const { id } = router.query;
  if (!router.isReady) {
    return <p>正在初始化資料⋯⋯</p>;
  }

  if (!(typeof id === "string" && /^\d+$/.exec(id))) {
    return (
      <ErrorPage
        errorMessage="傳入的 course id 無效。"
        errorDetails={`傳入的 course id 是 ${id}，不是由數字構成的字串。`}
      />
    );
  }

  return <InnerCSCCheckinManageDashboard id={id} />;
}
