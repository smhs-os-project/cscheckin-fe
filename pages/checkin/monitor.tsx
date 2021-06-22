import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { TeacherCheckinListResponse } from "cscheckin-js-sdk/dist/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import CopyToClipboard from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../components/AuthStore/utilities";
import BaseButton from "../../components/BaseElements/BaseButton";
import BasePage from "../../components/Page/BasePage";
import catcherBuilder from "../../utilities/catcher";
import type { StageDeps } from "../../components/Monitor/StageAction";
import { randTextColor } from "../../utilities/randcolor";
import {
  EndCheckinAction,
  GetCheckinListAction,
  GetCourseStateAction,
  GetLinkAction,
  ShareToClassroomAction,
  SyncListAction,
} from "../../components/Monitor/StageAction";
import {
  getCourseStatus,
  getCheckinStatusIcon,
} from "../../components/Monitor/EnumToString";

enum InitiateStage {
  FAILED = -1,
  BEGIN,
  GET_QUERY,
  GET_AUTH,
  GET_DATA,
  END,
}

enum Stage {
  FAILED = -1,
  INITIATE,
  BUSY,
  READY,
}

export default function Monitor() {
  const router = useRouter();
  const { id } = router.query;
  const [auth, loading] = useAuth();
  const [checkinList, setCheckinList] = useState<TeacherCheckinListResponse>(
    []
  );
  const [stage, setStage] = useState(Stage.INITIATE);
  const [initiateStage, setInitiateStage] = useState(InitiateStage.BEGIN);
  const [courseState, setCourseState] = useState(CheckinState.ON_TIME);
  const [shareLink, setShareLink] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deps, setDeps] = useState<StageDeps>({
    id,
    auth,
    setMessage,
  });
  const shouldLock = () => stage === Stage.BUSY;

  const catcher = catcherBuilder(setMessage, () => {
    setStage(Stage.FAILED);
  });

  const getData = async () =>
    Promise.all([
      GetCourseStateAction(deps).then((state) => {
        setCourseState(state);
      }),
      GetCheckinListAction(deps)
        // cl = Checkin List
        .then((cl) => {
          setCheckinList(cl);
        }),
    ]);

  // Deps
  useEffect(() => {
    setDeps({
      id,
      auth,
      setMessage,
    });
  }, [id, auth, setMessage]);

  // InitiateStage
  useEffect(() => {
    switch (initiateStage) {
      case InitiateStage.BEGIN:
        setStage(Stage.BUSY);

        setMessage("正在初始化⋯⋯");
        setInitiateStage(InitiateStage.GET_QUERY);
        break;
      case InitiateStage.GET_QUERY:
        setMessage("正在查詢 id 字串⋯⋯");
        if (typeof id === "string" && Number(id))
          setInitiateStage(InitiateStage.GET_AUTH);
        break;
      case InitiateStage.GET_AUTH:
        setMessage("正在取得認證資訊⋯⋯");
        if (auth) setInitiateStage(InitiateStage.GET_DATA);
        else if (!auth && !loading) {
          setMessage("無法取得認證。");
          setStage(Stage.FAILED);
          setInitiateStage(InitiateStage.FAILED);
        }
        break;
      case InitiateStage.GET_DATA:
        setMessage("正在取得資料⋯⋯");
        void Promise.all([
          GetLinkAction(deps)
            .then((link) => {
              setShareLink(link);
            })
            .catch(catcher),
          getData().then(() => {
            setInitiateStage(InitiateStage.END);
          }),
        ]).catch(catcher);

        break;
      case InitiateStage.END:
        setMessage(null);
        setStage(Stage.READY);
        setInterval(() => {
          setStage(Stage.BUSY);
          setMessage("正在更新資料⋯⋯");
          void getData()
            .then(() => {
              setMessage(null);
              setStage(Stage.READY);
            })
            .catch(catcher);
        }, 30000);
        NProgress.done();
        break;
      case InitiateStage.FAILED:
      default:
        break;
    }
  }, [id, auth, loading, initiateStage]);

  // Stage
  useEffect(() => {
    switch (stage) {
      case Stage.BUSY:
        NProgress.start();
        break;
      case Stage.READY:
      case Stage.FAILED:
        NProgress.done();
        break;
      case Stage.INITIATE:
      default:
        break;
    }
  }, [stage]);

  return (
    <BasePage id="monitor" title="監控簽到連結" full>
      <div className="flex flex-col items-center justify-around md:items-baseline md:flex-row">
        <section className="flex flex-col items-center content-center justify-center mb-5 shadow rounded-xl w-max">
          <div className="p-4 text-center link-section">
            <label htmlFor="#checkin-link" className="block text-xl text-align">
              把簽到連結擴散出去吧！
              <input
                type="input"
                className="block mt-4 font-mono text-2xl border-b border-black outline-none"
                placeholder="正在載入⋯⋯"
                value={shareLink}
                id="checkin-link"
                readOnly
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </label>
          </div>
          <div className="w-10/12 mb-5 text-center course-status">
            {getCourseStatus(courseState)}
          </div>
          <div
            className={`mb-5 course-status ${
              stage === Stage.FAILED ? "text-red-500" : ""
            }`}
          >
            {message}
          </div>
          <div className="flex flex-col self-center p-4 mb-4 space-x-0 space-y-2 text-center md:space-y-0 md:space-x-2 md:flex-row justify-self-center">
            <BaseButton
              solid
              onClick={async () => {
                setStage(Stage.BUSY);
                await ShareToClassroomAction(deps)
                  .then(() => setStage(Stage.READY))
                  .catch(catcher);
              }}
              disabled={shouldLock()}
            >
              分享到 Classroom
            </BaseButton>
            <CopyToClipboard
              text={shareLink}
              onCopy={() => {
                setMessage("📝 已複製！");
              }}
            >
              <BaseButton disabled={shouldLock()}>複製連結</BaseButton>
            </CopyToClipboard>
            <BaseButton
              onClick={async () => {
                setStage(Stage.BUSY);
                await EndCheckinAction(deps)
                  .then(() => getData())
                  .then(() => setStage(Stage.READY))
                  .catch(catcher);
              }}
              disabled={shouldLock()}
            >
              結束簽到
            </BaseButton>
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
                  <FontAwesomeIcon
                    icon={faBug}
                    className={`transition-all duration-300 ${randTextColor()}`}
                  />
                  」來回報問題，感謝。
                </li>
              </ul>
            </div>
            <BaseButton
              onClick={async () => {
                setStage(Stage.BUSY);
                setMessage("正在更新資料⋯⋯");
                await SyncListAction(deps)
                  .then(() => getData())
                  .then(() => {
                    setMessage(null);
                    setStage(Stage.READY);
                  })
                  .catch(catcher);
              }}
              disabled={shouldLock()}
            >
              更新資料
            </BaseButton>
          </div>
          <table className="w-full table-text-lg table-py-4 table-px-4 md:table-px-12">
            <thead>
              <tr className="border-b border-gray-500">
                <th>簽到狀況</th>
                <th>(班級-座號) 姓名</th>
                <th>簽到時間</th>
              </tr>
            </thead>
            <tbody>
              {checkinList.map((stu) => (
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
