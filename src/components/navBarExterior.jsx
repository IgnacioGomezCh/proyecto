import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class NavBarExterior extends Component {
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
                </div>
            </nav>
        );
    }

}

export default NavBarExterior;