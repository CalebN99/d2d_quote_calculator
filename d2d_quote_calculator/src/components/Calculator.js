import React, { Component } from "react";
import "../styles/calculator.css";
import { Provider, connect } from "react-redux";
import { getQuotes, createQuote } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import CarSizeQ from "./questions/CarSizeQ";
import CarPaintQ from "./questions/CarPaintQ";
import CarProtectionQ from "./questions/CarProtectionQ";
import Modal from "react-bootstrap/Modal";
import ReactLoading from "react-loading";
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
      modal: false,
      loadQuote: false,
      quote: false,
      protection: [],
      name: "",
      email: "",
      emailList: false,
    };
  }


  handleSubmit = (event) => {
    console.log("Attempting create quote");
    const quote = {
      name: this.state.name,
      email: this.state.email,
      carSize: this.state.vehicleSize,
      waterSpots: this.state.waterSpots,
      swirls: this.state.swirls,
      scratches: this.state.scratches,
      protection: this.state.protection,
      emailList: this.state.emailList,
    };

    this.props.createQuote(quote);
    this.loadQuote();
    event.preventDefault();
  };

  handleRadioButton = (value) => {
    this.setState({
      vehicleSize: value,
    });
  };

  loadQuote = () => {
    this.setState({ loadQuote: true });

    setTimeout(() => {
      this.setState({ loadQuote: false });
      this.setState({ quote: 1650 });
    }, 1300);
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  updateProtList = (value) => (event) => {
    if (event.target.checked) {
      this.setState({ protection: this.state.protection.concat([value]) });
    } else {
      this.setState({
        protection: this.state.protection.filter(function (val) {
          return val !== value;
        }),
      });
    }
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = () => (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleTextChange = () => (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changeQuestion = (num, curQuestion) => {
    this.setState({ question: curQuestion + num });
  };


  /**
   * Returns a specific question component based 
   * on the question number in the state
   */
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
            updateProtList={this.updateProtList}
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
        <Modal
          show={this.state.modal}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit to get your quote now!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <fieldset disabled={this.state.quote}>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    onChange={this.handleTextChange()}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="jonathan@dirty2dreamy.com..."
                    required
                    onChange={this.handleTextChange()}
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="emailList"
                      onChange={this.handleChange()}
                    />
                    <label class="form-check-label" for="gridCheck">
                      Would you like to signup for our emailing list?
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Get Quote
                </button>
              </fieldset>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="footer">
              {this.state.loadQuote ? (
                <ReactLoading className="load" type={"spin"} color={"blue"} />
              ) : (
                " "
              )}
              {this.state.quote ? (
                <div>
                  <h3>
                    <span>Estimate: </span>
                    {"$" + this.props.quotes.quote.priceEstimation}
                  </h3>

                  <button type="button" class="btn btn-primary mx-auto">
                    <a
                      href="https://www.facebook.com/Dirty2Dreamy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact Us! - Facebook
                    </a>
                  </button>
                </div>
              ) : (
                " "
              )}
            </div>
          </Modal.Footer>
        </Modal>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  quotes: state.state,
});

export default connect(mapStateToProps, { getQuotes, createQuote })(Calculator);
