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

class Lesson extends Component{
    state = {
        data: [],
        title: "",
        description:[],
        media: [],
        videos: [],
        videosToPlay: [],
    }

    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })

    componentDidMount() {
        this.client.getEntry(this.props.pid)
        .then(response =>{
            let data = response.fields
            this.setState({data})
            console.log(data)
            this.prepareInfo()
        })
    }

    prepareInfo = () => {
        const description = []
        const entry = this.state.data
        if(entry.hasOwnProperty('titulo')){
            let title = entry.titulo
            this.setState({title})
        }
        if(entry.hasOwnProperty('descripcion')){
            console.log("DescriptionProp",entry.descripcion.content )
            let content = entry.descripcion.content
            description.push(content)
            this.setState({description : content})
        }
        if(entry.hasOwnProperty('media')){
            let array = entry.media
            this.setState({media : array})
        }
        if(entry.hasOwnProperty('urlVideo')){
            let video = entry.urlVideo.content
            this.setState({videos : video})
            this.processVideo()
        }
  
        console.log("Description", this.state.description)
        console.log("Media", this.state.media)
        console.log("Videos", this.state.videos)
        console.log("Titulo", this.state.title)
    }

    processVideo(){
        const play = []
        this.state.videos.map(video => {
            const contentArray = video.content
            contentArray.map( element => {
                if(element.nodeType === "hyperlink"){
                    console.log(element)
                    const data = element.data
                    if(data.hasOwnProperty("uri")){
                        console.log(data)
                        play.push(data.uri)
                    }
                }
            })
        })
        this.setState({videosToPlay: play})
    }

    render(){
        return(
            <div>
                <NavBar />
                <br style={{marginTop:"20px"}}/>
                <center>
                    <h1>{this.state.title}</h1>
                </center>
                <Section>
                    <MainContainer>
                        {
                            this.state.description.map(paragraph => {
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
                            })
                        }
                        <center>
                            {
                                this.state.media.map(element => {
                                    const fields = element.fields
                                    if (fields.hasOwnProperty("file")) {
                                        let file = fields.file
                                        return(
                                            <img style={{width:"100%"}} key={file.url} src={file.url} alt={file.title}/>
                                        );
                                    }
                                })
                            }
                        </center>
                        <center>
                            {
                                this.state.videosToPlay.map(video => {
                                    return(
                                        <embed height="350" width="100%" style={{marginTop:"20px"}} src={video}/>
                                    );
                                })
                            }
                        </center>
                    </MainContainer>
                </Section>
                
            </div>
        );
    }
}

export default Lesson;