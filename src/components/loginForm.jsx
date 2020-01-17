import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBarExterior from './navBarExterior';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const Container = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;


class LoginForm extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Correo"),
        password: Joi.string()
            .required()
            .label("Contraseña")
    };

    doSubmit = () => {
        const { authProps } = this.props;
        const { email, password } = this.state.data;
        console.log(this.state)
        authProps.signIn(email, password)
            .catch((err) => {
                console.log('Error signIn', err);
                store.addNotification({
                    title: "Error",
                    message: err,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
                this.setState({ errorMessage: err })
            });
    };

    render() {
        return (
            <div>
                <NavBarExterior setLogin={this.props.setLogin} setRegister={this.props.setRegister} />
                <ReactNotification />

                <Container>


                    <h1>Iniciar Sesión</h1>
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Correo")}
                        {this.renderInputPassword("password", "Contraseña")}
                        {this.renderButton("Entrar")}

                    </form>
                    <br />
                    <Link onClick={this.props.changeState}>
                        ¿Nuevo usuario? Regístrese aquí
                    </Link>
                </Container>
            </div>
        );
    }
}

/*{this.state.errorMessage &&
                        <p className="error"> {this.state.errorMessage} </p>}*/

export default LoginForm;