import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-3">
            <Link className="navbar-brand" to="/register">
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
                    <NavLink className="nav-item nav-link" to="/">
                        Inicio
          </NavLink>
                    <NavLink className="nav-item nav-link" to="/register">
                        Registrarse
          </NavLink>
                </div>
            </div>
        </nav>
    );

}

export default NavBar;