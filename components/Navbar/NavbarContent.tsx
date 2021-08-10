import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import React from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BaseButton from "../Elements/Button/BaseButton";
import { useUserInfo } from "../Http/sdk_auth_methods";
import type AuthenticatedPageProps from "../Database/AuthStore/AuthenticatedPageProps";
import DivItemsCenter from "../Layout/DivItemsCenter";
import useAuth from "../Database/AuthStore/useAuth";

export enum NavbarContentVariant {
  HOMEPAGE,
  NOT_LOGGED_IN,
  LOGGED_IN,
  NONE,
}

export interface NavbarContentProps {
  variant?: NavbarContentVariant;
}

function HomepageVariant() {
  return (
    <Link href="/welcome">
      <BaseButton solid>開始使用！</BaseButton>
    </Link>
  );
}

function NotLoggedInVariant() {
  return (
    <>
      <Link href="/sso/teacher">
        <BaseButton solid>登入來建立簽到連結</BaseButton>
      </Link>
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
              className="rounded-full w-12 h-12 bg-contain"
              style={{
                backgroundImage: `url('${userInfo.photo}')`,
              }}
            />
            <div>{userInfo.name}</div>
          </DivItemsCenter>
        </div>
      )}
      <Link href="/checkin/manage">
        <BaseButton solid className="flex space-x-3">
          <div>
            <FontAwesomeIcon icon={faLink} />
          </div>
          <div>管理簽到連結</div>
        </BaseButton>
      </Link>
      <Link href="/config">
        <BaseButton>設定</BaseButton>
      </Link>
    </>
  );
}

function Container({ children }: { children: ReactNode }) {
  return <div className="flex items-center space-x-2">{children}</div>;
}

export default function NavbarContent({
  variant = NavbarContentVariant.NONE,
}: NavbarContentProps) {
  const { auth } = useAuth();

  return (
    <Container>
      {variant === NavbarContentVariant.HOMEPAGE && <HomepageVariant />}
      {variant === NavbarContentVariant.LOGGED_IN && auth && (
        <LoggedInVariant auth={auth} />
      )}
      {variant === NavbarContentVariant.NOT_LOGGED_IN && <NotLoggedInVariant />}
    </Container>
  );
}
