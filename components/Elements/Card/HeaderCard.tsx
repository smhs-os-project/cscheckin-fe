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
  const flexDefaultCSS =
    "flex flex-col content-center items-center justify-items-center space-y-2";
  const flexMediumCSS = "md:flex-row md:space-x-12 md:space-y-0";
  const textDefaultCSS = "text-center";
  const textMediumCSS = "md:text-left";

  return (
    <section
      className={`${flexDefaultCSS} ${flexMediumCSS} ${textDefaultCSS} ${textMediumCSS} w-full text-secondary ${headerColor} px-16 py-16 tracking-header`}
    >
      <div className="mb-2 md:mb-0">
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
  const needContentPadding = c("px-16 pt-16 pb-8 md:py-16", contentPadding);

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
