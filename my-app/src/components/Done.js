import React, { Component } from "react";
import DoneItem from './DoneItem'
import { DropTarget } from 'react-dnd';

const DoneTarget = {
    drop(props,monitor){
        props.ReviewToDone(monitor.getItem())
        return {name:monitor.getItem()}
    }
}

export  class Done extends Component {
    render(){
        const {doneTasks,connectDropTarget,isOver,canDrop} = this.props;
        const isActive = isOver && canDrop;

        let backgroundColor;
        if (isActive) {
            backgroundColor = '#a79be8'
        } else if (canDrop) {
            backgroundColor = '#98aab3'
        }
        return connectDropTarget(
            <div className="DoneBoard pure-u-1-4" style={{backgroundColor:backgroundColor}}>
                <div className="DoneBoardHeader BoardHeader">
                    <span className="title">Done</span>
                    <span className="count">{doneTasks.length}</span>
                    <div className="cb"/>
                </div>
                <div className="BoardContent DoneBoardContent">
                    <ul>
                        {
                            doneTasks.map((doneTask)=>(
                                <DoneItem doneTask={doneTask} key={doneTask.id}/>
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

export default DropTarget("review",DoneTarget,collect)(Done);