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

        <div className="text-xs">
          {error ? (
            <span className="text-red-600">Error: {error.message}</span>
          ) : (
            <span className="text-gray-600">
              * Never reuse your miHoYo password on Genshin-related websites.{" "}
              <a
                className="text-blue-600"
                href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
              >
                Read more.
              </a>
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default memo(Body);
