import { useContext } from 'react';
import {NodeTreeDispatchContext} from './NodeTreeContext';

export default function DraggableCard({ node }) {
  const dispatch = useContext(NodeTreeDispatchContext);

  return (
    <div className="draggable-item" 
      draggable 
      onDragStart={(e) => dispatch({type: 'dragStart', payload: {draggedItem: node}})}>
      Dragabble Card
    </div>
  );
}
