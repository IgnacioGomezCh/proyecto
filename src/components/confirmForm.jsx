import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/form";

class ConfirmationForm extends Form {
    state = {
        data: {
            code: ""
        },
        errors: {}
    };

    schema = {
        code: Joi.string()
            .required()
            .label("Código")
    };

    doSubmit = () => {

    };

    changeTitle = () => {
        this.setState({ title: "New title" });
    }



    render() {
        return (
            <div>
                <div className="m-3">
                    <h1>Confirmar Usuario</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("code", "Código")}
                        {this.renderButton("Entrar")}
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfirmationForm;