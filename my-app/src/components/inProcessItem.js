import React, { Component } from "react";
import { DragSource } from 'react-dnd';

const inProcessBoardSource = {
    beginDrag(props) {
        return props.inProcessTask
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
class InProcessItem extends Component{
    render(){
        const {inProcessTask, connectDragSource,isDragging} = this.props;
        // const { connectDragSource,isDragging} = this.props;
        const opacity = isDragging ? 0.4 : 1;
        return connectDragSource(
            <li key={inProcessTask.id} style={{opacity:opacity}}>
                <div className="title-peo">
                    <span>{inProcessTask.taskTitle}</span>
                    <span>{inProcessTask.acceptedUser}</span>
                    <span className="cb"/>
                </div>
                <div className="content-peo">
                    {inProcessTask.taskContent}
                </div>
                <div className="bottom-peo">
                    <span>{inProcessTask.taskType}</span>
                    <span>{inProcessTask.createdUser}</span>
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
export default DragSource ("inProcess",inProcessBoardSource,collect)(InProcessItem);
