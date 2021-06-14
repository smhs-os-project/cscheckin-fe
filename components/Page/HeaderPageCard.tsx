import type { ReactNode } from "react";
import React from "react";

import BasePageCard from "./BasePageCard";

export interface TitlePageCardProps {
  id: string;
  title: string;
  desc: string;
  children: ReactNode;
  contentPadding?: boolean;
}

export default function TitlePageCard({
  id,
  title,
  desc,
  children,
  contentPadding = true,
}: TitlePageCardProps) {
  const c = (css: string, determination?: boolean) =>
    determination ? css : "";
  const needContentPadding = c("px-4 py-10 md:px-20 md:py-10", contentPadding);

  return (
    <BasePageCard id={id} title={title}>
      <div className="flex flex-col items-center justify-items-center">
        <section className="flex w-full px-4 py-10 text-white bg-black md:px-20 md:py-10 page-title">
          <div>
            <h1 className="pb-1 text-3xl font-bold">{title}</h1>
            <p className="pb-4 text-xl">{desc}</p>
          </div>
        </section>

        <section className={`w-full ${needContentPadding} ${id}-root`}>
          {children}
        </section>
      </div>
    </BasePageCard>
  );
}
