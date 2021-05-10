import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';

import { Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home.component";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { forgotpass } from "../actions/auth";
import axios from "axios";

class ConfirmReset extends Component {


    checkEmailValid = () => {
        axios.get('/confirm-reset-page', {params: { confirmationToken: this.confirmationToken}})
        .then(msg => {
            this.setState({
                message: msg
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    constructor(props) {
        super(props);
        this.confirmationToken = this.props.match.params.token;
        this.message = "";
        this.checkEmailValid();
    }

    

    componentDidMount() {
    }

    render() {
        return (
            <div>

                <Router>
                    <Switch>
                        <Route path='' render={() => {
                            return this.state.message === "Valid link." ? <Redirect to={'/reset-password'}/> : <Home/>
                        }} />
                    </Switch>
                </Router>
            </div>


       
    );
    }
};

export default ConfirmReset;