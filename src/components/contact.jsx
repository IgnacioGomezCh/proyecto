import NavBar from "./navBar";
import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';


const Container = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;


class Contact extends Component {
    state = {}

    handleClick = () => {
        this.props.signOut()
    }
    render() {
        return (<div>

            <NavBar signOut={() => this.handleClick()} />
            <Container>
                <h1>
                    Información
                </h1>
                <br />
                <br />
                <h4>
                    Telefono
                </h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="2550-2776" aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>
                <h4>
                    Correo
                </h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="genero_tec@tec.ac.cr" aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>

                <br />
                <br />

                <h4>
                    Páginas oficiales de soporte:
                </h4>
                <a target="_blank" href="https://www.tec.ac.cr/unidades/oficina-equidad-genero">OFICINA DE EQUIDAD DE GÉNERO</a>
                <br />
                <br />
                <h6>
                    Campañas:
                </h6>
                <a target="_blank" href="https://www.tec.ac.cr/alto-acoso-sexual">ALTO AL ACOSO SEXUAL</a>
            </Container>
        </div>);
    }
}

export default Contact;