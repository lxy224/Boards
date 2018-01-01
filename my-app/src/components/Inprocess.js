import React, { Component } from "react";
import InprocessItem from './inProcessItem'
import { DropTarget } from 'react-dnd';

const InprocessTarget = {
    drop(props,monitor){
        props.OpenToInProcess(monitor.getItem())
        return {name:monitor.getItem()}
    }
}

export  class Inprocess extends Component {
    render(){
        const {inProcessTasks,connectDropTarget,isOver,canDrop} = this.props;
        const isActive = isOver && canDrop;

        console.log({inProcessTasks})
        let backgroundColor;
        if (isActive) {
            backgroundColor = '#d85d71'
        } else if (canDrop) {
            backgroundColor = '#98aab3'
        }

        return connectDropTarget(
            <div className="InprocessBoard pure-u-1-4" style={{backgroundColor:backgroundColor}}>
                <div className="InProcessHeader BoardHeader">
                    <span className="title">In Process</span>
                    <span className="count">{inProcessTasks.length}</span>
                    <div className="cb"/>
                </div>
                <div className="BoardContent InProcessContent">
                    <ul>
                        {
                            inProcessTasks.map((inProcessTask)=>(
                                <InprocessItem inProcessTask={inProcessTask} key={inProcessTask.id}/>
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

export default DropTarget("open",InprocessTarget,collect)(Inprocess);