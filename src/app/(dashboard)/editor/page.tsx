"use client";

import { useState } from "react";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { Button } from "@/components/ui/button";
import { IconDeviceFloppy, IconEye } from "@tabler/icons-react";

export default function EditorPage() {
  const [content, setContent] = useState(
    `<h2>Welcome to the Editor</h2><p>This is a <strong>rich text editor</strong> built with <em>Tiptap</em>. You can:</p><ul><li>Format text with <strong>bold</strong> and <em>italic</em></li><li>Create headings of different levels</li><li>Make bullet lists and numbered lists</li><li>And much more!</li></ul><p>Start editing to see the magic happen.</p>`
  );
  const [savedContent, setSavedContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);

    // Calculate word count (simple implementation)
    const textContent = newContent.replace(/<[^>]*>/g, "").trim();
    const words = textContent.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  const handleSave = () => {
    setSavedContent(content);
    // Here you would typically save to a backend
    console.log("Content saved:", content);
  };

  const handlePreview = () => {
    // Open content in a new window for preview
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Document Preview</title>
            <style>
              body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
              h1, h2, h3 { color: #333; }
              ul, ol { padding-left: 20px; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-foreground">
                Rich Text Editor
              </h1>
              <p className="text-muted-foreground mt-2">
                Create and edit content with our powerful rich text editor
                powered by Tiptap.
              </p>
            </div>

            <div className="max-w-4xl">
              <div className="border border-border rounded-lg bg-card shadow-sm p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-foreground mb-2">
                      Document Editor
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Use the toolbar to format selected text or set formatting
                      for new content. Supports headings, bold, italic, and
                      lists.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {wordCount} words
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreview}
                      className="gap-2"
                    >
                      <IconEye className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                      className="gap-2"
                    >
                      <IconDeviceFloppy className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>

                <TiptapEditor
                  placeholder="Start writing your content here..."
                  content={content}
                  onChange={handleContentChange}
                />

                {savedContent && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      ✓ Content saved successfully! Last saved:{" "}
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Content Debug Panel (optional - for development) */}
              <div className="mt-6 border border-border rounded-lg bg-card shadow-sm p-6">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Content Debug (HTML Output)
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This shows the raw HTML content that onChange provides:
                </p>
                <pre className="bg-muted p-3 rounded text-sm overflow-auto max-h-40 text-muted-foreground">
                  {content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
