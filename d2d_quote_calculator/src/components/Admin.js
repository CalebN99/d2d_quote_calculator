import React, { Component } from "react";
import "../styles/admin.css";
import { Provider, connect } from "react-redux";
import {
  login,
  getQuotes,
  deleteQuote,
  getProtPricing,
  updateProtPrice,
  getPolishPricing,
  updatePolishPricing
} from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/fontawesome-free-solid";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      wheels: 0,
      paint: 0,
      windshield: 0,
      allWindows: 0,
      trimLights: 0,
      enhancement: 0,
      oneStep: 0,
      twoStep: 0,
      id: ""
    };
  }

  updateProtPrice = () => (event) => {
    let updatedPrice = {
      id: this.props.state.protPricing._id,
      wheels: this.state.wheels,
      paint: this.state.paint,
      windshield: this.state.windshield,
      allWindows: this.state.allWindows,
      trimLights: this.state.trimLights,
    };

    this.props.updateProtPrice(updatedPrice);

    event.preventDefault();
  };

  updatePolishPrice = () => (event) => {
    let updatedPrice = {
      id: this.state.id,
      enhancement: this.state.enhancement,
      oneStep: this.state.oneStep,
      twoStep: this.state.twoStep
    };

    console.log("Attempting Polish update")

    this.props.updatePolishPricing(updatedPrice);
    this.props.getPolishPricing();

    event.preventDefault();
  };

  tabSwitch = (size) => (event) => {
    let pricing = this.props.state.polishPricing.filter(e => e.size === size);
    console.log(pricing[0].enhancement)
    this.setState({enhancement: pricing[0].enhancement});
    this.setState({oneStep: pricing[0].oneStep});
    this.setState({twoStep: pricing[0].twoStep});
    this.setState({id: pricing[0]._id})

  }

  deleteQuote = (id) => (event) => {
    console.log("delete quote: " + id);

    this.props.deleteQuote(id);
    this.props.state.quotes = this.props.state.quotes.filter(
      (e) => e._id !== id
    );
    event.preventDefault();
  };

  handleSubmit = (event) => {
    console.log("Attempting login");
    const account = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(account);
    this.props.getProtPricing();
    this.props.getPolishPricing();
    setTimeout(() => {
      if (this.props.state.loggedIn) {
        this.props.getQuotes();
        console.log("receivedQuotes");
      }
    }, 1500);

    setTimeout(() => {
      console.log("yo");
      console.log(this.props.state.protPricing);
      this.setState({ wheels: this.props.state.protPricing.wheels });
      this.setState({ allWindows: this.props.state.protPricing.allWindows });
      this.setState({ windshield: this.props.state.protPricing.windshield });
      this.setState({ paint: this.props.state.protPricing.paint });
      this.setState({ trimLights: this.props.state.protPricing.trimLights });
    }, 2000);

    // this.setState({wheels: this.props.state.protPrice})

    event.preventDefault();
  };

  autoCapitalize(string) {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
  }

  handleTextChange = () => (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //10
  render() {
    return (
      <Provider className="provider" store={store}>
        <div className="home">
          <div className="homeContainer">
            <Link to="/">
              <img className="logoImage" src={logo} alt="logo"></img>
            </Link>
            {!this.props.state.loggedIn ? (
              <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label for="username">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Enter username"
                      onChange={this.handleTextChange()}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password:</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={this.handleTextChange()}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <Tabs className="tab-container">
                <TabList>
                  <Tab>Quotes</Tab>
                  <Tab onClick={this.tabSwitch("small")}>Small</Tab>
                  <Tab onClick={this.tabSwitch("medium")}>Medium</Tab>
                  <Tab onClick={this.tabSwitch("large")}>Large</Tab>
                  <Tab onClick={this.tabSwitch("xLarge")}>Extra Large</Tab>
                  <Tab>Protection</Tab>
                </TabList>
                

                <TabPanel>
                  <h2>Quotes</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Email List</th>
                        <th scope="col">Car Size</th>
                        <th scope="col">Waterspots</th>
                        <th scope="col">Swirls</th>
                        <th scope="col">Scratches</th>
                        <th scope="col">Protection</th>
                        <th scope="col">Estimate</th>
                      </tr>
                    </thead>

                    {!this.props.state.quotes ? (
                      <div className="tableLoader">
                        <ReactLoading
                          className="load"
                          type={"spin"}
                          color={"blue"}
                        />
                      </div>
                    ) : (
                      <tbody>
                        {this.props.state.quotes.map((quote) => (
                          <tr>
                            <td>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="tableDelete"
                                onClick={this.deleteQuote(quote._id)}
                              />
                            </td>
                            <th scope="row">
                              {quote.dateCreated.substring(0, 10)}
                            </th>
                            <td>{quote.name}</td>
                            <td>{quote.email}</td>
                            <td>
                              {this.autoCapitalize(quote.emailList.toString())}
                            </td>
                            <td>{quote.carSize}</td>
                            <td>
                              {this.autoCapitalize(quote.waterspots.toString())}
                            </td>
                            <td>
                              {this.autoCapitalize(quote.swirls.toString())}
                            </td>
                            <td>
                              {this.autoCapitalize(quote.scratches.toString())}
                            </td>
                            <td>{quote.protection.join(", ")}</td>
                            <td>${quote.priceEstimation}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </TabPanel>
                {this.props.state.polishPricing.map((polish) => (
                  <TabPanel>
                    <h2>{this.autoCapitalize(polish.size)}</h2>
                    <div className="sizePriceForm">
                      <form>
                        <div class="form-group">
                          <label for="enhancement">Enhancement:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="enhancement"
                            id="enhancement"
                            placeholder={polish.enhancement}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div class="form-group">
                          <label for="oneStep">One Step:</label>
                          <input
                            name="oneStep"
                            type="number"
                            className="form-control"
                            id="oneStep"
                            placeholder={polish.oneStep}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div className="form-group">
                          <label for="twoStep">Two Step:</label>
                          <input
                            name="twoStep"
                            type="number"
                            className="form-control"
                            id="twoStep"
                            placeholder={polish.twoStep}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <button onClick={this.updatePolishPrice()} class="btn btn-primary">
                          Update
                        </button>
                      </form>
                    </div>
                  </TabPanel>
                ))}
                <TabPanel>
                  <h2>Protection</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div className="row">
                        <div className="col">
                          <label for="wheels">Wheels:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="wheels"
                            id="wheels"
                            placeholder={this.state.wheels}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div className="col">
                          <label for="windshield">Windshield:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="windshield"
                            id="windshield"
                            placeholder={this.state.windshield}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <label for="allWindows">All Windows:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="allWindows"
                            id="allWindows"
                            placeholder={this.state.allWindows}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div className="col">
                          <label for="paint">Paint:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="paint"
                            id="paint"
                            placeholder={this.state.paint}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label for="trimLights">Trim & Lights:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="trimLights"
                            id="trimLights"
                            placeholder={this.state.trimLights}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>

                      <button
                        onClick={this.updateProtPrice()}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </TabPanel>
              </Tabs>
            )}
          </div>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, {
  login,
  getQuotes,
  deleteQuote,
  getProtPricing,
  updateProtPrice,
  getPolishPricing,
  updatePolishPricing
})(Admin);
