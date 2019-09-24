import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RestaurantForm extends Form {
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
        const { name, food, schedule, cost, contactInfo, x, y } = this.state.data;
        const costINT = parseInt(cost, 10);
        console.log(this.state)
    };

    render() {
        return (
            <div>
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

export default RestaurantForm;