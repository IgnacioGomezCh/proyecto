import React, { Component } from 'react';
import * as contentful from 'contentful';
import NavBar from './navBar';
import styled from 'styled-components';
import Unit from './common/unit';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "./section.css";

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
        main: "",
        lessons: [],
    }
    client = contentful.createClient({ space: '2hnq8godjkak', accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8' })
    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }
    fetchPosts = () => this.client.getEntries({ 'order': 'sys.createdAt' });
    setPosts = response => {
        this.setState({ posts: response.items })
        this.prepareLists()
        //this.getPost()
        //this.showEntries()
    }

    showEntries = () => {
        this.state.posts.forEach(entry => {
            if (entry.fields) {
                console.log(entry.fields)
            }
        })
    }

    handleClick = () => {
        this.props.signOut()
    }

    prepareLists = () => {
        const info = []
        this.state.posts.forEach(entry => {
            var obj = JSON.parse(JSON.stringify(entry, null, 2))
            //console.log("HERE", obj)
            info.push(obj)
        });


        const sections = []
        const units = []
        const courses = []
        this.state.posts.forEach(entry => {
            if (entry['fields'].hasOwnProperty('unidad')) {
                let json = entry['fields']
                json["id"] = entry.sys.id
                sections.push(json)
            }
            else if (entry['fields'].hasOwnProperty('numero')) {
                let json = entry['fields']
                json["id"] = entry.sys.id
                units.push(json)
            }
            else if (entry['fields'].hasOwnProperty('seccion')) {
                let json = entry['fields']
                json["id"] = entry.sys.id
                courses.push(json)
            }
            console.log("Type", typeof entry)
        });
        this.setState({ sections, units, courses })
        console.log("Sections", this.state.sections)
        console.log("Units", this.state.units)
        console.log("Courses", this.state.courses)
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

    processLessons = (sectionId) => {
        var lessons = []
        this.state.courses.map((lesson) => {
            if (lesson.seccion.fields.id == sectionId) {
                lessons.push(lesson)
            }
        })
        console.log("LessonArray", lessons)
        this.setState({ lessons })
    }

    processSections(unitId) {
        return this.state.sections.map((section, i) => {
            console.log("Section Without Filter", section)
            console.log("Params", section.unidad.fields.id, unitId)
            if (section.unidad.fields.id == unitId) {
                console.log("Section Filter", section)
                return (
                    <button onClick={() => this.processLessons(section.id)} data-toggle="modal" data-target="#exampleModalCenter" key={i} type="button" class="list-group-item list-group-item-action">{section.numeroDeSeccion}</button>
                );
            }
        })
    }

    onSelectLesson = (lessonId) => {
        const location = {
            pathname: `lesson/${lessonId}`,
            props: {
                pid: lessonId
            }
        }
        this.props.history.push(location);
    }

    render() {
        return (<div>
            <NavBar signOut={() => this.handleClick()} />
            <center><h1>Unidades disponibles</h1></center>
            <br style={{ marginBottom: "20px" }} />
            <div class="row display-flex" style={{ marginLeft: "20px", marginRight: "20px" }}>
                {this.state.units.map((obj, i) => {
                    return (
                        <div class="col-lg-6">
                            <Unit key={i}
                                id={i}
                                title={obj.numero}
                                description={this.renderRichText(obj.descripcion)}
                                sections={this.processSections(obj.id)}
                            />
                            <br />
                        </div>
                    );
                })}
            </div>


            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Seleccione la clase por ver</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                {this.state.lessons.length == 0 ? <center><h6>No hay clases para esta sección</h6></center> : null}
                                {this.state.lessons.map((lesson, i) => {
                                    return (
                                        <button onClick={() => { this.onSelectLesson(lesson.id) }} data-dismiss="modal" type="button" class="list-group-item list-group-item-action" key={i}>{lesson.titulo}</button>
                                    );
                                })}
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

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