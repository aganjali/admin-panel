import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import { UserListDto } from "@/types";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { IconGripVertical } from "@tabler/icons-react";

export function DraggableRow({ row }: { row: Row<UserListDto> }) {
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
      {row.getVisibleCells().map((cell, cellIndex) => (
        <TableCell key={cell.id} className="px-3 py-2 overflow-hidden">
          {cellIndex === 0 ? (
            <div className="flex items-center gap-2 min-w-0">
              <Button
                {...attributes}
                {...listeners}
                variant="ghost"
                size="icon"
                className="text-muted-foreground size-7 cursor-grab hover:bg-transparent active:cursor-grabbing flex-shrink-0"
              >
                <IconGripVertical className="text-muted-foreground size-3" />
                <span className="sr-only">Drag to reorder</span>
              </Button>
              <div className="min-w-0 flex-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
