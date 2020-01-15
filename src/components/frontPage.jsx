import React, { Component } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { matchPath } from 'react-router';
import { useHistory } from "react-router-dom";


class FrontPage extends Component {
    state = { flag: true }

    handleChangeState = () => {
        const { flag } = this.state;
        this.setState({ flag: !flag });
        console.log("HANDLED CHANGE")

    }

    componentDidMount() {
        const isBlank = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "";

        if (isBlank) {
            window.location.href = "/login"
        }
    }

    componentDidUpdate() {
        const isRegister = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "register";

        if (isRegister) {
            window.location.href = "/login"
        }
        if (!isRegister) {
            window.location.href = "/register"
        }
    }

    render() {
        const { flag } = this.state
        console.log("RENDER FLAG " + this.state.flag)
        const isRegister = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "register";
        return (<div>{(flag && !isRegister) ? <div><LoginForm changeState={this.handleChangeState} authProps={this.props.authProps} /></div> :
            <RegisterForm changeState={this.handleChangeState} authProps={this.props.authProps} />}</div>);
    }
}

export default FrontPage;