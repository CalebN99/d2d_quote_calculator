import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import low from "../assets/images/low.png";
import medium from "../assets/images/medium.jpg";
import high from "../assets/images/high.webp";
import smartCar from "../assets/images/smartcar.png";
import porsche from "../assets/images/Porsche.png";
import tesla from "../assets/images/tesla.png";
import truck from "../assets/images/truck.png";
import van from "../assets/images/van.png";
import { Link } from "react-router-dom";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paint: "",
      vehicleSize: "",
      question: 1,
      error: "",
    };
  }

  handleRadioButton = (value) => {
    this.setState({
      vehicleSize: value,
    });
  };

  changeQuestion(num) {
    this.setState({ question: this.state.question + num });
  }

  getCarSizeQ() {
    return (
      <div>
        <h1>What's the size of your vehicle?</h1>
        <div className="imageSelection">
          <input
            type="radio"
            name="paint"
            id="smartCar"
            className="input-hidden"
            onChange={() => this.handleRadioButton("smartCar")}
          />
          <label for="smartCar">
            <p className="imageDesc">Smart car</p>
            <img src={smartCar} alt="Low paint defect" className="paintImage" />
          </label>

          <input
            type="radio"
            name="paint"
            id="porsche"
            className="input-hidden"
            onChange={() => this.handleRadioButton("porsche")}
          />
          <label for="porsche">
            <p className="imageDesc">2 Door Porsche</p>
            <img
              src={porsche}
              alt="Medium paint defect"
              className="paintImage"
            />
          </label>

          <input
            type="radio"
            name="paint"
            id="tesla"
            className="input-hidden"
            onChange={() => this.handleRadioButton("tesla")}
          />
          <label for="tesla">
            <p className="imageDesc">Tesla</p>
            <img src={tesla} alt="High paint defect" className="paintImage" />
          </label>

          <input
            type="radio"
            name="paint"
            id="truck"
            className="input-hidden"
            onChange={() => this.handleRadioButton("truck")}
          />
          <label for="truck">
            <p className="imageDesc">4 Door Truck</p>
            <img src={truck} alt="High paint defect" className="paintImage" />
          </label>

          <input
            type="radio"
            name="paint"
            id="van"
            className="input-hidden"
            onChange={() => this.handleRadioButton("passengerVan")}
          />
          <label for="van">
            <p className="imageDesc">Passenger Van</p>
            <img src={van} alt="High paint defect" className="paintImage" />
          </label>
          <div className="divider"></div>
        </div>
      </div>
    );
  }
  getCarPaintQ() {
    return (
      <div>
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
            <img src={low} alt="Low paint defect" className="paintImage" />
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
            <img
              src={medium}
              alt="Medium paint defect"
              className="paintImage"
            />
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
      </div>
    );
  }

  renderSwitch(param) {
    switch (param) {
      case 1:
        return <this.getCarSizeQ />;
      case 2:
        return <this.getCarPaintQ />;
      default:
        return "hello";
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Link to="/">
          <img className="logoImage" src={logo} alt="logo"></img>
        </Link>
   
        {this.renderSwitch(this.state.question)}

        {this.state.question > 1 && (
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={() => {
              this.changeQuestion(-1);
            }}
          >
            Back
          </button>
        )}

        <button
          disabled={this.state.vehicleSize.length === 0}
          type="button"
          className="btn btn-primary mx-auto"
          onClick={() => {
            this.changeQuestion(1);
          }}
        >
          Next
        </button>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
