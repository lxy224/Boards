import React, { Component } from "react";
export default class Signup extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        let md5 = require("md5");
        let user = {}
        user.username = this.refs.username.value;
        user.password = md5(this.refs.password.value);
        this.props.signup(user);
    }
    render(){
        return(
            <div className="wrap-form">
                <form className="pure-form pure-form-stacked loginForm" >
                    <legend>Sign Up</legend>
                    <input type="email" placeholder="Email" ref="username"/>
                    <input type="password" placeholder="Password" ref="password"/>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>Sign Up</button>
                </form>
            </div>
        )
    }
}