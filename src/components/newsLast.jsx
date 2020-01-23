import React, { Component } from 'react';
import * as contentful from 'contentful';
import NavBar from './navBar';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const MainContainer = styled.div`
    width: 100%;
    margin: 0px 24px;
    max-width: 800px;
    justify-content: center;
`;

const Section = styled.section`
    margin-top: 20px;
    margin-bottom: 50px;
    flex-direction: column;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 24px;
    padding-left: 24px;
    box-sizing: border-box;
    width: 100%;
`;
class NewsLast extends Component {
    state = {
        data: [],
        title: "",
        description: [],
        cabecera: ""
    }
    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })

    componentDidMount() {
        this.client.getEntry(this.props.pid)
            .then(response => {
                let data = response.fields
                this.setState({ data })
                console.log(data)
                this.prepareInfo()
            })
    }

    prepareInfo = () => {
        const description = []
        const entry = this.state.data
        if (entry.hasOwnProperty('titulo')) {
            let title = entry.titulo
            this.setState({ title })
        }
        if (entry.hasOwnProperty('cabecera')) {
            let cabecera = entry.cabecera
            this.setState({ cabecera })
        }
        if (entry.hasOwnProperty('descripcion')) {
            console.log("DescriptionProp", entry.descripcion.content)
            let content = entry.descripcion.content
            description.push(content)
            this.setState({ description: content })
        }

        console.log("Description", this.state.description)
        console.log("Titulo", this.state.title)
        console.log("Cabecera", this.state.cabecera)
    }


    render() {
        return (<div>
            <NavBar />
            <br style={{ marginTop: "20px" }} />
            <center>
                <h1>{this.state.title}</h1>
            </center>
            <Section>
                <MainContainer>
                    {
                        this.state.description.map(paragraph => {
                            if (paragraph.nodeType === "embedded-asset-block") {
                                let file = paragraph.data.target.fields.file
                                if (file.hasOwnProperty("url")) {
                                    return (
                                        <img key={file.url} src={file.url} alt={file.title} />
                                    );
                                }
                            } else {
                                return (documentToReactComponents(paragraph));
                            }
                        })
                    }

                </MainContainer>
            </Section>

        </div>);
    }
}
/*

*/

export default NewsLast;