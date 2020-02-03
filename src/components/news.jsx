import React, { Component } from 'react';
import * as contentful from 'contentful';
import NavBar from './navBar';
import styled from 'styled-components';
import Unit from './common/unit';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "./news.css";
import NewsUnit from './common/newsUnit';

const Container = styled.section`
    flex-direction: column;
    max-width: 728px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 24px;
    padding-left: 24px;
    box-sizing: border-box;
    width: 100%;
`;



class News extends Component {
    state = {
        posts: [],
        news: []
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
        this.state.posts.forEach(entry => {
            if (entry.fields) {
                console.log("ENTRY", entry.fields)
            }
        })
    }

    prepareLists = () => {
        const info = []
        console.log(this.state.posts)
        this.state.posts.forEach(entry => {
            var obj = JSON.parse(JSON.stringify(entry, null, 2))
            console.log("HERE", obj)
            info.push(obj)
        });


        const news = []
        this.state.posts.forEach(entry => {
            if (entry['sys']['contentType']['sys']['id'] == "noticias") {
                let json = entry['fields']
                json["id"] = entry.sys.id
                console.log("JSON", json)
                news.push(json)
            }
        });
        this.setState({ news })
        console.log("News", this.state.news)
    }

    renderRichText = (paragraph) => {
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
    }

    handleClick = () => {
        this.props.signOut()
    }

    onSelectNews = (newsId) => {
        console.log("ASDASD")
        const location = {
            pathname: `news/${newsId}`,
            props: {
                pid: newsId
            }
        }
        this.props.history.push(location);
    }

    render() {
        return (<div>
            <NavBar signOut={() => this.handleClick()} />
            <Container>
                <center><h1>Unidades disponibles</h1></center>
                <br style={{ marginBottom: "20px" }} />

                <div class="row display-flex" style={{ marginLeft: "20px", marginRight: "20px" }}>
                    {this.state.news.map((obj, i) => {
                        return (
                            <div class="col-lg-6">

                                <NewsUnit
                                    onClick={() => this.onSelectNews(obj.id)}
                                    key={i}
                                    id={obj.id}
                                    title={obj.titulo}
                                    header={obj.cabecera}
                                />
                                <br />
                            </div>
                        );
                    })}
                </div>

            </Container>
        </div>);
    }
}

export default News;
