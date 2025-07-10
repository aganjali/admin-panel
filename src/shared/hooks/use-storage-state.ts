import { useMemo, useState, useEffect, useCallback } from "react";

import { isEqual } from "@/shared/lib/helper";
import { StorageBase } from "@/shared/lib/storage/storage-base";

// ----------------------------------------------------------------------

export type UseStorageStateReturn<T> = {
  state: T;
  canReset: boolean;
  resetState: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useStorageState<T>(
  key: string,
  storage: StorageBase,
  initialState: T
): UseStorageStateReturn<T> {
  const [state, set] = useState(initialState);

  const multiValue = initialState && typeof initialState === "object";

  const canReset = !isEqual(state, initialState);

  useEffect(() => {
    const restoredValue = storage.get<T>(key);

    if (restoredValue) {
      if (multiValue) {
        set((prevValue) => ({ ...prevValue, ...restoredValue }));
      } else {
        set(restoredValue);
      }
    }
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
