import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import NewsElements from './newsElements'
import Spinner from './spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const NewsContainer = (props) => {
    const [articles, setArticles] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    document.title = `News-Hub | ${props.category? capitalizeFirstLetter(props.category): "Home"}`

    const updateNews = async () => {

        props.setProgress(30);
        let url = props.category ? `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api1}&page=${page}&pageSize=${props.pageSize}` : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.api1}&page=${page}&pageSize=${props.pageSize}`;

        props.setProgress(75);
        let response = await fetch(url)
        let data = await response.json()
        setArticles(data.articles)
        setSpinner(false)
        setTotalResults(data.totalResults)
        props.setProgress(100);
    };

    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {

        let url = props.category ? `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api2}&page=${page + 1}&pageSize=${props.pageSize}` : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.api2}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let response = await fetch(url)
        let data = await response.json()
        setArticles(articles.concat(data.articles));
    }
    return (
        <>
            {spinner && <Spinner position="top" />}
            <h1 className='text-center' style={{ marginBottom: '0.5rem', marginTop: '1.5rem' }}>{`NewsHub - Top ${props.category ? capitalizeFirstLetter(props.category) : ""} Headlines`}</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults ? true : false}
                loader={<Spinner position="bottom" />}>
                {articles.map((element) => (
                    <div className="container-sm my-4" key={element.url}>
                        <NewsElements url={element.url} title={element.title} discription={element.description} image={element.urlToImage} author={element.author} time={element.publishedAt} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    )
}

NewsContainer.defaultProps = {
    pageSize: 20,
    totalResults: 0,
    api1: process.env.REACT_APP_NEWS_API1,
    api2: process.env.REACT_APP_NEWS_API2
}

NewsContainer.propTypes = { category: PropTypes.string }

export default NewsContainer