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
import Products from "./components/products.component"
import ProductDetails from "./components/productdetails.component"
import infoEdit_form from "./components/infoEdit_form.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import User from "./components/userInfo.component";
import { history } from './helpers/history';
import ForgotPass from "./components/forgotpass.component";
import ResetPassword from "./components/resetpassword.component";
import Shops from "./components/shopList.component";
import ShopDetails from "./components/shopdetails.component"


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
        <nav>
          <header class="header">
          <div class="container-fluid">
          <div class="row">
          <div class="col-xl-3 col-lg-2">
            <Link to={"/"}>
              <div class="header__logo">
                <a href="/"><img src="img/logo.png" alt=""></img></a>
              </div>
            </Link>
            </div>
            <div class="col-xl-6 col-lg-7">
            
            <nav class="header__menu">
            <ul>
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  <a>Home</a>
                </Link>
              </li>

              {showManagerBoard && (
                <li className="nav-item">
                  <Link to={"/manager"} className="nav-link">
                    <a>Manager Board</a>
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    <a>Admin Board</a>
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        <a>Register new user</a>
                    </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                  <a>User</a>
                  </Link>
                </li>
              )}


              {currentUser && (
                <li className="nav-item">
                  <Link to={"/products"} className="nav-link">
                  <a>Products</a>
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/shops"} className="nav-link">
                  <a>Shops</a>
                  </Link>
                </li>
              )}
              </ul>
              </nav>
            </div>

            {currentUser ? (
              <div class="col-lg-3">
                <div class="header__right">
                    <div class="header__right__auth">

                      <Link to={"/profile"}>
                        <a>{currentUser.username}'s profile</a>
                      </Link>

                      <a href="/login" onClick={this.logOut}>
                        LogOut
                      </a>
                    </div>
                  </div>
              </div>
            ) : (
              <div class="col-lg-3">
                <div class="header__right">
                  <div class="header__right__auth">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            )}
            </div>
            </div>
            </header>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={User} />
              <Route path="/manager" component={BoardManager} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/forgot-password" component={ForgotPass} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={ProductDetails}/>
              <Route path="/confirm-reset" component={ConfirmReset}/>
              <Route exact path="/user/infoEdit-form" component={infoEdit_form} />
              <Route exact path="/profile/change_password" component={Change_password} />
              <Route exact path="/shops" component={Shops} />
              <Route exact path="/shops/:id" component={ShopDetails}/>

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
