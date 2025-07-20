import { Row as TRow, flexRender } from "@tanstack/react-table";
import { UserListWithAvatarDto } from "@/types";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function Row({ row }: { row: TRow<UserListWithAvatarDto> }) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    >
      {row.getVisibleCells().map((cell) => {
        const isUserNameColumn = cell.column.id === "userName";
        return (
          <TableCell
            key={cell.id}
            style={{
              width: cell.column.getSize(),
            }}
            className={cn(
              "px-3 py-2 whitespace-nowrap"
              // isActionColumn &&
              //   "sticky -right-0.5 bg-background z-20 border-l shadow-[-4px_0_8px_0_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_8px_0_rgba(0,0,0,0.3)]"
            )}
          >
            {isUserNameColumn ? (
              <div className="flex items-center gap-3 overflow-hidden truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ) : (
              <div className="overflow-hidden truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
