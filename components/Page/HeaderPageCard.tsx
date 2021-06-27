import type { ReactNode } from "react";
import React from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import HeaderCard from "../Card/HeaderCard";
import BasePage from "./BasePage";

export interface TitlePageCardProps {
  id: string;
  title: string;
  desc: string;
  headerColor?: string;
  icon: IconDefinition;
  children: ReactNode;
  contentPadding?: boolean;
}

export default function TitlePageCard({
  id,
  title,
  desc,
  icon,
  headerColor,
  children,
  contentPadding = true,
}: TitlePageCardProps) {
  return (
    <BasePage id={id} title={title}>
      <div className="flex content-center justify-center">
        <HeaderCard
          title={title}
          desc={desc}
          icon={icon}
          headerColor={headerColor}
          contentPadding={contentPadding}
        >
          {children}
        </HeaderCard>
      </div>
    </BasePage>
  );
}
