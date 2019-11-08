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
        const {id,title, description, sections} = this.props
        return(
            <div key={id} class="card" style={{height:"100%", marginBottom:"20px"}}>
                <div class="card-header">{title}</div>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                    <button onClick={() => this.setState({ open: !this.state.open })} href="#" class="btn btn-primary">Empezar</button>
                </div>
                {!this.state.open ? <ul class="list-group">{sections}</ul> : null }
            </div>
        );
    }
}

export default Unit;