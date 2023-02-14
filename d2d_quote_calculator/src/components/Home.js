import React, { Component } from 'react';

import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <div className="home">
            <h1>Home</h1>
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = state => ({
    quotes: state.quotes
  });
  
  export default connect(mapStateToProps, { getQuotes })(Home);
  