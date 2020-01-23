import React from 'react';
import NewsLast from './newsLast';



const NewsWithId = ({ match, ...rest }) => {
    const { params: { newsId } } = match;
    console.log("PID", newsId);
    return <NewsLast pid={newsId} {...rest} />;
}

export default NewsWithId;