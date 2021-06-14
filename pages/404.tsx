import Link from "next/link";
import React from "react";
import BasePage from "../components/Page/BasePage";
import "jetbrains-mono-webfont";

export default function NotFoundPage() {
  return (
    <BasePage id="not-found" title="404 找不到頁面">
      <section className="not-found-title">
        <div className="p-3 mb-4 font-mono text-4xl font-black text-white bg-black rounded opacity-70 w-max">
          &gt; 404
        </div>
        <h2 className="mb-3 text-2xl font-bold">找不到頁面。</h2>
      </section>
      <section className="leading-relaxed not-found-suggestion">
        <p>試試看：</p>
        <ul className="list-disc ml-9">
          <li>
            <div className="text-blue-700">
              <Link href="/">回到首頁？</Link>
            </div>
          </li>
        </ul>
      </section>
    </BasePage>
  );
}
