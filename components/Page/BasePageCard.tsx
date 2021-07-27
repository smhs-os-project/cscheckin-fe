import type { ReactNode } from "react";
import React from "react";
import BaseCard from "../Elements/Card/BaseCard";
import BasePage from "./BasePage";

export interface BasePageProps {
  id: string;
  children: ReactNode;
  title: string;
}

export default function BasePageCard({ title, id, children }: BasePageProps) {
  return (
    <BasePage title={title} id={id}>
      <div className="flex content-center justify-center">
        <BaseCard>{children}</BaseCard>
      </div>
    </BasePage>
  );
}
