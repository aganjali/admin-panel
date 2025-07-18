import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import { UserListWithAvatarDto } from "@/types";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { IconGripVertical } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function DraggableRow({ row }: { row: Row<UserListWithAvatarDto> }) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell, cellIndex) => {
        const isDragColumn = cellIndex === 0;
        const isUserNameColumn = cellIndex === 1;
        const isActionColumn = cell.column.id === "actions";

        return (
          <TableCell
            key={cell.id}
            className={cn(
              isDragColumn && "px-2 py-2 w-auto",
              !isDragColumn && "px-3 py-2 whitespace-nowrap w-aut",
              isActionColumn &&
                "sticky -right-0.5 bg-background z-20 border-l shadow-[-4px_0_8px_0_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_8px_0_rgba(0,0,0,0.3)]"
            )}
          >
            {cellIndex === 0 ? (
              <div className="flex items-center justify-center w-max">
                <Button
                  {...attributes}
                  {...listeners}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground size-4 cursor-grab hover:bg-transparent active:cursor-grabbing flex-shrink-0 p-0"
                >
                  <IconGripVertical className="text-muted-foreground size-3" />
                  <span className="sr-only">Drag to reorder</span>
                </Button>
              </div>
            ) : isUserNameColumn ? (
              <div className="w-max">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ) : (
              <div className="w-max">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
