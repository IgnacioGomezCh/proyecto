import React, { Component } from 'react';
import NavBar from './navBar';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;

class Landing extends Component {
    state = {}
    handleClick = () => {
        this.props.signOut()
    }

    getUserName = () =>{
        const user = Auth.currentUserInfo.name
        console.log(user)
    }
    render() {
        const { authProps } = this.props;
        console.log(authProps)
        return (
            <div>
                <NavBar/>
                <Container>
                    <h1 className="content m-2">Bienvenido</h1>
                    <br style={{marginTop: "30px"}}/>
                    <button type="button" class="btn btn-secondary" onClick={this.handleClick}>Cerrar Sesión</button>
                </Container>
            </div>
            );
    }
}

export default Landing;