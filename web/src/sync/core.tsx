import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  ConfigKeys,
  getConfigs,
  setConfigs,
  useLocalConfig,
  useLocalStorageListener,
} from "../configs";
import { SyncRequest, SyncResponse, WebData } from "./types";
import { css, cx } from "emotion";
import { FaSpinner } from "react-icons/fa";
import { createPatch } from "rfc6902";
import { Lock } from "semaphore-async-await";

const Core = ({
  authToken,
  reset,
}: {
  authToken: string;
  reset: () => void;
}) => {
  const [apiUrl] = useLocalConfig("apiUrl");
  const [current, setCurrent] = useState<WebData>();

  useEffect(() => {
    (async () => {
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

        const data = (await response.json()) as WebData;

        setCurrent(data);
        setConfigs(data.data);
      } catch (e) {
        console.error("could not retrieve sync data", e);

        reset();
      }
    })();
  }, [apiUrl, authToken, reset]);

  const [sync, setSync] = useState(false);
  const syncLock = useMemo(() => new Lock(), []);
  const syncTimeout = useRef<number>();

  useEffect(() => clearTimeout(syncTimeout.current), [current]);

  useLocalStorageListener((key) => {
    if (!ConfigKeys.includes(key as any)) return;

    clearTimeout(syncTimeout.current);
    syncTimeout.current = window.setTimeout(async () => {
      await syncLock.acquire();
      setSync(true);

      try {
        if (!current) return;

        const newData = getConfigs();
        const patch: SyncRequest = {
          patch: createPatch(current.data, newData),
          token: current.token,
        };

        if (!patch.patch.length) return;

        const response = await fetch(`${apiUrl}/sync`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(patch),
        });

        if (response.status === 400) {
          const data = (await response.json()) as WebData;

          setCurrent(data);
          setConfigs(data.data);
        } else {
          if (!response.ok) {
            throw Error(await response.text());
          }

          const { token } = (await response.json()) as SyncResponse;

          setCurrent({ data: newData, token });
        }
      } catch (e) {
        console.error("could not send sync patch", e);
      } finally {
        syncLock.release();
        setSync(false);
      }
    }, 1000);
  });

  if (!current) {
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
