import React, { useRef, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";
import API from "../../utils/API";

function Homepage(props) {
  const history = useHistory();
  const location = useLocation();
  const formInput = useRef();
  const [bookResults, setBookResults] = useState([]);
  const [searchData, setSearchData] = useState({ totalItems: 0, currentPage: 0, lastSearch: null })

  function searchFieldSubmit(event) {
    event.preventDefault();
    const formData = formInput.current.elements;
    let term = convertFormDataToSearchString(formData) || "";
    if (!term) {
      return console.log("Cannot search for nothing!");
    }
    history.push({ search: term });
    // console.log(term);

  }
  useEffect(() => {
    if (location.search.slice(1) === "") return undefined;
    API
      .searchForTerm(location.search.slice(1))
      .then(({ items, totalItems }) => {
        if (Array.isArray(items)) setBookResults(items);
        else setBookResults([]);
        setSearchData({ totalItems, currentPage: 1, lastSearch: location.search.slice(1) });
      });
  }, [location.search])

  function convertFormDataToSearchString(formData) {
    // length of 2 is the basic search form
    if (formData.length === 2) return formData.basicSearch.value.trim();
    const searchQuery = [];
    // excluding the basicSearch, form inputs have the same names as the google api search keywords
    const formFields = ["basicSearch", "intitle", "inauthor", "inpublisher", "subject", "isbn"];

    formFields.forEach((formField, index) => {
      const value = formData[formField].value.trim();
      if (index === 0) return searchQuery.push(value);
      if (value) searchQuery.push(formField + ":" + value);
    });

    return searchQuery.join(" ");
  }

  return (
    <div className="container">
      <div className="columns">
        <form className="column" ref={formInput} onSubmit={searchFieldSubmit}>
          <SearchForm />
        </form>
      </div>
      <div className="columns">
        <div className="column">
          {(bookResults.length
            ? bookResults.map(book => <BookCard key={book.id} data={book} toSave={props.toSave} toRemove={props.toRemove} saved={props.saved.some(savedBook => book.id === savedBook.id)} />)
            : (searchData.currentPage > 0
              ? <p>No search results</p>
              : <p>Search for a book!</p>))}
        </div>
      </div>
    </div>
  )
}
export default Homepage;
