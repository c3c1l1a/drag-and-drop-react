import { useState, useEffect } from "react";
import Column from "./column";
import DragableCard from "./draggableCard";
import Main from "./main";

import "./styles.css";

export default function Node({
  nodeData,
  setNodeData,
  draggedItem,
  setDraggedItem
}) {
  const [currentNodeData, setCurrentNodeData] = useState(nodeData);
  

  const onDragStart = (e, data, setParentNode, dragged) => {
    console.log('onDragStart');
    setDraggedItem((temp) => {
      console.log("setDraggedItem");
      const item = data;
      item['setParentNode'] = setParentNode;
      return item;
    });
    console.log(data);
    console.log(draggedItem);
    console.log(currentNodeData);
  };

  const onDrop = (e, current, prev) => {
    console.log("Drop");
    setCurrentNodeData((item) => {
      draggedItem.setParentNode((item) => {
        let newItem = item;
        let children = item.children.filter((child)=> child.id !== draggedItem.id);
        newItem['children'] = children;
        return newItem;
      });
      let children = item.children;
      children.push(draggedItem);
      setDraggedItem();
      return {...item, children: children}
    });
  };

  switch (nodeData.type) {
    case "Main":
      return (
        <Main>
          {nodeData.children.map((childData) => {
            return (
              <Node
                key={Math.random() * 100}
                nodeData={childData}
                setNodeData={setCurrentNodeData}
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
              />
            );
          })}
        </Main>
      );
    case "Column":
      return (
        <Column
          nodeData={nodeData}
          currentNodeData={currentNodeData}
          onDrop={onDrop}
        >
          {nodeData.children.map((childData) => {
            return (
              <Node
                key={Math.random() * 100}
                nodeData={childData}
                setNodeData={setCurrentNodeData}
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
              />
            );
          })}
        </Column>
      );
    case "DraggableCard":
      return (
        <DragableCard currentNode={currentNodeData} 
                      onDragStart={onDragStart} 
                      setParentNode={setNodeData}
                      setDraggedItem={setDraggedItem}/>
      );
    default:
      return <></>;
  }
}
