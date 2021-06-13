import React, { useState } from "react";
import BaseButton from "../../components/BaseElements/BaseButton";

import BaseInput from "../../components/BaseElements/BaseInput";
import BasePage from "../../components/Page/BasePage";

export default function UserRegister() {
  const [theClass, setTheClass] = useState("");
  const [no, setNo] = useState("");

  return (
    <BasePage id="user-register" title="使用者註冊" full>
      <BaseInput
        id="no-field"
        label="班級"
        placeholder="ex. 101"
        value={theClass}
        onChange={setTheClass}
      />
      <BaseInput
        id="no-field"
        label="座號"
        placeholder="ex. 13"
        value={no}
        onChange={setNo}
      />
      <BaseButton className="mt-5" solid>
        註冊 REGISTER
      </BaseButton>
    </BasePage>
  );
}
