import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBarExterior from './navBarExterior';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
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
        sexBtn: "Masculino",
        startDate: new Date(),
        ocupation: "Administrativo",
        sex: "male",
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
            .label("Nombre")
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "El nombre no puede ser vacío!";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        lName: Joi.string()
            .required()
            .label("Apellido")
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "El apellido no puede ser vacío!";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
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

    doSubmit = () => {
        const { name, lName, email, password } = this.state.data;
        const { ocupation, sex } = this.state
        const { authProps } = this.props;
        console.log(this.formatDate(this.state.startDate))
        const fullName = name + " " + lName
        authProps.signUp(email, password, fullName, sex, this.formatDate(this.state.startDate), ocupation)
            .catch((err) => {
                console.log('Error signun', err);
                this.setState({ loading: false });
            });
    };

    handleChangeDate = startDate => {
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

    handleChangeDropdownM = () => {
        this.setState({ sexBtn: "Masculino" })
        this.setState({ sex: "male" })
    };

    handleChangeDropdownF = () => {
        this.setState({ sexBtn: "Femenino" })
        this.setState({ sex: "female" })
    };

    handleChangeDropdownOth = () => {
        this.setState({ sexBtn: "Otro" })
        this.setState({ sex: "other" })
    };

    render() {
        const { startDate, ocupation, sexBtn } = this.state;
        return (
            <div>
                <NavBarExterior setLogin={this.props.setLogin} setRegister={this.props.setRegister} />
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
                                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButtonSex" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {sexBtn}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButtonSex">
                                    <a onClick={this.handleChangeDropdownM} class="dropdown-item" href="#">Masculino</a>
                                    <a onClick={this.handleChangeDropdownF} class="dropdown-item" href="#">Femenino</a>
                                    <a onClick={this.handleChangeDropdownOth} class="dropdown-item" href="#">Other</a>
                                </div>
                            </div>
                            <label >Fecha de Nacimiento</label>
                            <DatePicker dateFormat="dd-MM-yyyy" style={{ width: "100%" }} className="form-control" selected={startDate} onChange={this.handleChangeDate} />

                        </div>
                        {this.renderInput("email", "Correo")}
                        {this.renderInputPassword("password", "Contraseña")}
                        {this.renderButton("Registrarse")}

                    </form>
                    <Link onClick={this.props.changeState}>
                        ¿Ya tiene cuenta? Ingrese aquí
                    </Link>
                </Container>
            </div>
        );
    }
}

export default RegisterForm;