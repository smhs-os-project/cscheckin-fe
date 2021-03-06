import React from "react";
import dynamic from "next/dynamic";
import type { HeaderPageCardProps } from "./HeaderPageCard";
import HeaderPageCard from "./HeaderPageCard";

const FullWidthButton = dynamic(
  () => import("../Elements/Button/FullWidthButton")
);

export interface ListChoicePageCardProps
  extends Omit<HeaderPageCardProps, "children"> {
  /**
   * The choices.
   *
   * Example:
   *
   * ```tsx
   * <ListChoicePageCard {...props} choice={
   *  [
   *    {
   *      id: "",
   *      name: "",
   *      redirect: () => ...,
   *    }
   *  ]
   * } />
   * ```
   */
  choice: {
    id: string;
    name: string;
    redirect: () => void;
  }[];
  message?: string | null;
}

export default function ListChoicePageCard({
  title,
  desc,
  icon,
  choice,
  message,
  full,
  navbar,
}: ListChoicePageCardProps) {
  const noContent = choice.length === 0;
  const hasMessage = !!message;

  return (
    <HeaderPageCard
      title={title}
      desc={desc}
      icon={icon}
      full={full}
      navbar={navbar}
    >
      <div className="flex flex-col w-full options space-y-5">
        {(() => {
          // if user specified the message
          if (hasMessage) {
            return <p>{message}</p>;
          }

          // if there is no any content
          if (noContent) {
            return <p>無資料。</p>;
          }

          return choice.map(({ id: cid, name, redirect }) => (
            <div key={`${title}-${cid}`}>
              <FullWidthButton rightIcon onClick={redirect}>
                {name}
              </FullWidthButton>
            </div>
          ));
        })()}
      </div>
    </HeaderPageCard>
  );
}
