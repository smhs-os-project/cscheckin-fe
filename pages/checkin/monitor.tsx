import React from "react";
import BaseButton from "../../components/BaseElements/BaseButton";
import BasePage from "../../components/Page/BasePage";

export default function Create() {
  return (
    <BasePage id="create-and-monitor" title="建立與監控簽到連結" full>
      <div className="flex flex-col items-center justify-around md:items-baseline md:flex-row">
        <section className="flex flex-col items-center content-center justify-center mb-5 shadow rounded-xl w-max">
          <div className="p-4 text-center link-section">
            <label htmlFor="#checkin-link" className="block text-xl text-align">
              把簽到連結擴散出去吧！
              <input
                type="input"
                className="block mt-4 font-mono text-2xl border-b border-black outline-none"
                placeholder="https://arikf.com"
                id="checkin-link"
                readOnly
              />
            </label>
          </div>
          <div className="flex flex-col self-center p-4 mb-4 space-x-0 space-y-2 text-center md:space-y-0 md:space-x-2 md:flex-row justify-self-center">
            <BaseButton solid>分享到 Classroom</BaseButton>
            <BaseButton>單純複製連結</BaseButton>
          </div>
        </section>
        <section>
          <table className="w-full table-text-xl table-py-4 table-px-4 md:table-px-12">
            <thead>
              <tr className="border-b border-gray-500">
                <th>簽到</th>
                <th>座號姓名</th>
                <th>簽到時間</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>✅</td>
                <td>1 - 潘奕濬</td>
                <td>19:08:00</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </BasePage>
  );
}
