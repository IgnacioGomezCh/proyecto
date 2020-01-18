import React, { Component } from 'react';
import NavBar from './navBar';
import styled from 'styled-components';
/*
Nombre
Correo
Fecha de Nacimiento
Ocupacion
Sexo
*/

const Container = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: auto;
    margin-top: 50px;
    box-sizing: border-box;
    text-align: center !important;
`;


class Profile extends Component {
    state = {
        name: "asdsadsad",
        email: "",
        birthday: "",
        ocupation: "",
        sex: ""
    }
    render() {
        const { name, email, birthday, ocupation, sex } = this.state
        return (<div>
            <NavBar />
            <Container>
                <h1>Perfil</h1>
                <br style={{ marginTop: "30px" }} />
                <h4>Nombre</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={name} aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>

                <h4>Correo</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={email} aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>

                <h4>Fecha de Nacimiento</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={birthday} aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>

                <h4>Ocupación</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={ocupation} aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>

                <h4>Sexo</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={sex} aria-label="Username" aria-describedby="basic-addon1" disabled />
                </div>
            </Container>

        </div>);
    }
}

export default Profile;