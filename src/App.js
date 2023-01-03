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
        },
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


function removeDraggedItem(state, draggedItem, i){
  let filtered = [];
  let children = [];
  if (state.children){
    filtered = state.children.filter((child) => {
      return child !== draggedItem;
    });
    if (filtered.length === state.children.length && state.children.length !== 0){  
      children = state.children.map((child) => {
        return removeDraggedItem(child, draggedItem, i+1);
      })
    } else {
      return {...state, children: filtered};
    }
  }
  return {...state, children: children}
}

function nodeTreeReducer(state, action){
  switch (action.type){
    case 'dragStart':
      return {...state, ...action.payload};
    case 'drop': 
      const newState = removeDraggedItem(state, state.draggedItem, 0);
      console.log(state, newState);
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
        <Node node={rootNode}/>
      </NodeTreeDispatchContext.Provider>
    </NodeTreeContext.Provider>
  );
}

// const draggedNode = {}

// // function addNode(tree, path, node){  
// //   if (path[0] === tree.id && path.length === 1){
// //     console.log(tree);
// //     tree['children'] = tree.children.concat(node);
// //     return;
// //   } else if (tree.id === path[0]){
// //     path.shift();
// //     tree.children.map((child) => {
// //       if (child.id === path[0]){
// //         addNode(child, path, node);
// //       } else return child;
// //     });
// //     return;
// //   }
// // }

// // function reducer(state, action){
// //   const newState = state;
// //   switch (action.type) {
// //   case 'dragStart':
// //     newState['draggedFrom'] = action.payload.path;
// //     newState['draggedItem'] = action.payload.item;
// //     return newState;
// //   case 'drop':
// //     //addNode(newState.nodeTree, action.payload, state.draggedItem);
// //     //console.log(newState.nodeTree.children[1]);
// //     return newState;
// //   default:
// //     throw new Error();
// //   }
// // }


// // function draggedNodeReducer(state, action){
// //   const newState = state;
// //   switch (action.type) {
// //   case 'dragStart':
// //     return action.payload;
// //   case 'drop':
// //     //addNode(newState.nodeTree, action.payload, state.draggedItem);
// //     //console.log(newState.nodeTree.children[1]);
// //     return newState;
// //   default:
// //     throw new Error();
// //   }
// // }
