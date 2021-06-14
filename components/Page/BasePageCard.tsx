import React from "react";
import type { ReactNode } from "react";
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
        <div className="overflow-hidden rounded shadow-lg main-content md:w-max">
          {children}
        </div>
      </div>
    </BasePage>
  );
}
