import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import low from "../assets/images/low.png";
import medium from "../assets/images/medium.jpg";
import high from "../assets/images/high.webp";
import { Link } from "react-router-dom";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paint: "",
    };
  }

  handleRadioButton(value) {
    this.setState({
      paint: value,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Link to="/"> <img className="logoImage" src={logo} alt="logo"></img></Link>
       

        <h1>What does your car paint look like?</h1>
        <div className="imageSelection">
          <input
            type="radio"
            name="paint"
            id="low"
            className="input-hidden"
            onChange={() => this.handleRadioButton("low")}
          />
          <label for="low">
            <p className="imageDesc">Low paint defects</p>
            <img src={low} alt="Low paint defect" className="paintImage"/>
          </label>

          <input
            type="radio"
            name="paint"
            id="medium"
            className="input-hidden"
            onChange={() => this.handleRadioButton("medium")}
          />
          <label for="medium">
          <p className="imageDesc">Medium paint defects</p>
            <img src={medium} alt="Medium paint defect" className="paintImage"/>
          </label>
        
          <input
            type="radio"
            name="paint"
            id="high"
            className="input-hidden"
            onChange={() => this.handleRadioButton("high")}
          />
          <label for="high">
          <p className="imageDesc">High paint defects</p>
            <img src={high} alt="High paint defect" className="paintImage" />
          </label>
          <div className="divider"></div>
        </div>
        
       <button type="button" class="btn btn-primary mx-auto">Next</button>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
