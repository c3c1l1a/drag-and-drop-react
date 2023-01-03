import { useState, useContext } from "react";
import Column from "./column";
import DragableCard from "./draggableCard";
import Main from "./main";
import { NodeTreeContext } from './NodeTreeContext';
import useReducer from './useReducer';

import "./styles.css";

export default function Node({ node }) {

  switch (node.UIBlockType) {
    case "Main":
      return (
        <Main>
          {node.children.map((child) => {
            return <Node key={child.id} node={child}/>
          })}
        </Main>
      );
    case "Column":
      return (
        <Column node={node}>
          {node.children.map((child) => {
            return <Node key={child.id} node={child}/>
          })}
        </Column>
      );
    case "DraggableCard":
      return (
        <DragableCard node={node}/>
      );
    default:
      return <></>;
  }
}
