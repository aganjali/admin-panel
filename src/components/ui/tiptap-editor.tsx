"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4 [&_h1]:text-foreground",
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-3 [&_h2]:text-foreground",
          "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-2 [&_h3]:text-foreground",
          "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:my-2 [&_h4]:text-foreground",
          "[&_h5]:text-base [&_h5]:font-semibold [&_h5]:my-2 [&_h5]:text-foreground",
          "[&_h6]:text-sm [&_h6]:font-semibold [&_h6]:my-2 [&_h6]:text-foreground",
          "[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0",
          "[&_p]:my-2 [&_p]:leading-relaxed",
          "prose-ul:list-disc prose-ul:pl-6 prose-ul:my-2",
          "prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-2",
          "prose-li:my-1 prose-li:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-1",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-1",
          "[&_li]:my-1 [&_li]:leading-relaxed",
          "[&_ul>li]:block [&_ol>li]:block"
        ),
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const [currentBlock, setCurrentBlock] = useState("paragraph");

  const updateCurrentBlock = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("heading", { level: 1 })) {
      setCurrentBlock("h1");
    } else if (editor.isActive("heading", { level: 2 })) {
      setCurrentBlock("h2");
    } else if (editor.isActive("heading", { level: 3 })) {
      setCurrentBlock("h3");
    } else if (editor.isActive("heading", { level: 4 })) {
      setCurrentBlock("h4");
    } else if (editor.isActive("heading", { level: 5 })) {
      setCurrentBlock("h5");
    } else if (editor.isActive("heading", { level: 6 })) {
      setCurrentBlock("h6");
    } else {
      setCurrentBlock("paragraph");
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", updateCurrentBlock);
    updateCurrentBlock(); // Initial update
    return () => {
      editor.off("transaction", updateCurrentBlock);
    };
  }, [editor, updateCurrentBlock]);

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
          <Select
            value={currentBlock}
            onValueChange={(value) => {
              if (value === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(value[1]) as 1 | 2 | 3 | 4 | 5 | 6;
                editor.chain().focus().setHeading({ level }).run();
              }
            }}
          >
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="h4">Heading 4</SelectItem>
              <SelectItem value="h5">Heading 5</SelectItem>
              <SelectItem value="h6">Heading 6</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-px h-6 bg-border mx-1" />
          <ToolbarButton
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            isActive={editor.isActive("bold")}
            disabled={!editor.can().toggleBold()}
          >
            <IconBold className="h-4 w-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-border mx-1" />
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
              editor.chain().focus().toggleBulletList().run();
            }}
            isActive={editor.isActive("bulletList")}
          >
            <IconList className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

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
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2",
          "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2",
          "[&_li]:my-1 [&_li]:block",
          "[&_ul_ul]:list-[circle] [&_ol_ol]:list-[lower-alpha]",
          "[&_ul]:list-outside [&_ol]:list-outside"
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
