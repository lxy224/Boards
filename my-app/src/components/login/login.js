import React, { Component } from "react";
import {Link} from "react-router";
const md5 = require("md5");

export default class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        let user={
            username : this.refs.username.value,
            password:  md5(this.refs.password.value),
            token: md5(this.refs.username.value+this.refs.password.value)
        }
        this.props.login(user);
    }
    render(){
        return(
            <div className="wrap-form">
                <form className="pure-form pure-form-stacked loginForm" >
                    <legend>Login</legend>
                    <input type="email" placeholder="Email" ref="username"/>
                    <input type="password" placeholder="Password" ref="password"/>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>Sign in</button>
                </form>
                You don't have an account please
                <Link className="button-submit" to="/signup">
                    Sign up
                </Link>

            </div>
        )
    }
}