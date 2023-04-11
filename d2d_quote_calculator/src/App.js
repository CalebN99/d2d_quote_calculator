import React, { Component } from 'react';
import './App.css';

import { Provider } from "react-redux";


import Home from "./components/Home";
import Calculator from "./components/Calculator";
import Admin from "./components/Admin";

import store from "./store";

import {Routes, Route } from "react-router-dom";

class App extends Component {


  render() {
    return (
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Calculator />} />
            <Route path="/admin" element={<Admin />} />

          </Routes>
      </Provider>
    )
  }
}

export default App;
