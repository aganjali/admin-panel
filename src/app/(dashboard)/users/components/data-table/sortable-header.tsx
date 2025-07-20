import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  IconArrowUp,
  IconSelector,
  IconSortAscending,
  IconSortDescending,
  IconX,
  IconArrowDown,
} from "@tabler/icons-react";

export const SortableHeader = ({
  column,
  children,
}: {
  column: any;
  children: React.ReactNode;
}) => {
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  if (!canSort) {
    return <span className="font-semibold">{children}</span>;
  }

  return (
    <div className="flex items-center justify-between w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-auto p-0 font-semibold shrink-0 hover:bg-transparent",
              "flex items-center gap-2 text-left justify-start w-fit"
            )}
          >
            {children}
            <div className="flex items-center gap-1">
              {sorted === "asc" ? (
                <IconArrowUp className="h-3 w-3" />
              ) : sorted === "desc" ? (
                <IconArrowDown className="h-3 w-3" />
              ) : (
                <IconSelector className="h-3 w-3 opacity-50" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="flex items-center gap-2"
          >
            <IconSortAscending className="h-4 w-4" />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="flex items-center gap-2"
          >
            <IconSortDescending className="h-4 w-4" />
            Descending
          </DropdownMenuItem>
          {sorted && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => column.clearSorting()}
                className="flex items-center gap-2"
              >
                <IconX className="h-4 w-4" />
                Clear Sort
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Empty space to allow resizer to work */}
      <div className="flex-1" />
    </div>
  );
};
