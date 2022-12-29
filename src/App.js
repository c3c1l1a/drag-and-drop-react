import { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import Node from "./node";

const initialState = {
  id: _uniqueId("prefix-"),
  type: "Main",
  children: [
    {
      id: _uniqueId("prefix-"),
      type: "Column",
      children: [
        {
          id: _uniqueId("prefix-"),
          type: "DraggableCard"
        },
        {
          id: _uniqueId("prefix-"),
          type: "DraggableCard"
        }
      ]
    },
    {
      id: _uniqueId("prefix-"),
      type: "Column",
      children: []
    }
  ]
};

export default function App() {
  const [nodeData, setNodeData] = useState(initialState);
  const [draggedItem, setDraggedItem] = useState();
  
  return (
    <Node
      nodeData={nodeData}
      setNodeData={setNodeData}
      draggedItem={draggedItem}
      setDraggedItem={setDraggedItem}
    />
  );
}
