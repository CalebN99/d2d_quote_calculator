import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import CarSizeQ from "./questions/CarSizeQ";
import CarPaintQ from "./questions/CarPaintQ";
import $ from "jquery";
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paint: "",
      vehicleSize: "",
      question: 1,
      error: "",
      waterSpots: "",

    };
  }

  componentDidMount() {
    console.log("mounted")
    $(".image-checkbox").each(function () {
      if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
        $(this).addClass('image-checkbox-checked');
      }
      else {
        $(this).removeClass('image-checkbox-checked');
      }
    });
    
    // sync the state to the input
    $(".image-checkbox").on("click", function (e) {
      $(this).toggleClass('image-checkbox-checked');
      var $checkbox = $(this).find('input[type="checkbox"]');
      $checkbox.prop("checked",!$checkbox.prop("checked"))
    
      e.preventDefault();
    });
  }

  handleRadioButton = (value) => {
    this.setState({
      vehicleSize: value,
    });
  };

  handle

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
      // return <this.getCarSizeQ />;
      case 2:
        return (
          <CarPaintQ
            vehicleSize={this.state.vehicleSize}
            handleRadioButton={this.handleRadioButton}
            changeQuestion={this.changeQuestion}
            question={this.state.question}
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
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
