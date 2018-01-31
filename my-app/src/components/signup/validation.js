import React, { Component } from 'react';

export class Validation extends Component {
    componentDidMount() {
        this.refs.validation.focus();
    }
    handleSubmit=()=>{
        this.props.signupWithCode(this.refs.validation.value)
    }
    render(){
        return(
            <div className="wrap-form">
                <form className="pure-form pure-form-stacked loginForm" >
                    <input type="text" placeholder="Validation code" ref="validation"/>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}
