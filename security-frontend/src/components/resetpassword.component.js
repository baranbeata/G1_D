import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';

import { Router, Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./home.component";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { forgotpass } from "../actions/auth";
import axios from "axios";


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state.confirmationToken);
        this.confirmationToken = this.props.location.state.confirmationToken;
        this.handleChangedPassword=this.handleChangedPassword.bind(this);
        this.handleNewPassword=this.handleNewPassword.bind(this);
        this.handleNewPasswordRepeated=this.handleNewPasswordRepeated.bind(this);
        this.state = {
            newpassword:'',
            new_password_repeated:'',
            errors: '',
            info: '',
            loading: false,
            currentUser: undefined,
            successful: false,
            items: [],
            errorMessage: '',
            responseMessage: ''
        };
    }

    handleNewPassword(e) {
        this.setState({newpassword: e.target.value});
    }

    handleNewPasswordRepeated(e) {
        this.setState({new_password_repeated: e.target.value});
    }



    handleChangedPassword(e) {

        e.preventDefault();
        let errors = '';

        this.setState({
            loading: true,
        });

        this.setState({
            successful: false,
        });


        this.form.validateAll();
        this.setState({info:''});
        if (this.state.new_password_repeated !== this.state.newpassword) {
            errors += 'Fields "New password" and "Repeat new password" must be equal';
            this.setState({info:"Passwords don't match"});
        }
        else if ( this.state.newpassword.length===0 || this.state.new_password_repeated.length===0)
            errors += 'fields must be filled';

        if (errors.length > 0) {
            return;
        }

     //   alert(`after incrementing, counts value is ${localStorage.getItem("username")}.`);
        if (errors.length === 0 ) {
            axios.post("http://localhost:8080/reset-password", JSON.stringify({password: this.state.newpassword, confirmationToken: this.confirmationToken}), {headers: {
                // Accept: 'application/json',
                 'Content-Type': 'application/json;charset=utf-8',
              //   'Access-Control-Allow-Origin': '*'
                 }
               })
                .then(response => {
                    this.setState({
                        successful: true,
                        responseMessage: response.data.message,
                        newpassword: '',
                        new_password_repeated: '',
                    });
                })
                .catch(response => {
                    this.setState({
                        successful: false,
                        responseMessage: response.data.message
                    });
                });

        }
        else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">

                    <Form
                        onSubmit={this.handleChangedPassword}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="newpassword">New password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="newpassword"
                                value={this.state.newpassword}
                                onChange={this.handleNewPassword}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_repeat">Repeat new password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="new_password_repeated"
                                onChange={this.handleNewPasswordRepeated}
                                value={this.state.new_password_repeated}
                            />
                        </div>

                        <div className="form-group">
                            <button>
                                Change
                            </button>
                        </div>

                        {this.state.responseMessage && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {this.state.responseMessage}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />



                    </Form>
                </div>
            </div>


       
    );
    }
};


export default ResetPassword;
