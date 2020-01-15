import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBar from './navBar';
import styled from 'styled-components';
import { Link } from "react-router-dom";


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

        authProps.signIn(email, password)
            .catch((err) => {
                console.log('Error signIn', err);
                this.setState({ loading: false });
            });
    };

    changeTitle = () => {
        this.setState({ title: "New title" });
    }

    render() {


        return (
            <div>
                <NavBar />
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

export default LoginForm;