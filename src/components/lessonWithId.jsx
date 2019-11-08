import React from 'react';
import Lesson from './lesson';


const LessonWithId = ({match, ...rest}) => {
    const { params: { lessonId } } = match;
    console.log("PID", lessonId );
    return <Lesson pid={lessonId} { ...rest} />;
}

export default LessonWithId;