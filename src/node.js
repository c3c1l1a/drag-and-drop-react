import { useState, useContext } from "react";
import Column from "./column";
import DragableCard from "./draggableCard";
import Main from "./main";
import { NodeTreeContext } from './NodeTreeContext';
import useReducer from './useReducer';

import "./styles.css";

export default function Node({ node, path }) {
  switch (node.UIBlockType) {
    case "Main":
      return (
        <Main>
          {node.children.map((child) => {
            const newPath = [...path, child.id];
            return <Node key={child.id} node={child} path={newPath}/>
          })}
        </Main>
      );
    case "Column":
      return (
        <Column node={node} path={path}>
          {node.children.map((child) => {
            const newPath = [...path, child.id];
            return <Node key={child.id} node={child} path={newPath}/>
          })}
        </Column>
      );
    case "DraggableCard":
      return (
        <DragableCard node={node} path={path}/>
      );
    default:
      return <></>;
  }
}
