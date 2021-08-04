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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
