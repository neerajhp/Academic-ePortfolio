import React from "react";
import { Typography } from "@material-ui/core";

const serialize = (input) => {
  return input.map((element) => serializeElement(element));
};

const serializeElement = (node) => {
  switch (node.type) {
    case "quote":
      return <blockquote>{serializeLeaf(node.children)}</blockquote>;

    case "link":
      return (
        <a href="${escapeHtml(node.url)}">{serializeLeaf(node.children)}</a>
      );
    case "list-item":
      return <li>{serializeLeaf(node.children)}</li>;
    case "bulleted-list":
      return <ul>{serialize(node.children)}</ul>;
    case "ordered-list":
      return <ol>{serialize(node.children)}</ol>;
    default:
      return <React.Fragment>{serializeLeaf(node.children)}</React.Fragment>;
  }
};

const serializeLeaf = (node) => {
  return node.map((child) => (
    <Typography>
      <span
        style={{
          fontWeight: child.bold ? "bold" : "normal",
          fontStyle: child.italic ? "italic" : "normal",
          textDecoration: child.underline ? "underline" : "normal",
        }}
      >
        {child.text}
      </span>
    </Typography>
  ));
};

export default serialize;
