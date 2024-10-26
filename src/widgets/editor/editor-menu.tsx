"use client";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";

interface EditorMenuProps {
  editor: Editor;
}

interface MenuItemProps {
  onClick: () => boolean;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const MenuItem = ({ onClick, icon, label, isActive }: MenuItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onClick()}
          className={`p-2 ${isActive ? "bg-muted" : ""}`}
          type="button"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const EditorMenu = ({ editor }: EditorMenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-background border-b">
      <MenuItem
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={<Bold className="h-4 w-4" />}
        label="Bold"
        isActive={editor.isActive("bold")}
      />
      <MenuItem
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={<Italic className="h-4 w-4" />}
        label="Italic"
        isActive={editor.isActive("italic")}
      />
      <MenuItem
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={<Underline className="h-4 w-4" />}
        label="Underline"
        isActive={editor.isActive("underline")}
      />
      <div className="w-px h-10 bg-border mx-1" />
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        icon={<Heading1 className="h-4 w-4" />}
        label="Heading 1"
        isActive={editor.isActive("heading", { level: 1 })}
      />
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        icon={<Heading2 className="h-4 w-4" />}
        label="Heading 2"
        isActive={editor.isActive("heading", { level: 2 })}
      />
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        icon={<Heading3 className="h-4 w-4" />}
        label="Heading 3"
        isActive={editor.isActive("heading", { level: 3 })}
      />
      <div className="w-px h-10 bg-border mx-1" />
      <MenuItem
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<List className="h-4 w-4" />}
        label="Bullet List"
        isActive={editor.isActive("bulletList")}
      />
      <MenuItem
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<ListOrdered className="h-4 w-4" />}
        label="Ordered List"
        isActive={editor.isActive("orderedList")}
      />
    </div>
  );
};
