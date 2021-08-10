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
import BaseButton from "../../../Elements/Button/BaseButton";

export interface StatusCardProps {
  status?: CheckinState;
}

function RegenerateLinkButton() {
  return (
    <BaseButton
      textColor="text-secondary"
      borderColor="border-transparent-secondary"
    >
      重新產生連結
    </BaseButton>
  );
}

interface BaseStatusCardProps {
  backgroundColor: string;
  icon: IconDefinition;
  description: string;
}

function BaseStatusCard({
  backgroundColor,
  icon,
  description,
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
        <RegenerateLinkButton />
      </div>
    </section>
  );
}

function OpenStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-accent"
      icon={faCheckCircle}
      description="開放簽到中"
    />
  );
}

function LateStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-neutral"
      icon={faExclamationTriangle}
      description="後續學生算遲到"
    />
  );
}

function UnknownStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-primary"
      icon={faSpinner}
      description="正在載入資料⋯⋯"
    />
  );
}

function CloseStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-negative"
      icon={faTimesCircle}
      description="簽到已結束"
    />
  );
}

export default function StatusCard({ status }: StatusCardProps) {
  switch (status) {
    case CheckinState.ON_TIME:
      return <OpenStatusCard />;
    case CheckinState.LATE:
      return <LateStatusCard />;
    case CheckinState.NOT_CHECKED_IN:
      return <CloseStatusCard />;
    default:
      return <UnknownStatusCard />;
  }
}
