import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
    state = {
        data: {
            name: "",
            lName: "",
            email: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        name: Joi.string()
            .required()
            .label("Nombre"),
        lName: Joi.string()
            .required()
            .label("Apellido"),
        email: Joi.string()
            .required()
            .email()
            .label("Correo"),
        password: Joi.string()
            .required()
            .label("Contraseña")
    };

    doSubmit = () => {
        const { name, lName, email, password } = this.state.data;
        const { authProps } = this.props;
        console.log(this.state)
        const fullName = name + " " + lName
        authProps.signUp(email,password,fullName)
        .catch((err) => {
            console.log('Error signun', err);
            this.setState({ loading: false });
        });
    };

    render() {
        return (
            <div className="m-3">
                <h1>Nuevo Usuario</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Nombre")}
                    {this.renderInput("lName", "Apellido")}
                    {this.renderInput("email", "Correo")}
                    {this.renderInputPassword("password", "Contraseña")}
                    {this.renderButton("Registrarse")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;