import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function SearchForm() {
  return (<div className="columns">
    <div className="column is-half">
      <label htmlFor="basicSearch">Search</label>
      <input className="input" type="text" name="basicSearch" />
      <input className="button" type="submit" value="Search" />
    </div>
    <Router hashType="noslash">
      <Switch>
        <Route exact path="/advanced">
          <div className="column is-half">
            {/* <Link to="/" className="input">Toggle Advanced Search</Link> */}
            <label htmlFor="intitle">Title</label>
            <input className="input" type="text" name="intitle" />
            <label htmlFor="inauthor">Author</label>
            <input className="input" type="text" name="inauthor" />
            <label htmlFor="inpublisher">Publisher</label>
            <input className="input" type="text" name="inpublisher" />
            <label htmlFor="subject">Subject</label>
            <input className="input" type="text" name="subject" />
            <label htmlFor="isbn">ISBN</label>
            <input className="input" type="text" name="isbn" />
          </div>
        </Route>
        <Route exact path="/">
          <div className="column is-half">
            {/* <Link to="/advanced" className="input">Toggle Advanced Search</Link> */}
          </div>
        </Route>
      </Switch>
    </Router>
  </div>
  )
}

export default SearchForm;