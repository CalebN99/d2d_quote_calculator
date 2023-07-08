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
  updatePolishPricing,
  createAccount,
  updateNoteQuote
} from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/fontawesome-free-solid";
import Modal from "react-bootstrap/Modal";
import { CSVLink } from "react-csv";
import toast, { Toaster } from "react-hot-toast";

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
      id: "",
      modal: false,
      noteModal: false,
      idDelete: "",
      csv: "",
      reload: 1,
      noteName: "",
      notes: "",
      noteID: "",
    };
  }

  openModal = (id) => (event) => {
    this.setState({ modal: true });
    this.setState({ idDelete: id });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openNoteModal = (name, notes, id) => (event) => {
    this.setState({ noteModal: true });
    this.setState({ noteName: name });
    this.setState({ notes: notes });
    this.setState({ noteID: id});



  };

  closeNoteModal= () => {
    this.setState({ noteModal: false });
  };

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
    this.props.getProtPricing();
    toast.success("Updated Protection Pricing");

    this.setState({reload: Math.random()})
    event.preventDefault();
  };

  createNewAccount = () => (event) => {
    let newAccount = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.createAccount(newAccount);
    toast.success("Created new account: " + this.state.username);
    event.preventDefault();
  }

  updatePolishPrice = () => (event) => {
    let updatedPrice = {
      id: this.state.id,
      enhancement: this.state.enhancement,
      oneStep: this.state.oneStep,
      twoStep: this.state.twoStep,
    };

    this.props.updatePolishPricing(updatedPrice);
    this.props.getPolishPricing();
    toast.success("Updated Polish Pricing");

    
    this.setState({reload: Math.random()})
    event.preventDefault();
  };

  tabSwitch = (size) => (event) => {
    let pricing = this.props.state.polishPricing.filter((e) => e.size === size);
    this.setState({ enhancement: pricing[0].enhancement });
    this.setState({ oneStep: pricing[0].oneStep });
    this.setState({ twoStep: pricing[0].twoStep });
    this.setState({ id: pricing[0]._id });
  };

  deleteQuote = (id) => (event) => {
    this.props.deleteQuote(id);
    this.props.state.quotes = this.props.state.quotes.filter(
      (e) => e._id !== id
    );

 
    event.preventDefault();
    this.closeModal();
  };

  quoteNotesUpdate = (event) => {
    let patch = {
      id: this.state.noteID,
      notes: this.state.notes
    };

    this.props.updateNoteQuote(patch)
    this.props.state.quotes = this.props.state.quotes.map((quote) => {
      if (quote._id === this.state.noteID) {
        quote.notes = this.state.notes;
      }
      return quote
    })
    toast.success("Update client notes");
  }

  handleSubmit = (event) => {
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
      }
    }, 2500);

    setTimeout(() => {
      this.setState({ wheels: this.props.state.protPricing.wheels });
      this.setState({ allWindows: this.props.state.protPricing.allWindows });
      this.setState({ windshield: this.props.state.protPricing.windshield });
      this.setState({ paint: this.props.state.protPricing.paint });
      this.setState({ trimLights: this.props.state.protPricing.trimLights });

      this.csvCreate();
    }, 3000);

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

  csvCreate = (event) => {
    const csvString = [
      [
        "date",
        "name",
        "carSize",
        "email",
        "number",
        "emailList",
        "protection",
        "scratches",
        "swirls",
        "waterspots",
        "priceEstimation",
        "referer"
      ],
      ...this.props.state.quotes.map((item) => [
        item.dateCreated.substring(0, 10),
        item.name,
        item.carSize,
        item.email,
        item.number,
        item.emailList,
        item.protection.join(", "),
        item.scratches,
        item.swirls,
        item.waterspots,
        item.priceEstimation,
        item.referer
      ]),
    ];

    this.setState({ csv: csvString });
  };

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
              <div>
                <Tabs className="tab-container">
                  <TabList>
                    <Tab>Quotes</Tab>
                    <Tab onClick={this.tabSwitch("small")}>Small</Tab>
                    <Tab onClick={this.tabSwitch("medium")}>Medium</Tab>
                    <Tab onClick={this.tabSwitch("large")}>Large</Tab>
                    <Tab onClick={this.tabSwitch("xLarge")}>Extra Large</Tab>
                    <Tab>Protection</Tab>
                    <Tab>Settings</Tab>

                  </TabList>

                  <TabPanel>
                    <div className="quote_header">
                      <h2>Quotes</h2>

                      <CSVLink className="csv_link" data={this.state.csv} onClick={() => console.log(this.state.csv)}>
                        {" "}
                        <button className="btn btn-primary" onClick={() => console.log(this.state.csv)}>
                          Generate CSV
                        </button>
                      </CSVLink>
                    </div>
                    <hr/>

                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Date</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Number</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Email List</th>
                          <th scope="col">Car Size</th>
                          <th scope="col">Waterspots</th>
                          <th scope="col">Swirls</th>
                          <th scope="col">Scratches</th>
                          <th scope="col">Protection</th>
                          <th scope="col">Estimate</th>
                          <th scope="col">Referer</th>

                          <th scope="col"></th>

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
                        <tbody className="table_body">
                          {this.props.state.quotes.map((quote) => (
                            <tr>
                              <td>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="tableDelete"
                                  onClick={this.openModal(quote._id)}
                                />
                              </td>
                              <th scope="row">
                                {quote.dateCreated.substring(0, 10)}
                              </th>
                              <td>{quote.name}</td>
                              <td>{quote.email}</td>
                              <td>{quote.number}</td>
                              <td> {this.autoCapitalize(
                                  quote.contactMe.toString()
                                )}</td>
                              <td className = "eListTD">
                                {this.autoCapitalize(
                                  quote.emailList.toString()
                                )}
                              </td>

                              <td>{quote.carSize}</td>
                              <td>
                                {this.autoCapitalize(
                                  quote.waterspots.toString()
                                )}
                              </td>
                              <td>
                                {this.autoCapitalize(quote.swirls.toString())}
                              </td>
                              <td>
                                {this.autoCapitalize(
                                  quote.scratches.toString()
                                )}
                              </td>
                              <td>{quote.protection.join(", ")}</td>
                              <td>${quote.priceEstimation}</td>
                              <td>{quote.referer}</td>
                              <td>
                               <button class="btn btn-primary" onClick={this.openNoteModal(quote.name, quote.notes, quote._id)}>
                                  Notes
                               </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                    <Toaster />
                  </TabPanel>
                  {this.props.state.polishPricing.map((polish) =>  
                  
                  { 

                    let tabTitle = polish.size;
                    if (tabTitle === "xLarge") {
                      tabTitle = "Extra Large";
                    }
                    
                    return (
                    <TabPanel>
                      <h2>{this.autoCapitalize(tabTitle)}</h2>
                      <hr/>
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
                          <button
                            onClick={this.updatePolishPrice()}
                            class="btn btn-primary"
                          >
                            Update
                          </button>
                        </form>
                        <Toaster />
                      </div>
                    </TabPanel>
                  )})}
                  <TabPanel>
                    <h2>Protection</h2>
                    <hr/>
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
                      <Toaster />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <h2>Settings</h2>
                   <hr/>
                    <div className="sizePriceForm">
                      <h5>Create Account</h5>
                      <form>
                        <div className="row">
                          <div className="col">
                            <label for="wheels">Username:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              id="username"
                              placeholder="Username..."
                              onChange={this.handleTextChange()}
                            />
                          </div>
                          <div className="col">
                            <label for="windshield">Password:</label>
                            <input
                              type="text"
                              class="form-control"
                              name="password"
                              id="password"
                              placeholder="Password..."
                              onChange={this.handleTextChange()}
                            />
                          </div>
                        </div>

                        <button
                          onClick={this.createNewAccount()}
                          className="btn btn-primary"
                        >
                          Create
                        </button>
                      </form>
                      <Toaster />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            )}
          </div>
          <Modal
            show={this.state.noteModal}
            onHide={this.closeNoteModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <div className="modal_notes">
                <h1>Notes: {this.state.noteName}</h1>
                <textarea id="notes" name="notes" className="notes" placeholder="Store client/lead notes here..." 
                  value={this.state.notes} onChange={this.handleTextChange()}>
                </textarea>
                <div className="button_container">
                  <button
                    className="btn btn-success"
                    onClick={this.quoteNotesUpdate}
                  >
                    Save
                  </button>
                  <button onClick={this.closeNoteModal} className="btn btn-primary">
                    Close
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={this.state.modal}
            onHide={this.closeModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <div className="modal_deletion">
                <h1>Confirm Deletion?</h1>
                <div className="button_container">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteQuote(this.state.idDelete)}
                  >
                    Confirm
                  </button>
                  <button onClick={this.closeModal} className="btn btn-primary">
                    Keep
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
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
  updatePolishPricing,
  createAccount,
  updateNoteQuote
})(Admin);
