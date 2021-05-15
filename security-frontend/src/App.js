import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardEmployee from "./components/board-employee.component";
import BoardManager from "./components/board-manager.component";
import BoardAdmin from "./components/board-admin.component";
import Footer from './footer'
import Change_password from "./components/change_password.component"
import ConfirmReset from "./components/confirmreset.component"
import Profile_form from "./components/profile_form.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import ForgotPass from "./components/forgotpass.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showManagerBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              BaBa Company
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showManagerBoard && (
                <li className="nav-item">
                  <Link to={"/manager"} className="nav-link">
                    Manager Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Register new user
                    </Link>
                </li>
                </div>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>


              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardEmployee} />
              <Route path="/manager" component={BoardManager} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/forgot-password" component={ForgotPass} />
              <Route exact path="/confirm-reset?confirmationToken=:confirmationToken" component={ConfirmReset}/>
              <Route path="/profile_form" component={Profile_form} />
              <Route exact path="/profile/change_password" component={Change_password} />
            </Switch>
          </div>
        </div>
        <Footer/>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
