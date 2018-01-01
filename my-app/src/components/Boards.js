import React, { Component } from "react";
// import update from 'immutability-helper'
// import { DragDropContext } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
// import Open from "./Open"
import OpenContainer from '../containers/Open'
import InprocessContainer from "../containers/inProcess"
import ReviewContainer from "../containers/Review"
import DoneContainer from "../containers/Done"
export class Boards extends Component {
    render(){
        return(
            <div className="Boards pure-g">
                <OpenContainer/>
                <InprocessContainer/>
                <ReviewContainer/>
                <DoneContainer/>
            </div>
        )
    }
}
