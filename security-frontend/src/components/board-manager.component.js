import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ProductService from "../services/product.service";
import axios from "axios"


import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';


import AuthService from "../services/auth.service";

export default class BoardManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
        };
    }

  componentDidMount() {
    AuthService.getManagerBoard(localStorage.getItem("username")).then(
      response => {
        this.setState({
          employees: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { user: currentUser,  products } = this.props;

    /*if (!currentUser) {
        return <Redirect to="/login" />;
    }*/

    return (
        <div className="container">
            <header style={{ paddingTop: "50px"}}>
                <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                    EMPLOYEES
                </h2>
            </header>

            <img src="/img/search.png"></img>
            <Input disableUnderline="true" placeholder="Search" inputProps={{ 'aria-label': 'description' }} style={{ marginBottom: "20px", underlineColor: "black"}} />

            <table className="table">
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>Surname:</td>
                    <td>Details:</td>
                </tr>

                {this.state. employees &&
                this.state. employees.map(( employee, index) =>
                        <tr>
                            <td>{ employee.name}</td>
                            <td>{ employee.surname}</td>
                            <td>
                            <Link
                                to={{
                                    pathname: `/user/${employee.id}`,
                                    state: {  employees:  employee }
                                }}
                            >
                            <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Details</button>
                            </Link>
                            </td>

                        </tr>
                )}

                </tbody>
            </table>
        </div>

    );
  }
}
