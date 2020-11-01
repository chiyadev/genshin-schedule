import React, { memo } from "react";
import { useLocalConfig } from "../../../configs";
import { FaSignOutAlt } from "react-icons/fa";
import { trackEvent } from "../../../track";

export const SignOutDesc = "Sign out";

const SignOut = () => {
  const [auth, setAuth] = useLocalConfig("auth");

  if (!auth) {
    return null;
  }

  return (
    <button
      className="bg-gray-700 rounded px-2 py-1"
      onClick={() => {
        setAuth(false);
        trackEvent("sync", "disable");
      }}
    >
      <FaSignOutAlt className="inline" />
      <span className="align-middle">
        <span> {SignOutDesc}: </span>
        <em>{auth.username}</em>
      </span>
    </button>
  );
};

export default memo(SignOut);
