import React, { Component } from 'react';

class NewsUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }
    //https://colorlib.com/demo?theme=edusite


    render() {
        const { id, title, header } = this.props
        return (
            <div onClick={this.props.onClick} key={id} class="card" style={{ cursor: "pointer", height: "100%", marginBottom: "20px" }}>
                <div class="card-header">{title}</div>
                <div class="card-body">
                    <p class="card-text">{header}</p>
                </div>
            </div>
        );
    }
}

export default NewsUnit;