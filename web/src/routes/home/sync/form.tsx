import React, { Dispatch, memo, SetStateAction } from "react";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
}: {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row max-w-lg space-x-2">
        <div className="text-xs text-gray-600 text-right w-20 flex flex-col justify-center">
          Username
        </div>

        <input
          className="text-sm border border-gray-300 rounded px-2 py-1 flex-1"
          value={username}
          onInput={({ currentTarget: { value } }) => setUsername(value)}
        />
      </div>

      <div className="flex flex-row max-w-lg space-x-2">
        <div className="text-xs text-gray-600 text-right w-20 flex flex-col justify-center">
          Password
        </div>

        <input
          type="password"
          className="text-sm border border-gray-300 rounded px-2 py-1 flex-1"
          value={password}
          onInput={({ currentTarget: { value } }) => setPassword(value)}
        />
      </div>
    </div>
  );
};

export default memo(Form);
