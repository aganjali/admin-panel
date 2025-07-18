"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconUpload, IconFileSpreadsheet } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUI } from "@/services/managed-ui";

export function ImportExcelView() {
  const { closeModal } = useUI();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  console.log("ImportExcelView rendered");

  const importExcel = useMutation({
    mutationFn: async (file: File) => {
      console.log("Import mutation started with file:", file);
      const formData = new FormData();
      formData.append("file", file);
    },
    onSuccess: () => {
      console.log("Import success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Excel file imported successfully");
      closeModal();
    },
    onError: (error: any) => {
      console.error("Import error:", error);
      const message = error?.message || "Failed to import users";
      toast.error(message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls"))
    ) {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);

    try {
      await importExcel.mutateAsync(file);
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || importExcel.isPending;

  return (
    <DialogContent className="sm:max-w-md" cancelable>
      <DialogHeader>
        <DialogTitle>Import Users from Excel</DialogTitle>
        <DialogDescription>
          Upload an Excel file (.xlsx) containing user data to import.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="excel-file">Excel File</Label>
          <div className="flex items-center gap-2">
            <input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={handleFileChange}
              disabled={isLoading}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("excel-file")?.click()}
              disabled={isLoading}
              className="w-full justify-start"
            >
              {file ? (
                <>
                  <IconFileSpreadsheet className="mr-2 h-4 w-4" />
                  {file.name}
                </>
              ) : (
                <>
                  <IconUpload className="mr-2 h-4 w-4" />
                  Choose Excel file
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            The Excel file should contain columns matching the user data
            structure.
          </p>
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleUpload}
          // disabled={!file || isLoading}
          disabled={true}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            "Import"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
