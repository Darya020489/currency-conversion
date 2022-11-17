import React from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import "./App.css";
import CurrencyConventer from "./components/CurrencyConventer";
import ExchangeRates from "./components/ExchangeRates";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to the currency conversion app</h1>
        <nav>
          <NavLink className='header__link' to="/">Currency conventer</NavLink>
          <NavLink className='header__link' to="/exchangeRates">Exchange rates</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<CurrencyConventer />} />
        <Route path="/exchangeRates" element={<ExchangeRates />} />
      </Routes>
    </div>
  );
}

export default App;
