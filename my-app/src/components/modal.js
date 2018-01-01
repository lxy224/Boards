
import React, { Component } from "react";

export default class Modal extends Component{
    render(){
        // const {idName}=this.props;
        return(
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h2>Add a Task</h2>
                        <a href="" className="btn-close" aria-hidden="true">×</a>
                    </div>
                    <div className="modal-body">
                        <form className="pure-form">
                            <fieldset>
                                <div className="pure-g">
                                    <input className="pure-u-1-2" type="text" placeholder="Task Name"/>
                                    <div className="pure-u-1-2">
                                        <label for="type">Task Type</label>
                                        <select id="type">
                                            <option>development</option>
                                            <option>testing</option>
                                            <option>document</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pure-g">
                                    <textarea className="pure-u-1-2" placeholder="Task Description"/>
                                    <div className="pure-u-1-2">
                                        <label for="accept">Grant</label>
                                        <select id="accept">
                                            <option>AA</option>
                                            <option>SD</option>
                                            <option>DF</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="" className="button-secondary pure-button">Save</a>
                        <a href="" className="pure-button">Cancel</a>
                    </div>
                </div>

        )
    }
}


