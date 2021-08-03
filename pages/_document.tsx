import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../utilities/Analytics/analytics";
import { ENABLE_GA } from "../consts";

export default class MyDocument extends Document {
  // Before Next.js fixed the "override" issue, we ignore it currently.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render() {
    return (
      <Html>
        <Head>
          {ENABLE_GA && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <noscript
            style={{
              fontSize: "72px",
              fontWeight: "bold",
            }}
          >
            請勿關閉 JavaScript 功能！
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
