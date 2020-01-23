import NavBar from "./navBar";
import React, { Component } from 'react';
import styled from 'styled-components';


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
    render() {
        return (<div>

            <NavBar signOut={this.handleClick} />
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
                    <input type="text" class="form-control" placeholder="25502776" aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>
                <h4>
                    Correo
                </h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="genero_tec@tec.ac.cr" aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>
            </Container>
        </div>);
    }
}

export default Contact;