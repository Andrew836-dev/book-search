import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SavedList from "./pages/SavedList"
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Google Books Search Tool</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/saved">Saved</NavLink>
          </header>
          <Switch>
            <Route exact path="/saved" component={SavedList} />
            <Route component={Homepage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
