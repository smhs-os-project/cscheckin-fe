import { CheckinState } from "cscheckin-js-sdk/dist/types/common/checkin_state";
import type { TeacherCheckinListResponse } from "cscheckin-js-sdk/dist/types/teacher/resp_checkin_list";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAuth } from "../../components/AuthStore/utilities";
import BaseButton from "../../components/BaseElements/BaseButton";
import BasePage from "../../components/Page/BasePage";
import catcherBuilder from "../../utilities/catcher";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import type { StageDeps } from "../../components/Monitor/StageAction";
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
      GetCourseStateAction(deps)
        .then((state) => {
          setCourseState(state);
        })
        .catch(catcher),
      GetCheckinListAction(deps)
        // cl = Checkin List
        .then((cl) => {
          setCheckinList(cl);
        })
        .catch(catcher),
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
        ]);

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

  if (stage === Stage.FAILED) {
    return (
      <HeaderPageCard
        id="monitor-error"
        title="發生錯誤"
        desc="發生錯誤，以致無法顯示監控畫面。"
      >
        <p className="font-bold text-red-500">{message}</p>
      </HeaderPageCard>
    );
  }

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
          <div className="mb-5 course-status">
            {getCourseStatus(courseState)}
          </div>
          <div className="mb-5 course-status">{message}</div>
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
                setMessage("已複製！");
              }}
            >
              <BaseButton disabled={shouldLock()}>複製連結</BaseButton>
            </CopyToClipboard>
            <BaseButton
              onClick={async () => {
                setStage(Stage.BUSY);
                await EndCheckinAction(deps)
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
                <li>每30秒自動更新所有資料。</li>
                <li>
                  如果有學生剛加入 Classroom 課程，
                  <br />
                  也請按下右側按鈕，將學生加進去可簽到名單裡面。
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
                <th>簽到</th>
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
