import React from "react";
import Head from "next/head";
import type { ReactNode } from "react";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <section className={`p-8 md:max-w-6xl mx-auto ${fullClass}`}>
        {children}
      </section>
      <section className="fixed right-4 bottom-4">
        <div className="flex items-center mr-4 space-x-4">
          <div className="invisible md:visible" />
          <div className="inline p-1">
            <span className="invisible md:visible">Powered by </span>
            <span className="text-accent">
              ▲
              <a href="https://vercel.com/?utm_source=smhs-os-project&utm_campaign=oss">
                Vercel
              </a>
            </span>
          </div>
          <div className="inline">
            <a className="text-accent" href="https://cscin.tk/?action=feedback">
              <FontAwesomeIcon icon={faBug} size="sm" />
              <span className="hidden md:inline"> 意見回饋</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
