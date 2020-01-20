import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import styled from 'styled-components';
import NavBarExterior from './navBarExterior';


const Container = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;


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
        const { authProps } = this.props;
        const { code } = this.state.data;
        authProps.confirmSignUp(code)
            .catch((err) => {
                console.log('Error confirmSignUp', err);
                this.setState({ loading: false });
            });
    };

    changeTitle = () => {
        this.setState({ title: "New title" });
    }



    render() {
        return (
            <div>
                <NavBarExterior />
                <Container>
                    <h1>Confirmar Usuario</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("code", "Código")}
                        {this.renderButton("Entrar")}
                    </form>
                </Container>
            </div>
        );
    }
}

export default ConfirmationForm;