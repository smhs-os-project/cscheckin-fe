import Link from "next/link";
import React, { useEffect } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import useQueryParam from "../components/Hooks/useQueryParam";
import { reportExceptionMessage } from "../utilities/ErrorReporting/reportExceptionMessage";

export default function NotFoundPage() {
  const router = useRouter();
  const { value: descriptionValue, loading: descriptionLoading } =
    useQueryParam("description");

  useEffect(() => {
    if (!descriptionLoading)
      reportExceptionMessage("有人嘗試進入不存在的頁面。", {
        path: router.asPath,
        receivedDescription: descriptionValue,
      });
  }, [descriptionValue, descriptionLoading]);

  return (
    <HeaderPageCard
      title="404 找不到頁面"
      desc={descriptionValue ?? "您請求的頁面不存在。"}
      icon={faTimesCircle}
    >
      <div className="not-found-suggestion leading-relaxed">
        <p>試試看：</p>
        <ul className="list-disc ml-9">
          <li>
            <div className="text-blue-700">
              <Link href="/">回到首頁？</Link>
            </div>
          </li>
        </ul>
      </div>
    </HeaderPageCard>
  );
}
