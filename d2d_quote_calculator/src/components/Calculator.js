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
      number: 0,
      emailList: false,
      contactMe: false,
    };
  }

  handleSubmit = (event) => {
    console.log("Attempting create quote");
    const quote = {
      name: this.state.name,
      email: this.state.email,
      number: this.state.number,
      carSize: this.state.vehicleSize,
      waterSpots: this.state.waterSpots,
      swirls: this.state.swirls,
      scratches: this.state.scratches,
      protection: this.state.protection,
      emailList: this.state.emailList,
      contactMe: this.state.contactMe,
      referer: document.referrer,
      notes: ""
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
      if (value === "allWindows")  {
        console.log("allWindows");
        let newProt = this.state.protection.filter(item => item !== "windshield");
        this.setState({protection: newProt.concat([value])})
        return;
      } else if (value === "windshield") {
        let newProt = this.state.protection.filter(item => item !== "allWindows");
        this.setState({protection: newProt.concat([value])});
        return;
      }
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
    if (event.target.name === "perfPaint") {
      console.log("perfPaint")
      this.setState({
        swirls: false,
        scratches: false,
        waterSpots: false,
        perfPaint: true
      });
      return;
    } else if (event.target.name === "swirls" || event.target.name === "scratches" || event.target.name === "waterSpots") {
      this.setState({perfPaint: false, [event.target.name]: event.target.checked})
    }

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
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    required
                    onChange={this.handleTextChange()}
                  />
                </div>

                <div className="form-group">
                  <label for="number">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="number"
                    id="number"
                    placeholder="555-555-5555"
                    required
                    onChange={this.handleTextChange()}
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="contactMe"
                      name="contactMe"
                      onChange={this.handleChange()}
                    />
                    <label class="form-check-label" for="contactMe">
                      Would you like to be contacted to discuss lesser options and/or what's included in this quote?
                    </label>
                  </div>
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
                <button type="submit" className="btn btn-primary">
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
