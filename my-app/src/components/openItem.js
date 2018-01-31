import React, { Component } from "react";
import { DragSource ,DropTarget} from 'react-dnd';
import { findDOMNode } from 'react-dom'
import flow from 'lodash/flow';
import taskActions from "../utility/tasks"

const openBoardSource = {
    beginDrag(props) {
        return props.openTask
    },
    endDrag(props,monitor){
        const item = monitor.getItem();//获取的是beginDrag返回值
        // console.log(item);
        const dropResult = monitor.getDropResult();//获取的是Dustbin中drop的返回值
        if(dropResult){
            alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    }
}
const openBoardTarget = {
    hover(props,monitor,component){
        const dragIndex = monitor.getItem().sortedId//cardSource/beginDrag中的返回值
        const hoverIndex = props.sortedId;

        //避免自己占用自己的位置
        if(dragIndex === hoverIndex){
            return
        }

        //确定屏幕上的矩形
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        //获取垂直中间
        const hoverMiddleY = (hoverBoundingRect.bottom-hoverBoundingRect.top)/2;

        //确定鼠标位置
        const clientOffset = monitor.getClientOffset()

        //获取像素的顶部
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        //当鼠标穿过物品高度的一半时，只执行移动
        //向下拖动时，只有在光标低于50％
        //向上拖动时只在光标高于50％

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveOpenItem(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex

    }
}
 class OpenItem extends Component{
     handleDelete=()=>{
         this.props.deleteTask(this.props.openTask)
     }
    render(){
        const {openTask, connectDragSource,isDragging,connectDropTarget} = this.props;
        // const { connectDragSource,isDragging} = this.props;
        const opacity = isDragging ? 0.4 : 1;
             return connectDragSource(
                 connectDropTarget(
                     <li key={openTask.id} style={{opacity:opacity}}>
                         <div className="title-peo">
                             <span>{openTask.taskTitle}</span>
                             <span>{openTask.acceptedUser}</span>
                             <span><i className='icono-cross' onClick={this.handleDelete.bind(this)}/></span>
                             <span className="cb"/>
                         </div>
                         <div className="content-peo">
                             {openTask.taskContent}
                         </div>
                         <div className="bottom-peo">
                             <span className={openTask.taskType}>{openTask.taskType}</span>
                             <span>{openTask.createdUser}</span>
                             {
                                 openTask.attachment?
                                     <a target="_blank" href={"http://localhost:8009/api/tasks/view?id="+openTask._id}><i className="icono-paperClip"/></a>:
                                     <i/>
                             }
                             <span className="cb"/>
                         </div>
                     </li>
                 )
             )
    }
}

function Targetcollect(connect,monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }

}


function Sourcecollect(connect,monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
// export default DragSource (props => props,openBoardSource,collect)(OpenItem);
export default flow (
    DropTarget("open", openBoardTarget, Targetcollect),
    DragSource ("open",openBoardSource,Sourcecollect),

)(OpenItem)
