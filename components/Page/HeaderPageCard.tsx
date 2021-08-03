import React from "react";
import type { HeaderCardProps } from "../Elements/Card/HeaderCard";
import HeaderCard from "../Elements/Card/HeaderCard";
import type { BasePageProps } from "./BasePage";
import BasePage from "./BasePage";

export interface HeaderPageCardProps extends BasePageProps, HeaderCardProps {}

export default function HeaderPageCard({
  title,
  desc,
  icon,
  headerColor,
  children,
  full,
  navbar,
  contentPadding = true,
}: HeaderPageCardProps) {
  return (
    <BasePage title={title} full={full} navbar={navbar}>
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
