import React, { Component } from 'react';
import NavBar from './navBar';
import DataUnit from './dataUnit'
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import * as contentful from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Container = styled.div`
    width: 100%;
    padding: 15px;
    margin: auto;
    box-sizing: border-box;
    text-align: center !important;
`;

const MainContainer = styled.div`
    width: 100%;
    margin: 0px 24px;
    max-width: 680px;
    justify-content: center;
`;

const Section = styled.section`
    flex-direction: column;
    max-width: 728px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 24px;
    padding-left: 24px;
    box-sizing: border-box;
    width: 100%;
`;

const P = styled.p`
    justify-content: center;
`;


class Landing extends Component {
    state = {
        posts: [],
        sections: [],
        units: [],
        courses: [],
        main: "",
        content: []
    }

    handleClick = () => {
        this.props.signOut()
    }

    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })

    componentDidMount() {
        this.client.getEntry("57JtssG1UUpRmHmZ8ze5GF")
            .then(response => {
                let content = response.fields.mainText.content
                console.log(response.fields.mainText.content)
                this.setState({ content: content })
            })
    }

    getUserName = () => {
        const user = Auth.currentUserInfo.name
        console.log(user)
    }
    render() {
        return (
            <div>
                <NavBar signOut={() => this.handleClick()} />
                <Container>
                    <h1 className="content m-2">Bienvenido</h1>
                    <br style={{ marginTop: "30px" }} />

                </Container>
                <Section>
                    <MainContainer>
                        {
                            this.state.content.map(paragraph => {
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
            </div>
        );
    }
}

export default Landing;