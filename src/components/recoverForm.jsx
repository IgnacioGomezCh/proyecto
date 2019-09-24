import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
    state = {
        data: {
            email: ""
        },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Correo")
    };

    doSubmit = () => {
        const { email, password } = this.state.data;
        console.log(this.state)
    };

    render() {
        return (
            <div className="m-3">
                <h1>Nuevo Usuario</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Correo")}
                    {this.renderButton("Recuperar Contraseña")}
                </form>
            </div>
        );
    }
}

export default LoginForm;