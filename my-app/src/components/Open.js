import React, { Component } from "react";
// import { DragSource } from 'react-dnd'
import OpenItem from './openItem'

export default class Open extends Component {

    // constructor(props){
    //     super(props)
    //     this.moveOpenItem = this.moveOpenItem.bind(this)
    // }
    render(){
        const {openTasks,OpenToInProcess,moveOpenItem,deleteTask} = this.props;
        console.log(openTasks);
        return(
            <div className="OpenBoard pure-u-1-4">
                <div className="OpenBoardHeader BoardHeader">
                    <span className="title">Open</span>
                    <span className="count">{openTasks.length}</span>
                    <div className="cb"/>
                </div>
                <div className="BoardContent OpenBoardContent">
                    <ul>
                        {
                            openTasks.map((openTask,i)=>(
                                <OpenItem deleteTask={deleteTask} sortedId={i} openTask={openTask} key={i} OpenToInProcess={OpenToInProcess} moveOpenItem={moveOpenItem}/>
                            ))
                        }

                    </ul>
                </div>
            </div>
        )
    }
}
