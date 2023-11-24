import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import DogList from './DogList';
import DogDetails from './DogDetails';
import Nav from './Nav';

function App({ dogs }) {
  return (
    <div className="App">
      <h1>Dog Finder</h1>
      <Router>
        <Nav dogs={dogs} />
        <Routes>
          <Route exact path="/dogs" element={<DogList dogs={dogs} />} />
          <Route path="/dogs/:name" element={<DogDetails dogs={dogs} />} />
          <Route path="/*" element={<Navigate to="/dogs" />} />
        </Routes>
      </Router>

    </div>
  );
}

App.defaultProps = {
  dogs: [
    {
      "name": "Whiskey",
      "age": 5,
      "src": "whiskey",
      "facts": [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      "name": "Duke",
      "age": 3,
      "src": "duke",
      "facts": [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      "name": "Perry",
      "age": 4,
      "src": "perry",
      "facts": [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    }
  ]
}

export default App;
