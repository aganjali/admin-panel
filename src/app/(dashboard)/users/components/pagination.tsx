"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  entriesPerPage: string;
  totalEntries: number;
  onPageChange: (page: number) => void;
  onEntriesPerPageChange: (entries: string) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  entriesPerPage,
  totalEntries,
  onPageChange,
  onEntriesPerPageChange,
}: PaginationProps) {
  const startEntry = (currentPage - 1) * Number.parseInt(entriesPerPage) + 1;
  const endEntry = Math.min(
    currentPage * Number.parseInt(entriesPerPage),
    totalEntries
  );

  return (
    <Card className="!py-2">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select
                value={entriesPerPage}
                onValueChange={onEntriesPerPageChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-gray-700" />
            <span>
              Showing {startEntry} to {endEntry} of {totalEntries} entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
