import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBar from './navBar';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;

class RegisterForm extends Form {
    state = {
        startDate: new Date(),
        data: {
            name: "",
            lName: "",
            email: "",
            password: "",
            ocupation: "Otro",

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
        authProps.signUp(email, password, fullName)
            .catch((err) => {
                console.log('Error signun', err);
                this.setState({ loading: false });
            });
    };

    handleChange = startDate => {
        this.setState({
            startDate
        });
    };

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    handleChangeDropdownE = () => {
        this.setState({ ocupation: "Estudiante" })
    };

    handleChangeDropdownA = () => {
        this.setState({ ocupation: "Administrativo" })
    };

    handleChangeDropdownP = () => {
        this.setState({ ocupation: "Profesor" })
    };

    handleChangeDropdownO = () => {
        this.setState({ ocupation: "Otro" })
    };

    render() {
        const { startDate, ocupation } = this.state;
        return (
            <div>
                <NavBar />
                <Container>
                    <h1>Nuevo Usuario</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("name", "Nombre")}
                        {this.renderInput("lName", "Apellido")}
                        <div className="form-group" style={{ textAlign: "left" }}>
                            <label >Ocupación</label>
                            <div class="dropdown" style={{ textAlign: "left" }}>
                                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {ocupation}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a onClick={this.handleChangeDropdownE} class="dropdown-item" href="#">Estudiante</a>
                                    <a onClick={this.handleChangeDropdownP} class="dropdown-item" href="#">Profesor</a>
                                    <a onClick={this.handleChangeDropdownA} class="dropdown-item" href="#">Administrativo</a>
                                    <a onClick={this.handleChangeDropdownO} class="dropdown-item" href="#">Otro</a>
                                </div>
                            </div>

                            <label >Sexo</label>
                            <div class="dropdown" style={{ textAlign: "left" }}>
                                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {ocupation}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a onClick={this.handleChangeDropdownE} class="dropdown-item" href="#">Masculino</a>
                                    <a onClick={this.handleChangeDropdownP} class="dropdown-item" href="#">Femenino</a>
                                </div>
                            </div>

                            <label >Fecha de Nacimiento</label>
                            <DatePicker style={{ width: "100%" }} className="form-control" selected={startDate} onChange={this.handleChange} />
                        </div>
                        {this.renderInput("email", "Correo")}
                        {this.renderInputPassword("password", "Contraseña")}
                        {this.renderButton("Registrarse")}
                    </form>
                </Container>
            </div>
        );
    }
}

export default RegisterForm;