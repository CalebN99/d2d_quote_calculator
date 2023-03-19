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
import Modal from "react-bootstrap/Modal";
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
      modal: false,
    };
  }

  handleRadioButton = (value) => {
    this.setState({
      vehicleSize: value,
    });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
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
            state={this.state}
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
            openModal={this.openModal}
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
        {this.state.scratches + " "}

        <Modal
          show={this.state.modal}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Submit to get your quote now!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="jonathan@dirty2dreamy.com..."
                  required
                />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Would you like to signup for our emailing list?
                  </label>
                </div>
              </div>
              <button class="btn btn-primary">
                Get Quote
              </button>
            </form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Submit
            </Button>
          </Modal.Footer> */}
        </Modal>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.quotes,
});

export default connect(mapStateToProps, { getQuotes })(Calculator);
