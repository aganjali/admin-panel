"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export function DataTableResizer({ header }: { header: any }) {
  const isResizing = header.column.getIsResizing();
  const columnSizingInfo = header
    .getContext()
    .table.getState().columnSizingInfo;
  const deltaOffset = columnSizingInfo.deltaOffset ?? 0;

  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(
        "absolute right-0 top-0 flex h-full w-4 cursor-col-resize select-none items-center justify-center group/resizer",
        "opacity-0 group-hover/th:opacity-100 z-20",
        isResizing && "opacity-100"
      )}
      aria-hidden="true"
      data-resizing={isResizing ? "true" : undefined}
      style={{
        transform: isResizing ? `translateX(${deltaOffset}px)` : undefined,
      }}
    >
      <div className="flex h-4/5 items-center justify-center">
        <GripVertical
          className={cn(
            "absolute h-4 w-4 text-muted-foreground/70",
            isResizing ? "text-primary" : "text-muted-foreground/70"
          )}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
