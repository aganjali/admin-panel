"use client";

import { LayoutDashboard } from "lucide-react";

interface Props {
  title?: string;
  desc?: string;
}

const Loading: React.FC<Props> = ({
  title = "Loading",
  desc = "Please wait..",
}) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-chart-2 to-chart-5 rounded-full flex items-center justify-center animate-pulse">
            <LayoutDashboard className="h-10 w-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-chart-2/30 border-t-chart-2 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground">{desc}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-chart-2 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-chart-2 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-chart-2 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
