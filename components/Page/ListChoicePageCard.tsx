import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import randBackgroundColor from "../../utilities/randcolor";

import HeaderPageCard from "./HeaderPageCard";

export interface CheckinCreateProps {
  id: string;
  title: string;
  desc: string;
  /**
   * The choices.
   *
   * Example:
   *
   * ```tsx
   * <CheckinCreateProps {...props}>{
   *  [
   *    {
   *      id: "",
   *      name: "",
   *      redirect: () => ...,
   *    }
   *  ]
   * }</CheckinCreateProps>
   * ```
   */
  children: {
    id: string;
    name: string;
    redirect: () => void;
  }[];
}

export default function CheckinCreate({
  id: pid,
  title,
  desc,
  children: content,
}: CheckinCreateProps) {
  return (
    <HeaderPageCard id={pid} title={title} desc={desc} contentPadding={false}>
      <div className="flex flex-col w-full options">
        {content.map(({ id: cid, name, redirect }) => (
          <div key={`${pid}-${cid}`}>
            <button
              className={`w-full px-6 py-10 text-left outline-none text-black hover:text-white transition-all duration-300 rounded-none ${randBackgroundColor(
                true
              )}`}
              type="button"
              onClick={redirect}
            >
              <div className="flex justify-between">
                <div>{name}</div>
                <div>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </HeaderPageCard>
  );
}
