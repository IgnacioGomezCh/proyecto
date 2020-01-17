import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {

    handleClick = () => {
        console.log("HERE")
        //this.props.signOut()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light m-3" >
                <h4>
                    Oficina de Equidad Género
                </h4>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/">
                            Inicio
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/profile">
                            Perfil
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/sections">
                            Cursos
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/contact">
                            Contáctenos
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/news">
                            Noticias
                        </NavLink>
                    </div>
                </div>

                <div class="navbar-nav">
                    <a class="nav-item nav-link" onClick={this.props.signOut} href="/">Cerrar Sesión</a>
                </div>
            </nav>
        );
    }

}

export default NavBar;