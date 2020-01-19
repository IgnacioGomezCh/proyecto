import React, { Component } from 'react';
import "./notFound.css";

//https://www.fullstackreact.com/react-daily-ui/008-404-page/
//https://colorlib.com/wp/free-404-error-page-templates/

class NotFound extends Component {

    render() {
        return (
        <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1>404</h1>
            </div>
            <h2>Lo sentimos, ¡Página no encontrada!</h2>
            <p>La página que está buscando podría haberse eliminado o no está disponible temporalmente.</p>
            <a href="/">Volver a la página de inicio</a>
        </div>
        </div>
        );
    }
}

export default NotFound;