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

    handleSetLogin = () => {
        this.setState({ flag: true })
    }

    handleSetRegister = () => {
        this.setState({ flag: false })
    }

    render() {
        const { flag } = this.state;
        return (<div>{flag ? <div><LoginForm changeState={this.handleChangeState} setLogin={this.handleSetLogin} setRegister={this.handleSetRegister} authProps={this.props.authProps}></LoginForm></div> : <RegisterForm changeState={this.handleChangeState} authProps={this.props.authProps} ></RegisterForm>}</div>);
    }
}

export default FrontPage;