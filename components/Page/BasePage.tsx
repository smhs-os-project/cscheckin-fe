import React from "react";
import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import SupportBtn from "../Support/FlowButton";
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
        <title>Cscheckin - {title}</title>
      </Head>
      <section
        className={`page-root page-${id} grid ${styles["basepageGrid"]} ${
          full && "w-screen h-screen"
        }`}
      >
        <section
          className={`page-${id}`}
          style={{
            gridArea: "navbar",
          }}
        >
          <Navbar />
        </section>
        <section
          className={`p-8 ${full && "h-full w-full"}`}
          style={{
            gridArea: "content",
          }}
        >
          {children}
        </section>
        <section
          className="fixed bottom-5 right-5"
        >
          <SupportBtn />
        </section>
      </section>
    </>
  );
}
