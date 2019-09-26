import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
                        this.setState({ loading: false });
                    });
    };

    render() {
        return (
            <div className="m-3">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Correo")}
                    {this.renderInputPassword("password", "Contraseña")}
                    {this.renderButton("Entrar")}
                </form>
            </div>
        );
    }
}

export default LoginForm;