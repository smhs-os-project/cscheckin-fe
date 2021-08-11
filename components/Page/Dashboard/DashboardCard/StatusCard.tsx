import React from "react";
import {
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import Link from "next/link";
import BaseButton from "../../../Elements/Button/BaseButton";

export interface StatusCardProps {
  classroomId: string;
  status?: CheckinState;
}

function RegenerateLinkButton({
  classroomId,
}: Pick<StatusCardProps, "classroomId">) {
  if (classroomId && classroomId.length)
    return (
      <Link href={`/checkin/manage/new/${classroomId}/now`}>
        <BaseButton
          textColor="text-secondary"
          borderColor="border-transparent-secondary"
        >
          重新產生連結
        </BaseButton>
      </Link>
    );

  return null;
}

interface BaseStatusCardProps {
  backgroundColor: string;
  icon: IconDefinition;
  description: string;
  classroomId: string;
}

function BaseStatusCard({
  backgroundColor,
  icon,
  description,
  classroomId,
}: BaseStatusCardProps) {
  return (
    <section
      className={`${backgroundColor} flex flex-col sm:flex-row justify-between items-center p-8 text-secondary`}
    >
      <div className="flex items-center space-x-8 font-header mb-4 sm:mb-0">
        <div className="text-h1">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="text-h2">{description}</div>
      </div>
      <div>
        <RegenerateLinkButton classroomId={classroomId} />
      </div>
    </section>
  );
}

function OpenStatusCard({
  classroomId,
}: Pick<BaseStatusCardProps, "classroomId">) {
  return (
    <BaseStatusCard
      backgroundColor="bg-accent"
      icon={faCheckCircle}
      description="開放簽到中"
      classroomId={classroomId}
    />
  );
}

function LateStatusCard({
  classroomId,
}: Pick<BaseStatusCardProps, "classroomId">) {
  return (
    <BaseStatusCard
      backgroundColor="bg-neutral"
      icon={faExclamationTriangle}
      description="後續學生算遲到"
      classroomId={classroomId}
    />
  );
}

function UnknownStatusCard({
  classroomId,
}: Pick<BaseStatusCardProps, "classroomId">) {
  return (
    <BaseStatusCard
      backgroundColor="bg-primary"
      icon={faSpinner}
      description="正在載入資料⋯⋯"
      classroomId={classroomId}
    />
  );
}

function CloseStatusCard({
  classroomId,
}: Pick<BaseStatusCardProps, "classroomId">) {
  return (
    <BaseStatusCard
      backgroundColor="bg-negative"
      icon={faTimesCircle}
      description="簽到已結束"
      classroomId={classroomId}
    />
  );
}

export default function StatusCard({ status, classroomId }: StatusCardProps) {
  switch (status) {
    case CheckinState.ON_TIME:
      return <OpenStatusCard classroomId={classroomId} />;
    case CheckinState.LATE:
      return <LateStatusCard classroomId={classroomId} />;
    case CheckinState.NOT_CHECKED_IN:
      return <CloseStatusCard classroomId={classroomId} />;
    default:
      return <UnknownStatusCard classroomId={classroomId} />;
  }
}
