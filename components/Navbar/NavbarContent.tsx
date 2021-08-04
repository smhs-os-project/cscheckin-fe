import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../Elements/Button/BaseButton";

export enum NavbarContentVariant {
  HOMEPAGE,
  NOT_LOGGED_IN,
  LOGGED_IN,
}

export interface NavbarContentProps {
  variant?: NavbarContentVariant;
}

function HomepageVariant() {
  return (
    <>
      <BaseButton solid>開始使用！</BaseButton>
    </>
  );
}

function NotLoggedInVariant() {
  return (
    <>
      <BaseButton solid>登入來建立簽到連結</BaseButton>
    </>
  );
}

function LoggedInVariant() {
  return (
    <>
      <BaseButton solid className="flex space-x-3">
        <div>
          <FontAwesomeIcon icon={faLink} />
        </div>
        <div>建立簽到連結</div>
      </BaseButton>
      <BaseButton>設定</BaseButton>
    </>
  );
}

export default function NavbarContent({
  variant = NavbarContentVariant.NOT_LOGGED_IN,
}: NavbarContentProps) {
  return (
    <div className="flex items-center space-x-2">
      {variant === NavbarContentVariant.HOMEPAGE && <HomepageVariant />}
      {variant === NavbarContentVariant.NOT_LOGGED_IN && <NotLoggedInVariant />}
      {variant === NavbarContentVariant.LOGGED_IN && <LoggedInVariant />}
    </div>
  );
}
