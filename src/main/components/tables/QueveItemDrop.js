import React from 'react'
import { DropTarget } from 'react-dnd'


const queveItemTarget = {
  canDrop(props, monitor) {
    const { originalIndex } = monitor.getItem()
    const { position } = props

    return originalIndex !== position && originalIndex - 1 !== position
  },

  drop(props, monitor) {
    const { id, originalIndex } = monitor.getItem()
    const { position } = props
    
    props.moveItem(id, position, originalIndex)
  },
}


const QueveItemDrop = props => {
  const {
    canDrop,
    connectDropTarget,
    isOver,
  } = props

  let queveItemClass = ''
  queveItemClass += canDrop ? ' queve-item__drop--droppable' : ''
  queveItemClass += isOver ? ' queve-item__drop--hover' : ''

  return connectDropTarget(
    <div className={`queve-item queve-item__drop ${queveItemClass}`}>
      <span className="queve-item__position" />
      <div className="queve-item__wrapper" />
      <div className="queve-item__state" />
    </div>
  )
}

export default DropTarget('queve-item', queveItemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  getItem: monitor.getItem(),
})
)(QueveItemDrop)
