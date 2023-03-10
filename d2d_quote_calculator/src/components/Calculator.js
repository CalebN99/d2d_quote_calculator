import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import CarSizeQ from "./questions/CarSizeQ";
import CarPaintQ from "./questions/CarPaintQ";
import CarProtectionQ from "./questions/CarProtectionQ";
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleSize: "",
      question: 1,
      error: "",
      waterSpots: false,
      swirls: false,
      scratches: false,
      perfPaint: false,
      wheels: false,
      windshield: false,
      allWindows: false,
      paint: false,
      trimLights: false,
    };
  }

  handleRadioButton = (value) => {
    this.setState({
      vehicleSize: value,
    });
  };

  handleChange = () => (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  changeQuestion = (num, curQuestion) => {
    this.setState({ question: curQuestion + num });
  };

  renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <CarSizeQ
            vehicleSize={this.state.vehicleSize}
            handleRadioButton={this.handleRadioButton}
            changeQuestion={this.changeQuestion}
            question={this.state.question}
          />
        );
      case 2:
        return (
          <CarPaintQ
            vehicleSize={this.state.vehicleSize}
            changeQuestion={this.changeQuestion}
            handleChange={this.handleChange}
            question={this.state.question}
            state={this.state}
          />
        );
      case 3:
        return (
          <CarProtectionQ
            changeQuestion={this.changeQuestion}
            handleChange={this.handleChange}
            question={this.state.question}
            state={this.state}
          />
        );
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
        {this.state.vehicleSize}
        {this.state.waterSpots + ""}
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
