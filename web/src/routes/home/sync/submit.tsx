import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { cx } from "emotion";
import { useLocalConfig } from "../../../configs";
import { AuthRequest, AuthResponse } from "../../../sync/types";
import { trackEvent } from "../../../track";

const Submit = ({
  username,
  password,
  setError,
}: {
  username: string;
  password: string;
  setError: Dispatch<SetStateAction<Error | undefined>>;
}) => {
  const [apiUrl] = useLocalConfig("apiUrl");
  const [, setAuth] = useLocalConfig("auth");

  const [load, setLoad] = useState(false);

  return (
    <button
      type="submit"
      className={cx({ "text-gray-600": load || !password })}
      disabled={load || !password}
      onClick={async () => {
        setLoad(true);

        try {
          const request: AuthRequest = { username, password };

          const response = await fetch(`${apiUrl}/auth`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(request),
          });

          if (!response.ok) {
            throw Error(await response.text());
          }

          const { token, user } = (await response.json()) as AuthResponse;

          setAuth({
            token,
            username: user.username,
          });

          setError(undefined);

          trackEvent("sync", "enable");
        } catch (e) {
          setError(e);
        } finally {
          setLoad(false);
        }
      }}
    >
      <FaSignInAlt className="inline" />
      <span className="align-middle"> {load ? "Loading" : "Submit"}</span>
    </button>
  );
};

export default memo(Submit);
