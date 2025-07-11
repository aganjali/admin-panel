"use client";
import useTimer from "@/hooks/use-timer";
import { useRef } from "react";

interface Props {
  expiration: string;
  className?: string;
  onDone: () => void;
}

const Timer: React.FC<Props> = ({ expiration, className, onDone }) => {
  const timerRef = useRef<HTMLSpanElement | null>(null);

  useTimer({
    expiration,
    enabled: true,
    onDone,
    onUpdate: (t) => {
      if (timerRef.current) timerRef.current.textContent = t;
    },
  });
  return <span className={className}>00:00</span>;
};

export default Timer;
