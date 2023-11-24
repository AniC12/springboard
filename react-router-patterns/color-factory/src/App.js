import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import AllColors from "./AllColors";
import ColorDetails from "./ColorDetails";
import AddNewColor from "./AddNewColor";


function App() {
  const [colors, setColors] = useState([]);

  function addColor(newColor) {
    setColors([...colors, newColor]);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/colors" element={<AllColors colors={colors} />} />
          <Route path="/colors/new" element={<AddNewColor addColor={addColor} />} />
          <Route path="/colors/:name" element={<ColorDetails colors={colors} />} />
          <Route path="*" element={<Navigate to="/colors" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
