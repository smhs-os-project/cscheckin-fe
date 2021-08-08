import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../Elements/Button/BaseButton";
import AuthStore from "../Database/AuthStore";
import UnexpectedGoogleLoginResponse from "../OAuth/Google/exceptions/UnexpectedGoogleLoginResponse";
import DivItemsCenter from "../Layout/DivItemsCenter";

const authStore = AuthStore.getCommonInstance();

export enum NavbarContentVariant {
  HOMEPAGE,
  NOT_LOGGED_IN,
  LOGGED_IN,
}

export interface NavbarContentProps {
  variant?: NavbarContentVariant;
}

interface UserInfo {
  image: string;
  username: string;
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
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    void authStore
      .getAuth()
      .then((cscAuth) => cscAuth.userInfo())
      .then((inUserInfo) => {
        if (inUserInfo)
          return setUserInfo({
            image: inUserInfo.photo,
            username: inUserInfo.name,
          });
        return Promise.reject(new UnexpectedGoogleLoginResponse());
      })
      .catch(() => null);
  }, []);

  return (
    <>
      {userInfo && (
        <div className="font-button tracking-button mr-4">
          <DivItemsCenter>
            <div
              className="rounded-xl w-12 h-12 bg-contain"
              style={{
                backgroundImage: `url('${userInfo.image}')`,
              }}
            />
            <div>{userInfo.username}</div>
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
  return (
    <div className="flex items-center space-x-2">
      {variant === NavbarContentVariant.HOMEPAGE && <HomepageVariant />}
      {variant === NavbarContentVariant.NOT_LOGGED_IN && <NotLoggedInVariant />}
      {variant === NavbarContentVariant.LOGGED_IN && <LoggedInVariant />}
    </div>
  );
}
