import React, { Component } from 'react';
import * as contentful from 'contentful';
class DataUnit extends Component {
    state = {
        posts: []
    }
    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })
    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }
    fetchPosts = () => this.client.getEntries();
    setPosts = response => {
        this.setState({ posts: response.items })
    }
    render() {
        return (<div>
            <p>This is the Blog Page</p>
            <br />
            {this.state.posts.map(({ fields }, i) =>
                <pre key={i}>{JSON.stringify(fields, null, 2)}</pre>
            )}
        </div>
        );
    }
}

export default DataUnit;