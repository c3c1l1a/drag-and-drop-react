import { useState, useReducer, useContext } from "react";
import _uniqueId from "lodash/uniqueId";
import Node from "./node";
import { NodeTreeContext, NodeTreeDispatchContext} from './NodeTreeContext';

const initialState = {
  id: _uniqueId("prefix-"),
  Main: "Main", 
  UIBlockType: "Main",
  children: [
    {
      id: _uniqueId("prefix-"),
      Column: "Left column",
      UIBlockType: "Column",
      children: [
        {
          id: _uniqueId("prefix-"),
          item1: "Item 1",
          UIBlockType: "DraggableCard",
        }
      ]
    },
    {
      id: _uniqueId("prefix-"),
      Column: "Right column",
      UIBlockType: "Column",
      children: [
        {
          id: _uniqueId("prefix-"),
          item2: 'Item 2',
          UIBlockType: "DraggableCard",
        }
      ]
    }
  ]
}


function removeDraggedItem(state, location){
  if (state.children){
    if (location.length === 2){
      const children = state.children.filter((child) => child.id !== location[1]);
      return {...state, children: children};
    } else {
      const newLocation = location.filter((item) => item !== state.id);
      const children = state.children.map((child) => {
        if (child.id === newLocation[0]){
          return removeDraggedItem(child, newLocation);
        }
        return child;
      });
      return {...state, children: children};
    }
  } else {
    return state;
  }
}

function addDraggedItem(state, location, draggedItem){
  if(state.children){
    if (location.length === 1){
      const children = [...state.children, draggedItem];
      const newState = {...state, children: children};
      return newState;
    } else {
      const newLocation = location.filter((item) => item !== state.id);
      const children = state.children.map((child) => {
        if (child.id === newLocation[0]){
          return addDraggedItem(child, newLocation, draggedItem)
        }
        return child;
      });
      return {...state, children: children}
    }
  } else {
    return state;
  }
}

function nodeTreeReducer(state, action){
  switch (action.type){
    case 'dragStart':
      return {...state, ...action.payload};
    case 'drop': 
      const itemRemovedState = removeDraggedItem(state, state.draggedItem.path);
      const newState = addDraggedItem(itemRemovedState, action.payload.path, state.draggedItem);
      return newState;
    default:
        return state;
  }

}

export default function App() {
  const [rootNode, dispatch] = useReducer(nodeTreeReducer, initialState);
  
  return (
    <NodeTreeContext.Provider value={rootNode}> 
      <NodeTreeDispatchContext.Provider value={dispatch}>
        <Node node={rootNode} path={[rootNode.id]}/>
      </NodeTreeDispatchContext.Provider>
    </NodeTreeContext.Provider>
  );
}

