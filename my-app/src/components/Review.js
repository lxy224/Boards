import React, { Component } from "react";
import ReviewItem from "./reviewItem"
import { DropTarget } from 'react-dnd';

const ReviewTarget = {
    drop(props,monitor){
        props.InProcessToReview(monitor.getItem())
        return {name:monitor.getItem()}
    }
}
export  class Review extends Component {
    render(){
        const {reviewTasks,InProcessToReview,connectDropTarget,isOver,canDrop,deleteTask} = this.props;
        const isActive = isOver && canDrop;

        let backgroundColor;
        if (isActive) {
            backgroundColor = '#64c9fc'
        } else if (canDrop) {
            backgroundColor = '#98aab3'
        }
        return connectDropTarget(
            <div className="ReviewBoard pure-u-1-4" style={{backgroundColor:backgroundColor}}>
                <div className="ReviewBoardHeader BoardHeader">
                    <span className="title">Review</span>
                    <span className="count">{reviewTasks.length}</span>
                    <div className="cb"/>
                </div>
                <div className="BoardContent ReviewBoardContent">
                    <ul>
                        {
                            reviewTasks.map((reviewTask,index)=>(
                                <ReviewItem reviewTask={reviewTask} key={index} InProcessToReview={InProcessToReview} deleteTask={deleteTask}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
function collect(connect,monitor) {
    return{
        connectDropTarget:connect.dropTarget(),
        isOver:monitor.isOver(),
        canDrop:monitor.canDrop()
    }
}

export default DropTarget("inProcess",ReviewTarget,collect)(Review);