import React, { Component } from "react";
import {EmailAndPassword} from "./email_password";
import {Validation} from "./validation";
export default class Signup extends Component{

    step = 0;
    value = null;
    nextStep(value){
        this.value = value;
        this.step++;
        this.forceUpdate();
    }
    handleSignup(user){
        this.props.signup(user);
    }
    handleSignupWithCode(code){
        let user = this.value;
        user.code = code;
        this.props.SignupWithCode(user);
    }
    render(){
        let component = null;
        if(this.step === 0) {
            component = (<EmailAndPassword onAccept={ this.nextStep.bind(this) } signup={this.handleSignup.bind(this)}></EmailAndPassword>);
        }
        if(this.step===1){
            component = (<Validation signupWithCode={this.handleSignupWithCode.bind(this)}></Validation>);
        }

        return(
            <div>
                {component}
            </div>
        )
    }
}