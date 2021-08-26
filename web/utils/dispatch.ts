import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";

function arrayCompare<T>(a: T[], b: T[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export function useListDispatch<T extends { id: string }>(
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>
): [T, Dispatch<SetStateAction<T>>, () => void][] {
  let ids = items.map((item) => item.id);
  const idCache = useRef(ids);

  // if array of ids didn't change at all, setter functions can be reused
  if (arrayCompare(ids, idCache.current)) {
    ids = idCache.current;
  } else {
    idCache.current = ids;
  }

  const itemSetters: Dispatch<SetStateAction<T>>[] = useMemo(() => {
    return ids.map((id) => {
      return (newValue) => {
        setItems((items) => {
          return items.map((oldValue) => {
            if (oldValue.id === id) {
              if (typeof newValue === "function") {
                return newValue(oldValue);
              } else {
                return newValue;
              }
            } else {
              return oldValue;
            }
          });
        });
      };
    });
  }, [ids, setItems]);

  const itemRemovers: (() => void)[] = useMemo(() => {
    return ids.map((id) => {
      return () => {
        setItems((items) => items.filter((item) => item.id !== id));
      };
    });
  }, [ids, setItems]);

  return useMemo(
    () => items.map((item, i) => [item, itemSetters[i], itemRemovers[i]]),
    [items, itemSetters, itemRemovers]
  );
}

export function useListItemDispatch<T extends { id: string }>(
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>,
  id: string
): [T | undefined, Dispatch<SetStateAction<T>>, () => void] {
  return [
    items.find((item) => item.id === id),
    useCallback(
      (newItem) => {
        setItems((items) => {
          return items.map((oldItem) => {
            if (oldItem.id === id) {
              if (typeof newItem === "function") {
                return newItem(oldItem);
              } else {
                return newItem;
              }
            } else {
              return oldItem;
            }
          });
        });
      },
      [setItems, id]
    ),
    useCallback(() => {
      setItems((items) => {
        return items.filter((item) => item.id !== id);
      });
    }, [setItems, id]),
  ];
}

export function usePropertyDispatch<T extends Object, TKey extends keyof T>(
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
  key: TKey
): [T[TKey], Dispatch<SetStateAction<T[TKey]>>] {
  return [
    value[key],
    useCallback(
      (newValue) => {
        setValue((oldValue) => {
          if (typeof newValue === "function") {
            newValue = (newValue as any)(oldValue[key]);
          }

          return {
            ...oldValue,
            [key]: newValue,
          };
        });
      },
      [setValue, key]
    ),
  ];
}
