import { useContext } from 'react';
import {NodeTreeDispatchContext} from './NodeTreeContext'; 

export default function Column({ children, node, path }) {
  const dispatch = useContext(NodeTreeDispatchContext); 

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div className="column" 
      onDragOver={(e) => onDragOver(e)} 
      onDrop={() => dispatch({type: 'drop', payload: {...node, path: path}})}
    >{children}</div>
  );
}
