import React, {Component } from 'react';

class Unit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }
    //https://colorlib.com/demo?theme=edusite

    render(){
        const {id,title, description} = this.props
        return(
            <div key={id} class="card">
                <div class="card-header">{title}</div>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                    <a href="#" class="btn btn-primary">Empezar</a>
                </div>
            </div>
        );
    }
}

export default Unit;