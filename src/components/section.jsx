import React, { Component } from 'react';
import * as contentful from 'contentful';
import NavBar from './navBar';
import styled from 'styled-components';
import Unit from './common/unit';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const SectionContainer = styled.section`
    flex-direction: column;
    max-width: 728px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 24px;
    padding-left: 24px;
    box-sizing: border-box;
    width: 100%;
`;

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
        //this.getPost()
        //this.showEntries()
    }

    showEntries = () => {
        this.state.posts.forEach( entry => {
            if(entry.fields){
                console.log(entry.fields)
            }
        })
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
        //console.log("Sections", this.state.sections)
        console.log("Units", this.state.units)
        //console.log("Courses", this.state.courses)
    }

    renderRichText = (paragraph) => {
        if(paragraph.nodeType === "embedded-asset-block"){
            let file = paragraph.data.target.fields.file
            if(file.hasOwnProperty("url")){
                return(
                    <img key={file.url} src={file.url} alt={file.title}/>
                );
            }
        }else{
            return(documentToReactComponents(paragraph));
        }
    }

    render() {
        return (<div>
            <NavBar />
            <SectionContainer>
                {this.state.units.map(( obj , i) =>{
                    return(
                        <Unit key={i}
                            id={i}
                            title={obj.numero}
                            description={this.renderRichText(obj.descripcion)}
                        />
                    );
                })}
            </SectionContainer>
        
            {/*this.state.posts.map(({ fields }, i) =>
                <pre key={i}>{JSON.stringify(fields, null, 2)}</pre>
            )*/}




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