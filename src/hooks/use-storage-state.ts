import { useMemo, useState, useCallback } from "react";

import { isEqual } from "@/lib/helper";
import { StorageBase } from "@/lib/storage/storage-base";
import { useIsoMorphicEffect } from "./use-isomorphic-effect";
import { CookieStorage, localStorage } from "@/lib/storage";
import { sessionCookie } from "@/lib/storage/cookie";

// ----------------------------------------------------------------------

export type UseStorageStateReturn<T> = {
  state: T;
  canReset: boolean;
  resetState: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};
type StorageOptions =
  | {
      storageKey: "cookie";
      options?: Cookies.CookieAttributes;
    }
  | { storageKey: "local"; options?: never }
  | "cookie"
  | "local";
export function useStorageState<T>(
  key: string,
  initialState: T,
  sOptions: StorageOptions = "local"
): UseStorageStateReturn<T> {
  const storageKey =
    typeof sOptions === "string" ? sOptions : sOptions.storageKey;
  const options = typeof sOptions === "object" ? sOptions.options : null;
  const storage = useMemo<StorageBase>(() => {
    if (storageKey === "local") return localStorage;
    if (!options) return sessionCookie;
    return new CookieStorage(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
  const [state, set] = useState(initialState);

  const multiValue = initialState && typeof initialState === "object";

  const canReset = !isEqual(state, initialState);

  useIsoMorphicEffect(() => {
    const restoredValue = storage.get<T>(key);

    if (restoredValue) {
      if (multiValue) {
        set((prevValue) => ({ ...prevValue, ...restoredValue }));
      } else {
        set(restoredValue);
      }
    } else storage.set<T>(key, initialState as T);
  }, [key, multiValue, storage]);

  const setState = useCallback(
    (updateState: T | Partial<T>) => {
      if (multiValue) {
        set((prevValue) => {
          const newValue = { ...prevValue, ...updateState };
          storage.set<T>(key, newValue);
          return newValue;
        });
      } else {
        storage.set<T>(key, updateState as T);
        set(updateState as T);
      }
    },
    [key, multiValue, storage]
  );

  const setField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      if (multiValue) {
        setState({ [name]: updateValue } as Partial<T>);
      }
    },
    [multiValue, setState]
  );

  const resetState = useCallback(() => {
    set(initialState);
    storage.remove(key);
  }, [initialState, key, storage]);

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      resetState,
      canReset,
    }),
    [canReset, resetState, setField, setState, state]
  );

  return memoizedValue;
}
