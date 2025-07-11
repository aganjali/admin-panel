import { useEffect, useRef } from "react";
import { useLatestCallback } from "./use-latest-callback";

type UseTimerParams = {
  expiration: string; // UTC date string
  enabled: boolean;
  onDone: () => void;
  onUpdate: (t: string) => void;
};

const useTimer = ({
  expiration,
  enabled,
  onDone,
  onUpdate,
}: UseTimerParams) => {
  const onDoneCb = useLatestCallback(onDone);
  const onUpdateCb = useLatestCallback(onUpdate);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!expiration || !enabled) {
      return;
    }

    const expirationTime = new Date(expiration).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const remainingTime = expirationTime - now;
      let formattedTime = "00:00";

      if (remainingTime > 0) {
        const seconds = Math.floor((remainingTime / 1000) % 60);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        if (hours) {
          formattedTime = `${hours
            .toString()
            .padStart(2, "0")}:${formattedTime}`;
        }
        if (days) {
          formattedTime = `${days
            .toString()
            .padStart(2, "0")}:${formattedTime}`;
        }
      }
      onUpdateCb(formattedTime);

      if (remainingTime > 0) intervalId.current = setTimeout(updateTimer, 1000);
      else {
        if (intervalId.current) clearTimeout(intervalId.current);
        onDoneCb();
      }
    };

    updateTimer();

    return () => {
      if (intervalId.current) {
        clearTimeout(intervalId.current);
      }
    };
  }, [expiration, enabled, onDoneCb, onUpdateCb]);
};

export default useTimer;
