import React from 'react'

export default function newsElements(props) {

    const imageStyle = {
        height: 'auto',
        maxHeight: '400px',
        overflow: 'hidden'
    }

    const noImageStyle = {
        position: 'relative',
        top: '-50%'
    }

    const { title, discription, url, image, time, author } = props;

    return (
        <>
            <div className="card">
                <div className="card-header">
                    From {author ? author : "unknown"}, published at {new Date(time).toUTCString().substring(-1, 25)}
                </div>
                <div style={image ? imageStyle : noImageStyle}>
                    <img src={image ? image : "https://www.vuelio.com/uk/wp-content/uploads/2019/02/Breaking-News.jpg"} className="card-img-top" alt="news" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{discription}</p>
                    <a href={url} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</a>
                </div>
            </div>
        </>
    )
}
