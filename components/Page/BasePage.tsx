import React from "react";
import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import { PRODUCT_NAME } from "../../consts";

export interface BasePageProps {
  children: ReactNode;
  full?: boolean;
  title: string;
  navbar?: boolean;
}

export default function BasePage({
  title,
  full = false,
  navbar = true,
  children,
}: BasePageProps) {
  const fullScreenClass = full ? "w-screen h-screen" : "";
  const fullClass = full ? "w-full h-full h-screen" : "";

  return (
    <section className={`page-root ${fullScreenClass}`}>
      <Head>
        <title>
          {PRODUCT_NAME} - {title}
        </title>
      </Head>
      {navbar && (
        <section>
          <Navbar />
        </section>
      )}
      <section className={`p-8 ${fullClass}`}>{children}</section>
    </section>
  );
}
