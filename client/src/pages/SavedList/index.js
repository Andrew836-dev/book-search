import React from "react";
import BookCard from "../../components/BookCard";

function SavedList(props) {
  return <>
    <div className="container">
      <div className="columns">
        <div className="column">
          {props.saved.length
            ? props.saved.map(bookData => <BookCard key={bookData.id} data={bookData} toRemove={props.toRemove} saved={true} />)
            : <p>No saved books</p>}
        </div>
      </div>
    </div>
  </>
}
export default SavedList;