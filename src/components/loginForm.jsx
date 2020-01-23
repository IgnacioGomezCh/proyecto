import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBarExterior from './navBarExterior';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import Loader from 'react-loader-spinner'
import logo_tec from '../assets/logo-tec.png'
import logo_eg from '../assets/equidad-color.png'

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
        loading: false,
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
            .label("Correo")
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "El correo no puede ser vacío!";
                            break;
                        case "string.email":
                            err.message = "Debe ser un correo válido!";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        password: Joi.string()
            .required()
            .label("Contraseña")
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "La contraseña no puede ser vacía!";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
    };

    errorParser(err) {
        if (err === "Incorrect username or password.") {
            return "Nombre de usuario o contraseña errónea"
        }
        else if (err === "User does not exist.") {
            return "Usuario no existe"
        }
        else {
            return "Error al iniciar sesión"
        }
    }

    doSubmit = () => {
        this.setState({ loading: true })
        const { authProps } = this.props;
        const { email, password } = this.state.data;
        console.log(this.state)
        authProps.signIn(email, password)
            .catch((err) => {
                this.setState({ loading: false })
                console.log('Error signIn', err);
                store.addNotification({
                    title: "Error",
                    message: this.errorParser(err),
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
        const { loading } = this.state
        return (
            <div>
                <NavBarExterior setLogin={this.props.setLogin} setRegister={this.props.setRegister} />
                <ReactNotification />

                <Container>
                    <center>
                        <img src={logo_tec} style={{ width: "50%", height: "auto" }} />
                        <img src={logo_eg} style={{ width: "50%", height: "auto" }} />
                    </center>
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
                    {loading ? <Loader type="Puff" color="#696969" height={50} width={50} /> : null}
                </Container>

            </div>
        );
    }
}

export default LoginForm;