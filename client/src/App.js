import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SavedList from "./pages/SavedList"
import Detail from "./pages/Detail";
import "./bulma/css/bulma.min.css";
import "./App.css";
import API from "./utils/API";

function App() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    API
      .getSavedBooks()
      .then(response => {
        if (Array.isArray(response))
          setSavedBooks(response);
      })
      .catch(console.log);
  }, []);

  async function addBookToSaved(bookData) {
    API
      .saveBook(bookData)
      .then(response => {
        if (response)
          setSavedBooks([...savedBooks, response]);
      })
      .catch(console.log);
  }

  async function removeBookFromSavedWithInternalId(id) {
    API
      .deleteBookByID(id)
      .then(() => API.getSavedBooks())
      .then(setSavedBooks)
      .catch(console.log);
  }

  async function removeBookFromSavedWithExternalId(id) {
    const [targetBook] = savedBooks.filter(bookInfo => bookInfo.id === id);
    return removeBookFromSavedWithInternalId(targetBook._id);
  }


  return (
    <Router>
      <div>
        <header className="">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <h2 className="navbar-item">Google Books Search Tool</h2>
                <NavLink className="navbar-item" activeClassName="is-active" exact to="/">Home</NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to="/saved">Saved</NavLink>
              </div>
            </div>
          </nav>
        </header>
        <Switch>
          <Route exact path={["/", "/search"]}>
            <Homepage saved={savedBooks} toSave={addBookToSaved} toRemove={removeBookFromSavedWithExternalId} />
          </Route>
          <Route exact path="/saved">
            <SavedList saved={savedBooks} toRemove={removeBookFromSavedWithExternalId} />
          </Route>
          <Route exact path="/detail">
            <Detail saved={savedBooks} toSave={addBookToSaved} toRemove={removeBookFromSavedWithExternalId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
