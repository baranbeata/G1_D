import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect} from "react-router-dom";

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;

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
              <strong>Name:</strong>
            </p>
            <p>
            <strong>Surname:</strong>
            {/* <p>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </p> */}
                </p>
                <p>
                <strong>PESEL: </strong>
               </p>
                <p>
                <strong>Telephone: </strong>
                </p>
                <p>
                      <Link to={"/profile_form"} className="btn btn-primary">
                        Edit your infomation
                      </Link>
                      </p>
                      <p>
                    <Link to="/profile/change_password" className="btn btn-primary">Change password</Link>
                </p>
          </div>
        );
      }
    }

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);