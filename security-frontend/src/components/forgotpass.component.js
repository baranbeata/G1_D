import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { forgotpass } from "../actions/auth";
import axios from "axios";

class ForgotPass extends Component {
    
    constructor(props) {
        super(props);
        this.handleForgotPass = this.handleForgotPass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    
        this.state = {
          email: "",
          loading: false,
        };
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value,
        });
      }
    handleForgotPass(e) {
        e.preventDefault();
    
        this.setState({
          loading: true,
        });
    
        this.form.validateAll();
    
        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            axios({
                url: 'http://localhost:8080/forgot-password', 
                method: 'post',
                headers: {'Content-Type':'application/json'},
                data: ({
                 email: this.state.email
                })
               })
               .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
              })
              .catch(() => {
                this.setState({
                  loading: false
                });
              });
          } else {
            this.setState({
              loading: false,
            });
          }

      }
    render() {
        return (
            
            <div>
            <title>Forgot Password</title>  
            <center>
            <Form
            onSubmit={this.handleForgotPass}
            ref={(c) => {
              this.form = c;
            }}
          >
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                   // validations={[required, email]}
                  />
                </div> 
                <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Send token</span>
              </button>
            </div>
              <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
              </Form>
            </center>
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
      message,
    };
  }
  
  export default connect(mapStateToProps)(ForgotPass);
