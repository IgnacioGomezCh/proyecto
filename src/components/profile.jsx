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
        name: "",
        email: "",
        birthday: "",
        ocupation: "",
        sex: ""
    }

    handleClick = () => {
        this.props.signOut()
    }

    componentDidMount() {
        this.props.userAttributes()
            .then(attr => {
                console.log("Profile", attr)
                if (attr.hasOwnProperty("name")) {
                    let name = attr["name"]
                    this.setState({ name })
                }
                if (attr.hasOwnProperty("custom:occupation")) {
                    let ocupation = attr["custom:occupation"]
                    this.setState({ ocupation })
                }
                if (attr.hasOwnProperty("email")) {
                    let email = attr["email"]
                    this.setState({ email })
                }
                if (attr.hasOwnProperty("birthdate")) {
                    let birthday = attr["birthdate"]
                    this.setState({ birthday })
                }
                if (attr.hasOwnProperty("gender")) {
                    let sex = attr["gender"]
                    if (sex === "male") {
                        this.setState({ sex: "Masculino" })
                    }
                    else if (sex === "female") {
                        this.setState({ sex: "Femenenino" })
                    }
                    else {
                        this.setState({ sex: "Otro" })
                    }

                }

            })
    }


    render() {
        const { name, email, birthday, ocupation, sex } = this.state
        return (<div>
            <NavBar signOut={() => this.handleClick()} />
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