import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import CarSizeQ from "./questions/CarSizeQ";
import CarPaintQ from "./questions/CarPaintQ";

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

  changeQuestion = (num, curQuestion) => {
    this.setState({ question: curQuestion + num });
  }



  renderSwitch(param) {
    switch (param) {
      case 1:
        return <CarSizeQ vehicleSize={this.state.vehicleSize} handleRadioButton={this.handleRadioButton} changeQuestion={this.changeQuestion} question={this.state.question}/>;
        // return <this.getCarSizeQ />;
      case 2:
        return <CarPaintQ vehicleSize={this.state.vehicleSize} handleRadioButton={this.handleRadioButton} changeQuestion={this.changeQuestion} question={this.state.question}/>;
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
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
