import Form from "./form";
import React, { memo, useEffect, useState } from "react";
import { randomStr, randomWord } from "../../../random";
import Submit from "./submit";

function generateUsername() {
  return `${randomWord()}_${randomWord()}_${randomStr(3)}`.toLowerCase();
}

const Body = () => {
  const [username, setUsername] = useState(generateUsername);
  const [password, setPassword] = useState("");

  const [error, setError] = useState<Error>();

  useEffect(() => {
    !password && setError(undefined);
  }, [password]);

  return (
    <form className="space-y-4">
      <div className="text-sm">
        Signing in allows your Genshin Schedule data including resin, tasks and
        domains to be synchronized across devices.
      </div>

      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />

      <div className="text-sm space-y-2">
        <Submit username={username} password={password} setError={setError} />

        {password && (
          <div className="text-xs text-red-600">
            {error ? (
              <span>{error.message}</span>
            ) : (
              <span>Note: This is not an official miHoYo authorization.</span>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default memo(Body);
