import React, { Component } from "react";
import { DragSource } from 'react-dnd';

const openBoardSource = {
    beginDrag(props) {
        return props.reviewTask
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
 class ReviewItem extends Component{
    render(){
        const {reviewTask, connectDragSource,isDragging} = this.props;
        // const { connectDragSource,isDragging} = this.props;
        const opacity = isDragging ? 0.4 : 1;
             return connectDragSource(
                 <li key={reviewTask.id} style={{opacity:opacity}}>
                     <div className="title-peo">
                         <span>{reviewTask.taskTitle}</span>
                         <span>{reviewTask.acceptedUser}</span>
                         <span className="cb"/>
                     </div>
                     <div className="content-peo">
                         {reviewTask.taskContent}
                     </div>
                     <div className="bottom-peo">
                         <span>{reviewTask.taskType}</span>
                         <span>{reviewTask.createdUser}</span>
                         <span className="cb"/>
                     </div>
                 </li>


             )
    }
}
function collect(connect,monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
// export default DragSource (props => props,openBoardSource,collect)(OpenItem);
export default DragSource ("review",openBoardSource,collect)(ReviewItem);
