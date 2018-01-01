import React, { Component } from "react";
import {Link} from "react-router-dom"
export default class Login extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     username:"",
        //     password:""
        // };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        let user={};
        let md5 = require("md5");
        user.username = this.refs.username.value;
        user.password =  md5(this.refs.password.value);
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
                <Link className="button-submit" to="/signup">
                    Sign up
                </Link>

            </div>
        )
    }
}