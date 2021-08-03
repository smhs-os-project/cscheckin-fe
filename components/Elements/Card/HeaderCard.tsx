import type { ReactNode } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import BaseCard from "./BaseCard";

export interface HeaderCardProps {
  title: string;
  desc: string;
  icon: IconDefinition;
  children: ReactNode;
  headerColor?: string;
  contentPadding?: boolean;
}

export interface HeaderCardHeaderProps {
  title: string;
  desc: string;
  icon: IconDefinition;
  headerColor?: string;
}

function HeaderCardHeader({
  icon = faStickyNote,
  title,
  desc,
  headerColor = "bg-primary",
}: HeaderCardHeaderProps) {
  return (
    <section
      className={`flex items-center space-x-12 w-full text-secondary ${headerColor} px-card-x py-card-y page-title tracking-header`}
    >
      <div>
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>
      <div>
        <h1 className="pb-1 text-h1 font-header">{title}</h1>
        <p className="text-h2 font-medium max-w-96 break-all">{desc}</p>
      </div>
    </section>
  );
}

export default function HeaderCard({
  icon = faStickyNote,
  title,
  desc,
  headerColor = "bg-primary",
  contentPadding = true,
  children,
}: HeaderCardProps) {
  const c = (css: string, determination?: boolean) =>
    determination ? css : "";
  const needContentPadding = c("px-card-x py-card-y", contentPadding);

  return (
    <BaseCard>
      <HeaderCardHeader
        title={title}
        desc={desc}
        icon={icon}
        headerColor={headerColor}
      />
      <section className={`w-full ${needContentPadding}`}>{children}</section>
    </BaseCard>
  );
}
