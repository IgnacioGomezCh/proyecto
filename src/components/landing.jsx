import React, { Component } from 'react';
import NavBar from './navBar';


class Landing extends Component {
    state = {}
    handleClick = () => {
        const { authProps } = this.props;
        authProps.signOut();
    }
    render() {
        const { authProps } = this.props;
        console.log(authProps)
        return (<div><NavBar></NavBar><h1 className="content m-2">Titulo</h1><button onClick={this.handleClick}>out</button></div>);
    }
}

export default Landing;