import React from "react";
import { useState, useMemo } from "react";
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  BoldButton,
  ItalicButton,
  UnderlinedButton,
  BulletedListButton,
  NumberedListButton,
} from "@unicef/material-slate";

export default function RTE({ defaultValue, setValue }) {
  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), []);

  return (
    <MaterialSlate
      editor={editor}
      value={defaultValue}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar>
        <BoldButton />
        <ItalicButton />
        <UnderlinedButton />
        <BulletedListButton />
        <NumberedListButton />
      </Toolbar>
      <MaterialEditable />
    </MaterialSlate>
  );
}
