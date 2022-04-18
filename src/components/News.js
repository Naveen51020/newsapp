import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsdata.io/api/1/news?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);

    setResults(parsedData.results);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News.com`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsdata.io/api/1/news?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setResults(results.concat(parsedData.results));
    setTotalResults(parsedData.totalResults);
  };

  return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          News.com - {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={results.length}
          next={fetchMoreData}
          hasMore={results.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {results?.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.image_url}
                    newsUrl={element.link}
                    author={element.creator}
                    date={element.pubDate}
                    source={element.source_id}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  category: "top",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
