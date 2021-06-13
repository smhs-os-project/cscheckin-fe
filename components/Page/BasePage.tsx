import React from "react";
import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "../../styles/BasePage.module.css";

export interface BasePageProps {
  id: string;
  children: ReactNode;
  full?: boolean;
  title: string;
}

export default function BasePage({
  title,
  id,
  full = false,
  children,
}: BasePageProps) {
  return (
    <>
      <Head>
        <title>Inficast - {title}</title>
      </Head>
      <div
        className={`page-root page-${id} grid ${styles.basepageGrid} ${
          full && "w-screen h-screen"
        }`}
      >
        <div
          className={`page-${id}`}
          style={{
            gridArea: "navbar",
          }}
        >
          <Navbar />
        </div>
        <div
          className={`p-8 ${full && "h-full w-full"}`}
          style={{
            gridArea: "content",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
