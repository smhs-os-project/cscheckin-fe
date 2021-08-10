import React from "react";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import BaseButton from "../../../Elements/Button/BaseButton";

export enum StatusCardStatus {
  OPEN,
  LATE,
  CLOSE,
}

export interface StatusCardProps {
  status: StatusCardStatus;
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
      description="開放點名中"
    />
  );
}

function LateStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-neutral"
      icon={faExclamationTriangle}
      description="後續學生遲到"
    />
  );
}

function CloseStatusCard() {
  return (
    <BaseStatusCard
      backgroundColor="bg-negative"
      icon={faTimesCircle}
      description="已結束簽到"
    />
  );
}

export default function StatusCard({ status }: StatusCardProps) {
  switch (status) {
    case StatusCardStatus.OPEN:
      return <OpenStatusCard />;
    case StatusCardStatus.LATE:
      return <LateStatusCard />;
    case StatusCardStatus.CLOSE:
      return <CloseStatusCard />;
    default:
      return null;
  }
}
