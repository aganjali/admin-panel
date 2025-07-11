/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React from "react";

import { useIsoMorphicEffect } from "./use-isomorphic-effect";

/**
 * React hook which returns the latest callback without changing the reference.
 */

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function useLatestCallback<T extends Function>(callback?: T): T {
  const ref = React.useRef<T | undefined>(callback);

  const latestCallback = React.useRef(function latestCallback(
    this: unknown,
    ...args: unknown[]
  ) {
    return ref.current?.apply(this, args);
  } as unknown as T).current;

  useIsoMorphicEffect(() => {
    ref.current = callback;
  });

  return latestCallback;
}
