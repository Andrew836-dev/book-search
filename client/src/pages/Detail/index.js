import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";

function Detail(props) {
  const location = useLocation();
  const [bookData, setBookData] = useState({});
  const { volumeInfo } = bookData;
  useEffect(() => {
    const id = location.search.slice(1);
    const [savedDetail] = props.saved.filter(book => book.id === id);
    if (savedDetail)
      return setBookData(savedDetail)
    API
      .searchForBookWithId(id)
      .then(setBookData)
      .catch(console.log);
  }, [location.search, props.saved])

  return <>
    <div className="container">
      <div className="columns is-mobile">
        {console.log(bookData)}
        {bookData.id
          ? <div className="column">
            <h3>{volumeInfo.title}</h3>
            {volumeInfo.subtitle ? <h4>{volumeInfo.subtitle}</h4> : null}
            <p>
              {volumeInfo.authors
                ? `Author${volumeInfo.authors.length > 1 ? "s" : ""}: ${volumeInfo.authors.join(", ")}`
                : "No Author data."}
            </p>
            <div className="columns">
              <div className="column">
                <img alt="" src={volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "#"} style={{ height: "192px" }}></img>
              </div>
              <div className="column">
                <p>{volumeInfo.description ? volumeInfo.description : "No description data."}</p>
                <button onClick={() => props.toSave(volumeInfo)}>Save</button>
              </div>
            </div>
          </div>
          : <p>Searching for Book data</p>}
      </div>
    </div>
  </>
}

export default Detail;