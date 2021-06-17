import {
  CheckinList,
  ShareToClassroom,
  GetShareLink,
  CloseCourse,
  SyncCourseMembers,
  GetCourseByID,
  isBefore,
} from "cscheckin-js-sdk";
import { CheckinState } from "cscheckin-js-sdk/dist/types/common/checkin_state";
import type { TeacherCheckinListResponse } from "cscheckin-js-sdk/dist/types/teacher/resp_checkin_list";
import { TeacherCheckinListResponseSchema } from "cscheckin-js-sdk/dist/types/teacher/resp_checkin_list";
import { ShareResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_share";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import CopyToClipboard from "react-copy-to-clipboard";
import { CourseResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { useAuth } from "../../components/AuthStore/utilities";
import BaseButton from "../../components/BaseElements/BaseButton";
import BasePage from "../../components/Page/BasePage";
import catcherBuilder from "../../utilities/catcher";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

enum InitiateStage {
  FAILED = -1,
  BEGIN,
  GET_QUERY,
  GET_AUTH,
  GET_COURSE_STATE,
  GET_LINK,
  GET_CHECKIN_LIST,
  END,
}

enum Stage {
  FAILED = -1,
  INITIATE,
  READY,
  GET_COURSE_STATE,
  GET_LINK,
  GET_CHECKIN_LIST,
  SHARE_TO_CLASSROOM,
  END_CHECKIN,
  SYNC_LIST,
}

function getCourseStatus(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅ 新進學生皆為準時。";
    case CheckinState.LATE:
      return "⚠️ 後進學生記為遲到。";
    default:
      return "❌ 學生不能繼續簽到。";
  }
}

function getCheckinStatusIcon(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅";
    case CheckinState.LATE:
      return "⚠";
    default:
      return "❌";
  }
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
  const shouldLock = () => stage !== Stage.READY;

  // InitiateStage
  useEffect(() => {
    const stageIPC = (executeStage: Stage): boolean => {
      switch (stage) {
        case Stage.INITIATE:
          setStage(executeStage);
          break;
        case Stage.READY:
          setStage(Stage.INITIATE);
          return true;
        case executeStage:
        default:
          break;
      }
      return false;
    };

    switch (initiateStage) {
      case InitiateStage.BEGIN:
        NProgress.start();

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
        if (auth) setInitiateStage(InitiateStage.GET_LINK);
        else if (!auth && !loading) {
          setMessage("無法取得認證。");
          setStage(Stage.FAILED);
          setInitiateStage(InitiateStage.END);
        }
        break;
      case InitiateStage.GET_COURSE_STATE:
        setMessage("正在取得課程資訊⋯⋯");
        if (stageIPC(Stage.GET_COURSE_STATE)) {
          setInitiateStage(InitiateStage.GET_LINK);
        }
        break;
      case InitiateStage.GET_LINK:
        setMessage("正在取得簽到連結⋯⋯");
        if (stageIPC(Stage.GET_LINK)) {
          setInitiateStage(InitiateStage.GET_CHECKIN_LIST);
        }
        break;
      case InitiateStage.GET_CHECKIN_LIST: {
        setMessage("正在取得簽到名單⋯⋯");
        if (stageIPC(Stage.GET_CHECKIN_LIST)) {
          setInitiateStage(InitiateStage.END);
        }
        break;
      }
      case InitiateStage.END:
        setMessage(null);
        NProgress.done();
        break;
      case InitiateStage.FAILED:
      default:
        NProgress.done();
    }
  }, [id, auth, loading, initiateStage, stage]);

  // Stage
  useEffect(() => {
    const catcher = catcherBuilder(setMessage, () => {
      setStage(Stage.FAILED);
    });

    switch (stage) {
      case Stage.INITIATE:
        if (initiateStage === InitiateStage.END) {
          // When the initialStorage is ready,
          // Set the stage to READY.
          setStage(Stage.READY);
        }
        break;
      case Stage.SHARE_TO_CLASSROOM: {
        NProgress.start();
        if (typeof id === "string" && auth) {
          void ShareToClassroom(id, auth)
            .then((strRaw) => {
              const str = ShareResponseSchema.try(strRaw);
              if (str instanceof ValidationError)
                return Promise.reject(new Error("連結分享失敗。"));
              setMessage("連結已分享至 Google Classroom 。");
              setShareLink(str.link);
              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        break;
      }
      case Stage.END_CHECKIN: {
        NProgress.start();
        if (typeof id === "string" && auth) {
          void CloseCourse(Number(id), auth)
            .then((strRaw) => {
              if (!strRaw) {
                return Promise.reject(new Error("結束簽到失敗。"));
              }
              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        break;
      }
      case Stage.GET_COURSE_STATE:
        NProgress.start();
        if (typeof id === "string" && auth) {
          void GetCourseByID(Number(id), auth)
            .then((rawCourse) => {
              const course = CourseResponseSchema.try(rawCourse);

              if (course instanceof ValidationError) {
                return Promise.reject(new Error("取得課程失敗。"));
              }

              if (!isBefore(course.start_timestamp, course.expire_time)) {
                setCourseState(CheckinState.NOT_CHECKED_IN);
              } else if (!isBefore(course.start_timestamp, course.late_time)) {
                setCourseState(CheckinState.LATE);
              } else {
                setCourseState(CheckinState.ON_TIME);
              }

              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        setStage(Stage.READY);
        break;
      case Stage.GET_LINK: {
        NProgress.start();
        if (typeof id === "string" && auth) {
          // gsl = Get
          void GetShareLink(id, auth)
            .then((gslRaw) => {
              const gsl = ShareResponseSchema.try(gslRaw);

              if (gsl instanceof ValidationError)
                return Promise.reject(new Error("連結取得失敗。"));

              setShareLink(gsl.link);
              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        break;
      }
      case Stage.GET_CHECKIN_LIST: {
        NProgress.start();
        if (typeof id === "string" && auth) {
          // cl = Check-in List
          void CheckinList(id, auth)
            .then((clRaw) => {
              const cl = TeacherCheckinListResponseSchema.try(clRaw);
              if (cl instanceof ValidationError) {
                return Promise.reject(new Error("無法取得簽到資料。"));
              }
              setCheckinList(cl);
              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        break;
      }
      case Stage.SYNC_LIST: {
        if (typeof id === "string" && auth) {
          void SyncCourseMembers(Number(id), auth)
            .then((success) => {
              if (!success)
                return Promise.reject(new Error("無法更新學生名單。"));
              setStage(Stage.READY);
              return undefined;
            })
            .catch(catcher);
        }
        break;
      }
      case Stage.READY:
        if (initiateStage === InitiateStage.END) {
          // InitiateStage effect would call functions in Stage,
          // so we don't reset the NProgress if InitialStage
          // was not set up.
          //
          // But we will not set the stage to Stage.INITIATE
          // automatically, since InitialStage need a flag
          // to know if this asynchronous function has done.
          NProgress.done();
        }
        break;
      case Stage.FAILED:
      default:
        break;
    }
  });

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
            <h1 className="text-2xl">{}</h1>
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
              onClick={() => {
                setStage(Stage.SHARE_TO_CLASSROOM);
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
              onClick={() => {
                setStage(Stage.END_CHECKIN);
              }}
              disabled={shouldLock()}
            >
              結束簽到
            </BaseButton>
          </div>
        </section>
        <section>
          <div className="flex justify-end mt-3">
            <BaseButton disabled={shouldLock()}>更新學生名單</BaseButton>
          </div>
          <table className="w-full table-text-lg table-py-4 table-px-4 md:table-px-12">
            <thead>
              <tr className="border-b border-gray-500">
                <th>簽到</th>
                <th>座號姓名</th>
                <th>簽到時間</th>
              </tr>
            </thead>
            <tbody>
              {checkinList.map((stu) => (
                <tr key={stu.checkin_id}>
                  <td>{getCheckinStatusIcon(stu.state)}</td>
                  <td>
                    {`${
                      stu.class === "" ? "" : `${stu.number} - ${stu.number}`
                    }${stu.name}`}
                  </td>
                  <td>{stu.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </BasePage>
  );
}
