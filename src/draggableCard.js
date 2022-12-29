export default function DraggableCard({ currentNode, onDragStart, setParentNode, setDraggedItem }) {
  return (
    <div
      className="draggable-item"
      draggable
      onDragStart={(e) => onDragStart(e, currentNode, setParentNode, setDraggedItem)}
    >
      Dragabble Card
    </div>
  );
}
