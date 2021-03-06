import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header style={{ paddingTop: "50px", marginBottom: "20px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        <strong>{localStorage.getItem("username")}</strong>'s PROFILE
                    </h2>
                </header>




                <Link to="/profile/change_password" style={{textDecoration: 'none'}}><button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Change password</button></Link>
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

