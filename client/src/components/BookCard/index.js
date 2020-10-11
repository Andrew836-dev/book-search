import React from "react";
import "./index.css";

function BookCard(props) {
  const { volumeInfo, id } = props.data;
  return <div className="card">
    <h3>{volumeInfo.title}</h3>
    {volumeInfo.subtitle ? <h4>{volumeInfo.subtitle}</h4> : null}
    <p>
      {volumeInfo.authors
        ? `Author${volumeInfo.authors.length > 1 ? "s" : ""}: ${volumeInfo.authors.join(", ")}`
        : "No Author data."}
    </p>
    <div className="columns is-mobile">
      <div className="column">
        <img alt="" src={volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "#"} style={{ height: "192px" }}></img>
      </div>
      <div className="column">
        <p style={{ height: "200px", overflowY: "hidden" }}>{volumeInfo.description ? volumeInfo.description : "No description data."}</p>
        <a className="button" href={`/detail/?${id}`}>View Detail</a>
        {props.saved 
        ? <button className="button" onClick={() => props.toRemove(id)}>Unsave</button>
        :<button className="button" onClick={() => props.toSave(props.data)}>Save</button>}
      </div>
    </div>
  </div>
}
export default BookCard;