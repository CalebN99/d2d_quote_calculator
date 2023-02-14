import React, { Component } from 'react';
import './App.css';

import { Provider } from "react-redux";

import Home from "./components/Home"
import store from "./store";

import {Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Provider>
    )
  }
}

export default App;
