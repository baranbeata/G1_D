import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect} from "react-router-dom";

class Profile extends Component {

    render() {
        const { user: currentUser, user_info: currentUser_info } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
            <header className="jumbotron">
              <h3>
               Information about: <strong>{currentUser.username}</strong>
              </h3>
            </header>
            <p>
              <strong>Name: {currentUser_info.name} </strong>
            </p>
            <p>
            <strong>Surname: {currentUser_info.surname}</strong>
                </p>
                <p>
                <strong>PESEL: {currentUser_info.pesel}</strong>
               </p>
                <p>
                <strong>Telephone: {currentUser_info.tel}</strong>
                </p>
                <p>
                  <table>
                  <td><Link to={"/profile_form"} className="btn btn-primary"> Edit your infomation</Link> </td>
                   <td> <Link to="/profile/change_password" className="btn btn-primary">Change password</Link> </td>
                    </table>
                </p>
          </div>
        );
      }
    }

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_info } = state.auth;
    return {
        user,
        user_info
    };
}

export default connect(mapStateToProps)(Profile);