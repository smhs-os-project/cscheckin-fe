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

export default function HeaderCard({
  icon = faStickyNote,
  title,
  desc,
  headerColor = "black",
  contentPadding = true,
  children,
}: HeaderCardProps) {
  const c = (css: string, determination?: boolean) =>
    determination ? css : "";
  const needContentPadding = c("px-4 py-10 md:px-20 md:py-10", contentPadding);

  return (
    <BaseCard>
      <div className="flex flex-col items-center justify-items-center">
        <section
          className={`flex items-center space-x-4 w-full px-4 py-10 text-white bg-${headerColor} md:px-20 md:py-10 page-title`}
        >
          <div>
            <FontAwesomeIcon icon={icon} size="3x" />
          </div>
          <div>
            <h1 className="pb-1 text-2xl font-bold">{title}</h1>
            <p className="text-lg font-medium max-w-96 break-all">{desc}</p>
          </div>
        </section>

        <section className={`w-full ${needContentPadding}`}>{children}</section>
      </div>
    </BaseCard>
  );
}
