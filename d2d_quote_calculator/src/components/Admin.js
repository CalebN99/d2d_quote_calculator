import React, { Component } from "react";
import "../styles/admin.css";
import { Provider, connect } from "react-redux";
import { login } from "../actions/itemAction";
import store from "../store";
import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    console.log("Attempting login");
    const account = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(account);
    event.preventDefault();

    console.log("prop: ", this.props.state.account);
  };

  handleTextChange = () => (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Provider className="provider" store={store}>
        <div className="home">
          <div className="homeContainer">
            <Link to="/">
              <img className="logoImage" src={logo} alt="logo"></img>
            </Link>

            {this.props.state.loggedIn ? (
              <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      type="text"
                      class="form-control"
                      name="username"
                      id="username"
                      placeholder="Enter username"
                      onChange={this.handleTextChange()}
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      name="password"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={this.handleTextChange()}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <Tabs className="tab-container">
                <TabList>
                  <Tab>Quotes</Tab>
                  <Tab>Small</Tab>
                  <Tab>Medium</Tab>
                  <Tab>Large</Tab>
                  <Tab>Extra Large</Tab>
                  <Tab>Protection</Tab>
                </TabList>


                <TabPanel>
                  <h2>Quotes</h2>
                  <table class="table">
  <thead>
    <tr>
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
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Caleb Norris</td>
      <td>caleb@gmail.com</td>
      <td>True</td>
      <td>Tesla</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>Wheels, Paint, All Windows</td>
      <td>$1250</td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Caleb Norris</td>
      <td>caleb@gmail.com</td>
      <td>True</td>
      <td>Tesla</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>Wheels, Paint, All Windows</td>
      <td>$1250</td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Caleb Norris</td>
      <td>caleb@gmail.com</td>
      <td>True</td>
      <td>Tesla</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>Wheels, Paint, All Windows</td>
      <td>$1250</td>
    </tr>
  </tbody>
</table>
                </TabPanel>
                <TabPanel>
                  <h2>Small</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div class="form-group">
                        <label for="enhancement">Enhancement:</label>
                        <input
                          type="number"
                          class="form-control"
                          name="enhancement"
                          id="enhancement"
                          value={280}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="oneStep">One Step:</label>
                        <input
                          name="oneStep"
                          type="number"
                          class="form-control"
                          id="oneStep"
                          value={430}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="twoStep">Two Step:</label>
                        <input
                          name="twoStep"
                          type="number"
                          class="form-control"
                          id="twoStep"
                          value={650}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Medium</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div class="form-group">
                        <label for="enhancement">Enhancement:</label>
                        <input
                          type="number"
                          class="form-control"
                          name="enhancement"
                          id="enhancement"
                          value={280}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="oneStep">One Step:</label>
                        <input
                          name="oneStep"
                          type="number"
                          class="form-control"
                          id="oneStep"
                          value={430}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="twoStep">Two Step:</label>
                        <input
                          name="twoStep"
                          type="number"
                          class="form-control"
                          id="twoStep"
                          value={650}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Large</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div class="form-group">
                        <label for="enhancement">Enhancement:</label>
                        <input
                          type="number"
                          class="form-control"
                          name="enhancement"
                          id="enhancement"
                          value={280}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="oneStep">One Step:</label>
                        <input
                          name="oneStep"
                          type="number"
                          class="form-control"
                          id="oneStep"
                          value={430}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="twoStep">Two Step:</label>
                        <input
                          name="twoStep"
                          type="number"
                          class="form-control"
                          id="twoStep"
                          value={650}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Extra Large</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div class="form-group">
                        <label for="enhancement">Enhancement:</label>
                        <input
                          type="number"
                          class="form-control"
                          name="enhancement"
                          id="enhancement"
                          value={280}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="oneStep">One Step:</label>
                        <input
                          name="oneStep"
                          type="number"
                          class="form-control"
                          id="oneStep"
                          value={430}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <div class="form-group">
                        <label for="twoStep">Two Step:</label>
                        <input
                          name="twoStep"
                          type="number"
                          class="form-control"
                          id="twoStep"
                          value={650}
                          onChange={this.handleTextChange()}
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Protection</h2>
                  <div className="sizePriceForm">
                    <form>
                      <div class="row">
                        <div class="col">
                          <label for="wheels">Wheels:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="wheels"
                            id="wheels"
                            value={120}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div class="col">
                          <label for="windshield">Windshield:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="windshield"
                            id="windshield"
                            value={280}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <label for="allWindows">All Windows:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="allWindows"
                            id="allWindows"
                            value={120}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                        <div class="col">
                          <label for="paint">Paint:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="paint"
                            id="paint"
                            value={280}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label for="trimLights">Trim & Lights:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="trimLights"
                            id="trimLights"
                            value={120}
                            onChange={this.handleTextChange()}
                          />
                        </div>
                      </div>

                      <button type="submit" class="btn btn-primary">
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

export default connect(mapStateToProps, { login })(Admin);
