import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Task, useConfig } from "../../../configs";
import { PopupPage } from "../index";
import { Icons, IconSearch, KnownResourceTimers } from "./search";
import Item from "./item";

const IconPage = ({
  setTask,
  setPag,
}: {
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
}) => {
  const [search, setSearch] = useConfig("iconQuery");
  const [scroll, setScroll] = useConfig("iconListScroll");

  const results = useMemo(() => {
    const set = new Set(IconSearch.search(search));

    // preserve display order
    return Icons.filter((icon) => set.has(icon));
  }, [search]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // restore scroll position on init
  useEffect(() => {
    listRef.current?.scrollTo({ top: scroll });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // save scroll position on scroll
  useEffect(() => {
    const handle = () => {
      listRef.current && setScroll(listRef.current.scrollTop);
    };

    const element = listRef.current;
    element?.addEventListener("scroll", handle);
    return () => element?.removeEventListener("scroll", handle);
  }, [setScroll]);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div className="py-2 flex flex-col space-y-2">
      <input
        ref={inputRef}
        value={search}
        onInput={({ currentTarget: { value } }) => setSearch(value)}
        className="text-sm"
        placeholder="Search icons"
      />

      <div ref={listRef} className="w-64 h-32 overflow-y-auto">
        {useMemo(
          () =>
            results.map((icon) => (
              <Item
                key={icon}
                name={icon}
                onClick={() => {
                  const timer = KnownResourceTimers[icon];

                  setTask((task) => ({
                    ...task,
                    name: icon,
                    icon,
                    refreshTime: timer ? timer * 3600000 : task.refreshTime,
                  }));

                  setPage("info");
                }}
              />
            )),
          [results, setPage, setTask]
        )}
      </div>
    </div>
  );
};

export default memo(IconPage);
