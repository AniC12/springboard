import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendingMachine from './VendingMachine';
import Candy from "./Candy";
import StringCheese from "./StringCheese";
import Water from "./Water";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VendingMachine />} />
          <Route path="/candy" element={<Candy />} />
          <Route path="/stringcheese" element={<StringCheese />} />
          <Route path="/water" element={<Water />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
