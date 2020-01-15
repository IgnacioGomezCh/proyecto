import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";


class NavBar extends Component {

    state = { show: false }


    handleLogout = () => {
        return false
    }

    handleLogged = () => {
        return "disabled-link"
    }


    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light m-3" >
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/" >
                    Oficina de Equidad Género
                </Link>
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
                        <NavLink className="nav-item nav-link mr-sm-2" to="/">
                            Inicio
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/sections">
                            Secciones
                        </NavLink>

                    </div>
                </div>
                <div class="navbar-nav">
                    {this.state.show ? <a class="nav-item nav-link" onclick="return false;" href="#">Cerrar Sesión</a> : null}
                </div>
            </nav>
        );
    }

}

export default NavBar;