"use client";

import { useState } from "react";
import { TiptapEditor } from "@/components/ui/tiptap-editor";

export default function EditorPage() {
  const [content, setContent] = useState(
    `<h2>Welcome to the Editor</h2><p>This is a <strong>rich text editor</strong> built with <em>Tiptap</em>. You can:</p><ul><li>Format text with <strong>bold</strong> and <em>italic</em></li><li>Create headings of different levels</li><li>Make bullet lists and numbered lists</li><li>And much more!</li></ul><p>Start editing to see the magic happen.</p>`
  );

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
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
                <TiptapEditor
                  placeholder="Start writing your content here..."
                  content={content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
