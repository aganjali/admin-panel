"use client";

import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
  activeFiltersCount: number;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onFilterToggle,
  activeFiltersCount,
}: SearchBarProps) {
  return (
    <Card className="!mb-2 !py-2">
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 min-w-[120px]"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
