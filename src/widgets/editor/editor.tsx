"use client";

import { useEditor, EditorContent, UseEditorOptions } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { EditorMenu } from "./editor-menu";

interface EditorProps {
  editorProps?: UseEditorOptions;
}

export const Editor = ({ editorProps }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({ levels: [1, 2, 3] }),
      OrderedList,
      BulletList,
      ListItem,
      Bold,
      Italic,
      Underline,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose mx-auto max-w-none sm:max-w-none focus:outline-none",
      },
    },
    ...editorProps,
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md overflow-hidden">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};
