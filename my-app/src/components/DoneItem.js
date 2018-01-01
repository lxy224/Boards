import React, { Component } from "react";
import { DragSource } from 'react-dnd';

const doneBoardSource = {
    beginDrag(props) {
        return props.doneTask
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
class DoneItem extends Component{
    render(){
        const {doneTask, connectDragSource,isDragging} = this.props;
        // const { connectDragSource,isDragging} = this.props;
        const opacity = isDragging ? 0.4 : 1;
        return connectDragSource(
            <li key={doneTask.id} style={{opacity:opacity}}>
                <div className="title-peo">
                    <span>{doneTask.taskTitle}</span>
                    <span>{doneTask.acceptedUser}</span>
                    <span className="cb"/>
                </div>
                <div className="content-peo">
                    {doneTask.taskContent}
                </div>
                <div className="bottom-peo">
                    <span>{doneTask.taskType}</span>
                    <span>{doneTask.createdUser}</span>
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
export default DragSource ("done",doneBoardSource,collect)(DoneItem);
