"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconH1,
  IconH2,
  IconH3,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function TiptapEditor({
  content = "",
  placeholder = "Start typing...",
  onChange,
  className,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }: { editor: any }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none",
          "prose-headings:font-semibold prose-headings:text-foreground",
          "prose-p:text-foreground prose-p:leading-relaxed",
          "prose-li:text-foreground prose-strong:text-foreground",
          "prose-em:text-foreground prose-code:text-foreground",
          "prose-blockquote:text-muted-foreground",
          "prose-hr:border-border",
          // Heading-specific styling
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4 [&_h1]:text-foreground",
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-3 [&_h2]:text-foreground",
          "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-2 [&_h3]:text-foreground",
          "[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0",
          // Paragraph styling
          "[&_p]:my-2 [&_p]:leading-relaxed",
          // List-specific styling
          "prose-ul:list-disc prose-ul:pl-6 prose-ul:my-2",
          "prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-2",
          "prose-li:my-1 prose-li:leading-relaxed",
          // Ensure nested lists work properly
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-1",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-1",
          "[&_li]:my-1 [&_li]:leading-relaxed",
          // Fix list item display
          "[&_ul>li]:block [&_ol>li]:block"
        ),
      },
    },
  });

  // Update editor content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    disabled,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className={cn(
        "h-8 w-8 p-0 transition-colors",
        isActive && "bg-accent text-accent-foreground shadow-none"
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="border border-input rounded-t-md bg-background p-2">
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            isActive={editor.isActive("bold")}
            disabled={!editor.can().toggleBold()}
          >
            <IconBold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
            isActive={editor.isActive("italic")}
            disabled={!editor.can().toggleItalic()}
          >
            <IconItalic className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          <ToolbarButton
            onClick={() => {
              if (editor.isActive("heading", { level: 1 })) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }
            }}
            isActive={editor.isActive("heading", { level: 1 })}
          >
            <IconH1 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              if (editor.isActive("heading", { level: 2 })) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }
            }}
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <IconH2 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              if (editor.isActive("heading", { level: 3 })) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }
            }}
            isActive={editor.isActive("heading", { level: 3 })}
          >
            <IconH3 className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          <ToolbarButton
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            isActive={editor.isActive("bulletList")}
          >
            <IconList className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            isActive={editor.isActive("orderedList")}
          >
            <IconListNumbers className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      <div
        className={cn(
          "border border-t-0 border-input rounded-b-md bg-transparent min-h-[200px] p-3",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "dark:bg-input/30",
          // Additional list styling to ensure proper display
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2",
          "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2",
          "[&_li]:my-1 [&_li]:block",
          "[&_ul_ul]:list-[circle] [&_ol_ol]:list-[lower-alpha]",
          // Ensure list markers are visible
          "[&_ul]:list-outside [&_ol]:list-outside"
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
