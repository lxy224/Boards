import React, { Component } from "react";
import Modal from "./modal"
export default  class Header extends Component {

    render() {
        const {username} = this.props;
        let short_username=username.slice(0,2)
        return (
            <div className="Header pure-g">
                <div className="name pure-u-1-2">
                    <span>Xiaoying Task</span>
                </div>
                <div className="add pure-u-3-24">
                    <a href="#addTask">
                        <i className="icono-plus"/>
                    </a>
                </div>

                <div className="search pure-u-3-24">
                    <i className="icono-search"/>
                </div>
                <div className="modal" id="addTask" aria-hidden="true">
                    <Modal/>
                </div>

                <div className="person pure-u-6-24">
                    <div className="icon">
                        <span>{short_username}</span>
                    </div>

                </div>
            </div>

        )
    }
}