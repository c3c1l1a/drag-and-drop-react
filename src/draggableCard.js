import { useContext } from 'react';
import {NodeTreeDispatchContext} from './NodeTreeContext';

export default function DraggableCard({ node, path }) {
  const dispatch = useContext(NodeTreeDispatchContext);

  return (
    <div className="draggable-item" 
      draggable 
      onDragStart={(e) => dispatch({type: 'dragStart', payload: {draggedItem: {...node, path:path }}})}>
      Dragabble Card
    </div>
  );
}
