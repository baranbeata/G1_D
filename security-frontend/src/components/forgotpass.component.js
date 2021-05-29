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
   async handleForgotPass(e) {
        e.preventDefault();
    
        this.setState({
          loading: true,
        });
    
        this.form.validateAll();
    
        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
          const mail = {email: this.state.email};
          try {
            await axios.post('http://localhost:8080/forgot-password/', JSON.stringify(mail) ,{headers: {
              // Accept: 'application/json',
               'Content-Type': 'application/json;charset=utf-8',
            //   'Access-Control-Allow-Origin': '*'
               }
             })
            .then(response => response.json())
            .then(message => this.setState({message}));
      
          }
          catch(err) {
            if(err.response && err.response.data) {
            console.log(err.response.data.message);
            }
          }
          this.setState({
            loading: false,
            email:""
          });
               
          } else {
            this.setState({
              loading: false,
              email:""
            });
          }

      }
    render() {
      const { message } = this.props;
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
              <div className="form-group" style={{width: "300px", marginTop: "100px"}}>
                  <label htmlFor="email" >Enter your email address</label>
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
                className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}
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
            {message && (
              <div className="form-group">
                <div className="alert alert-successful" role="alert">
                  {message}
                </div>
              </div>
            )}
              </Form>
            </center>
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
      message
    };
  }
  
  export default connect(mapStateToProps)(ForgotPass);
