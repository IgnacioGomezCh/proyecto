import React, { Component } from 'react';
import "./notFound.css";

//https://www.fullstackreact.com/react-daily-ui/008-404-page/
class NotFound extends Component {
    state = {
        image : 'http://i.giphy.com/l117HrgEinjIA.gif'
    }
    render() {
        return (
        <div className="FourOhFour">
            <div className="bg" style={{ backgroundImage: 'url(' + this.state.image + ')'}}></div>
            <div className="code">404</div>
        </div>
        );
    }
}

export default NotFound;