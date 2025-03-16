"use client";

import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalEditor, EditorState } from "lexical";

// ✅ Toolbar Component
const EditorToolbar = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-3 border-b px-3 py-2 bg-gray-100 rounded-t-md">
      <button className="p-2 rounded hover:bg-gray-200" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <Bold size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-200" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <Italic size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-200" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        <Underline size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-200" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <List size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-200" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <ListOrdered size={18} />
      </button>
    </div>
  );
};

// ✅ RichTextEditor Component
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const initialConfig = {
    namespace: "RichTextEditor",
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: any) => console.error(error),
    nodes: [ListNode, ListItemNode], // ✅ Registers list nodes
  };

  // ✅ Fix: Get HTML content correctly
  const handleEditorChange = (editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const html = $generateHtmlFromNodes(editor, null); // ✅ Generates correct HTML content
      onChange(html); // ✅ Sends HTML content to parent component
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-lg shadow-md bg-white">
        <EditorToolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="p-4 min-h-[150px] w-full outline-none" />}
          placeholder={<div className="p-4 text-gray-400">Write something...</div>}
          ErrorBoundary={(props) => <LexicalErrorBoundary {...props} />}
        />
        <ListPlugin />
        <OnChangePlugin onChange={handleEditorChange} /> {/* ✅ Corrected function */}
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default RichTextEditor;