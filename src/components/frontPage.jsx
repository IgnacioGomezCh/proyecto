import React, { Component } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
class FrontPage extends Component {
    state = { flag: true }

    handleChangeState = () => {
        console.log("HERE");
        const { flag } = this.state;
        this.setState({ flag: !flag });
        console.log(flag);
    }

    render() {
        const { flag } = this.state;
        console.log("HERE");
        return (<div>{flag ? <div><LoginForm changeState={this.handleChangeState} authProps={this.props.authProps}></LoginForm></div> : <RegisterForm authProps={this.props.authProps} ></RegisterForm>}</div>);
    }
}

export default FrontPage;