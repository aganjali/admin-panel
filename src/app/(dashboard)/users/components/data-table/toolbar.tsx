import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconSearch } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";

interface DataTableToolbarProps {
  searchValue: string;
  isSearching: boolean;
  roleFilter: string[];
  roleOptions: string[];
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (roles: string[]) => void;
}

export function DataTableToolbar({
  searchValue,
  isSearching,
  roleFilter,
  roleOptions,
  onSearchChange,
  onRoleFilterChange,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
        ) : (
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <Input
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        value={roleFilter.length > 0 ? roleFilter[0] : "all"}
        onValueChange={(value) => {
          const roles = value === "all" ? [] : [value];
          onRoleFilterChange(roles);
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by role">
            {roleFilter.length > 0 ? roleFilter[0] : "All roles"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          {roleOptions.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
