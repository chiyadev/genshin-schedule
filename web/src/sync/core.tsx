import React, { memo, useEffect, useRef, useState } from "react";
import {
  ConfigKeys,
  Configs,
  getConfigs,
  setConfigs,
  useLocalConfig,
  useLocalStorageListener,
} from "../configs";
import { SyncRequest, SyncResponse, WebData } from "./types";
import { css, cx } from "emotion";
import { FaSpinner } from "react-icons/fa";
import { createPatch, Patch } from "rfc6902";

const Core = ({
  authToken,
  reset,
}: {
  authToken: string;
  reset: () => void;
}) => {
  // create patches on change events
  const [last, setLast] = useState<Partial<Configs>>();

  const patchQueue = useRef<Patch>([]);
  const patchTimeout = useRef<number>();

  useLocalStorageListener((key) => {
    if (!ConfigKeys.includes(key as any)) return;

    clearTimeout(patchTimeout.current);

    patchTimeout.current = window.setTimeout(() => {
      if (!last) return;

      const current = getConfigs();
      const patch = createPatch(last, current);

      setLast(current);
      patchQueue.current.push(...patch);
    }, 1000);
  });

  // send patches asynchronously
  const [apiUrl] = useLocalConfig("apiUrl");
  const [sync, setSync] = useState<boolean>();

  useEffect(() => {
    let mounted = true;

    (async () => {
      // sync token
      let token: string;

      // load initial data
      try {
        const response = await fetch(`${apiUrl}/sync`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw Error(await response.text());
        }

        let data: Partial<Configs>;
        ({ data, token } = (await response.json()) as WebData);

        setLast(data);
        setConfigs(data);
        setSync(false);
      } catch (e) {
        console.error("could not retrieve sync data", e);

        reset();
        return;
      }

      // enter sync loop
      while (mounted) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          if (!patchQueue.current.length) {
            continue;
          }

          setSync(true);

          const request: SyncRequest = {
            patch: patchQueue.current,
            token,
          };

          patchQueue.current = [];

          const response = await fetch(`${apiUrl}/sync`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(request),
          });

          // token mismatch; overwrite local data
          if (response.status === 400) {
            let data: Partial<Configs>;
            ({ data, token } = (await response.json()) as WebData);

            setLast(data);
            setConfigs(data);

            patchQueue.current = [];
          }

          // patch success
          else if (response.ok) {
            ({ token } = (await response.json()) as SyncResponse);
          }

          // patch fail
          else {
            throw Error(await response.text());
          }
        } catch (e) {
          console.log("could not send sync patch", e);
        } finally {
          setSync(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [apiUrl, authToken, reset]);

  if (typeof sync === "undefined") {
    return (
      <div
        className={cx(
          "top-0 left-0 w-screen h-screen fixed bg-black opacity-75",
          css`
            z-index: 9999;
          `
        )}
      >
        <div
          className={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          <FaSpinner className="animate-spin text-xl" />
        </div>
      </div>
    );
  }

  if (sync) {
    return (
      <div className="top-0 left-0 w-screen fixed flex flex-row justify-center p-1">
        <div className="bg-white text-black text-xs shadow-lg rounded p-1">
          <FaSpinner className="inline animate-spin" />
          <span className="align-middle"> Saving...</span>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(Core);
