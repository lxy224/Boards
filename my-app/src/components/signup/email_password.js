import React, { Component } from 'react';

export class EmailAndPassword extends Component{
    componentDidMount() {
        this.refs.username.focus();
    }
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            isEmail:true
        }
    }
    handleSubmit(event){
        event.preventDefault();
        let md5 = require("md5");
        let user = {};
        user.username = this.refs.username.value;
        if(user.username.indexOf('@')<=0){
            this._notEmail();
            return
        }
        user.password = md5(this.refs.password.value);
        // for store the data
        this.props.onAccept(user);
        // for sending to backend
        this.props.signup(user);
    }
    _notEmail=()=>{
        this.setState({
            isEmail:false
        });
        let self = this;
        setTimeout(function () {
            self.setState({
                isEmail:true
            });
        },2000)
    };
    render(){
        return(
            <div className="wrap-form">
                <form className="pure-form pure-form-stacked loginForm" >
                    <legend>Sign Up</legend>
                    <input type="email" placeholder="Email" ref="username" onChange={this.handleChange}/>
                    <div className="email-alert" style={{display:this.state.isEmail?"none":"block"}}>
                        <span>Please include the "@" in the email address</span>
                    </div>
                    <input type="password" placeholder="Password" ref="password"/>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>Sign Up</button>
                </form>
            </div>
        )
    }
}