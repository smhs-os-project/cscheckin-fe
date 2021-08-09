import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../Elements/Button/BaseButton";
import DivItemsCenter from "../Layout/DivItemsCenter";
import useAuth from "../Database/AuthStore/useAuth";
import type AuthenticatedPageProps from "../Database/AuthStore/AuthenticatedPageProps";
import { useUserInfo } from "../Http/sdk_auth_methods";

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

function LoggedInVariant({ auth }: AuthenticatedPageProps) {
  const { data: userInfo } = useUserInfo(auth);

  return (
    <>
      {userInfo && (
        <div className="font-button tracking-button mr-4">
          <DivItemsCenter>
            <div
              className="rounded-xl w-12 h-12 bg-contain"
              style={{
                backgroundImage: `url('${userInfo.photo}')`,
              }}
            />
            <div>{userInfo.name}</div>
          </DivItemsCenter>
        </div>
      )}
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
  const { auth, pending } = useAuth();

  if (!pending)
    return (
      <div className="flex items-center space-x-2">
        {variant === NavbarContentVariant.HOMEPAGE && <HomepageVariant />}
        {variant === NavbarContentVariant.NOT_LOGGED_IN && (
          <NotLoggedInVariant />
        )}
        {variant === NavbarContentVariant.LOGGED_IN && auth && (
          <LoggedInVariant auth={auth} />
        )}
      </div>
    );

  return null;
}
