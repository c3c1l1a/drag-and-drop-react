// export default function Column({
//   draggableItem,
//   draggableItems,
//   setDraggableItems,
//   children
// }) {
//   const drop = (e) => {
//     let draggedItem = {};
//     if (draggableItem.parent === "left") {
//       draggedItem = draggableItems.left.filter(
//         (item, index) => index === draggableItem.index
//       );
//       setDraggableItems((allDraggableItems) => {
//         let copyOfDraggableItems = allDraggableItems;
//         copyOfDraggableItems.left.splice(draggableItem.index, 1);
//         copyOfDraggableItems.right.push(draggedItem);
//         return copyOfDraggableItems;
//       });
//     }
//   };
//   const dragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       className="right"
//       onDragOver={(e) => dragOver(e)}
//       onDrop={(e) => drop(e)}
//     >
//       {children}
//     </div>
//   );
// }

export default function Column({
  children,
  onDrop,
  nodeData,
  currentNodeData
}) {
  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="column"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => onDrop(e, currentNodeData, nodeData)}
    >
      {children}
    </div>
  );
}
