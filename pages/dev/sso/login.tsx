import React from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

export default function Login() {
  return (
    <HeaderPageCard
      id="home"
      title="登入 CSC 簽到系統"
      desc="登入一次，簽到無數次。"
      icon={faKey}
    >
      Hi!
    </HeaderPageCard>
  );
}
