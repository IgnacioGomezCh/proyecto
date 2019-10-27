import React, { Component } from 'react';
import * as contentful from 'contentful';
import NavBar from './navBar';

class Section extends Component {
    state = {
        posts: [],
        sections: [],
        units: [],
        courses: [],
        main: ""
    }
    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })
    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }
    fetchPosts = () => this.client.getEntries();
    setPosts = response => {
        this.setState({ posts: response.items })
        this.prepareLists()
        this.getPost()
    }

    prepareLists = () => {
        const info = []
        this.state.posts.forEach(entry => {
            var obj = JSON.parse(JSON.stringify(entry, null, 2))
            console.log("HERE", obj)
            info.push(obj)
        });
        console.log(info['mainText'])

        const sections = []
        const units = []
        const courses = []
        this.state.posts.forEach(entry => {
            if (entry['fields'].hasOwnProperty('unidad')) {
                sections.push(entry['fields'])
            }
            else if (entry['fields'].hasOwnProperty('numero')) {
                units.push(entry['fields'])
            }
            else if (entry['fields'].hasOwnProperty('seccion')) {
                courses.push(entry['fields'])
            }
            console.log("Type", typeof entry)
        });
        this.setState({ sections, units, courses })
        console.log("Sections", this.state.sections)
        console.log("Units", this.state.units)
        console.log("Courses", this.state.courses)
    }


    getPost = () => {
        const content = this.state.posts[0]['fields']['mainText']['content']
        var res = ""

        content.forEach(part => {
            try {
                console.log(part['content']['0']['value'])
                res.concat(part['content']['value']);
            } catch (error) {

            }
        });
        this.setState({ main: res })
    }




    render() {
        return (<div>
            <NavBar />

            {this.state.posts.map(({ fields }, i) =>
                <pre key={i}>{JSON.stringify(fields, null, 2)}</pre>
            )}




            <p>This is the Blog Page</p>
            <h1>{this.state.main}</h1>
            <br />

        </div>
        );
    }
}
/*
{this.state.posts.map(({ fields }, i) =>
                <pre key={i}>{JSON.stringify(fields, null, 2)}</pre>
            )}
*/
export default Section;