import React, { Component } from "react";
import Modal, {ModalBackground}from "./modal"
import userActions from "../utility/user"

// import {displayModel} from "../reducers/utility";
export default  class Header extends Component {
//     handleClick=()=>{
//         dispatch(displayModel(true));
// }
    constructor(props) {
        super(props);
        this.state = {
            searchBtn: true,
            users:[]
        };
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let searchVal = this.refs.search.value;
        this.props.getSearchItems(searchVal);
    }
    handleAddTask = (event) =>{
        event.preventDefault();
        userActions.getAllUsers()
            .then((users)=>{
                this.setState({
                    users:users
                })
            })
        this.props.displayModalFun(true)
    }

    render() {
        const {username} = this.props;
        let short_username= username.slice(0,2);
        return (
            <div className="Header pure-g">
                <Modal displayModal = {this.props.displayModal} username = {username} users ={this.state.users}/>
                <ModalBackground displayModal = {this.props.displayModal}/>
                <div className="name pure-u-1-2">
                    <span>Xiaoying Task</span>
                </div>
                <div className="add pure-u-3-24">
                    <span onClick={this.handleAddTask}>
                         <i className="icono-plus"/>
                    </span>
                </div>

                <div className="search pure-u-3-24">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input ref='search' type="text" className="no-border" style={{display:this.state.searchBtn?'none':'inline-block'}} />
                    </form>
                    <i className="icono-search" style={{display:this.state.searchBtn?'inline-block':'none'}} onClick={()=>{this.setState({ searchBtn: false})}}/>
                </div>
                {/*<div className="modal" id="addTask" aria-hidden="true">*/}
                    {/*<Modal/>*/}
                {/*</div>*/}

                <div className="person pure-u-6-24">
                    <div className="icon">
                        <span>{short_username}</span>
                    </div>

                </div>
            </div>

        )
    }
}