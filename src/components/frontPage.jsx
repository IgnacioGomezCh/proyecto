import React, { Component } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { Link, NavLink } from "react-router-dom";
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
        return (<div>{flag ? <div><LoginForm changeState={this.handleChangeState} authProps={this.props.authProps}></LoginForm> <Link onClick={this.handleChangeState}>
            ¿Nuevo usuario? Regístrese aquí
        </Link></div> : <RegisterForm authProps={this.props.authProps} ></RegisterForm>}</div>);
    }
}

export default FrontPage;