"use client";

import { useState } from "react";
import { mockApiResponse } from "./data";
import { UserTable } from "./components/table";
import { Pagination } from "./components/pagination";
import { SearchBar } from "./components/search-bar";
import { Header } from "./components/header";
import { FilterSidebar } from "./components/filter-sidebar";
import { Filters } from "./components/types";

const roleOptions = ["Admin", "User"];
const departmentOptions = [
  "Engineering",
  "IT",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    roles: [],
  });

  const users = mockApiResponse.result.items || [];
  const totalEntries = mockApiResponse.result.totalCount || 0;
  const totalPages = Math.ceil(totalEntries / Number.parseInt(entriesPerPage));

  const activeFiltersCount = Object.values(filters).filter((value) =>
    Array.isArray(value) ? value.length > 0 : value !== "all" && value !== null
  ).length;

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleUserAction = async (userId: number, action: string) => {
    switch (action) {
      case "delete":
        console.log("View user:", "delete");
        break;
      case "view":
        console.log("View user:", userId);
        break;
      case "edit":
        console.log("Edit user:", userId);
        break;
      case "reset-password":
        console.log("Reset password for user:", userId);
        break;
    }
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const handleExport = async (format: "excel" | "csv") => {
    try {
      console.log(format);
    } catch (error) {
      console.error("Failed to export users:", error);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-6 px-3 space-y-8">
        <Header
          users={users as any}
          selectedUsers={selectedUsers}
          onClearSelection={handleClearSelection}
          totalEntries={totalEntries}
          onExport={handleExport}
          isExporting={false}
        />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterToggle={() => setFilterSidebarOpen(true)}
          activeFiltersCount={activeFiltersCount}
        />

        <FilterSidebar
          open={filterSidebarOpen}
          onOpenChange={setFilterSidebarOpen}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          activeFiltersCount={activeFiltersCount}
          roleOptions={roleOptions}
          departmentOptions={departmentOptions}
        />

        <UserTable
          users={users as any}
          selectedUsers={selectedUsers}
          onSelectAll={handleSelectAll}
          onSelectUser={handleSelectUser}
          onUserAction={handleUserAction}
          isDeleting={false}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          entriesPerPage={entriesPerPage}
          totalEntries={totalEntries}
          onPageChange={setCurrentPage}
          onEntriesPerPageChange={setEntriesPerPage}
        />
      </div>
    </div>
  );
}
