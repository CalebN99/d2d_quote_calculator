import React, { Component } from "react";
import "../styles/home.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider className="provider" store={store}>
        <div className="home">
          <div className="homeContainer">
            <Link to="/">
              <img className="logoImage" src={logo} alt="logo"></img>
            </Link>
            <div className="banner">
              <h1>Start your quote today!</h1>
              <p>
                Using our quote calculator you can have an interactive
                experience to get a base quote right away!
              </p>
            </div>

            <button type="button" className="btn btn-primary mx-auto">
              {" "}
              <Link to="/quote">Start Quote</Link>
            </button>

            <button type="button" className="btn btn-success mx-auto">
              <a
                href="https://thedreamyway.com/"
                target="_blank"
                rel="noreferrer"
              >
                Main Website
              </a>
            </button>
          </div>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, { getQuotes })(Home);
