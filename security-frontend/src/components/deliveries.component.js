import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import DeliveryService from "../services/delivery.service";
import axios from "axios"


import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

class Deliveries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveries: []
        };
    }

    handleDeliveryDelete = id => {
        console.log(id);
      const url = `http://localhost:8080/deliveries/${id}`;
      axios.delete(url)
      .then(response => {
        this.setState(previousState => {
              return {
                  deliveries: previousState.deliveries.filter(d => d.id !== id)
              };
          });
    })
    .catch(response => {
        console.log(response);
    });
    }

    componentDidMount() {
        DeliveryService.getDeliveries().then(
            response => {
                this.setState({
                    deliveries: response.data
                });
            },
            /* error => {
                 this.setState({
                     shops:
                         (error.response &&
                             error.response.data &&
                             error.response.data.message) ||
                         error.message ||
                         error.toString()
                 });
             }*/
        );
    }

    render() {
        const { user: currentUser,  deliveries } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light, Courier New, sans-serif", color: 'rgb(207,16,26)'}}>
                        DELIVERIES
                    </h2>
                </header>
                <Link
                    to={{
                        pathname: `/add-delivery`,
                        //state: {  products:  product }
                    }}
                >
                <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Add delivery</button>
                </Link>

                <img src="/img/search.png"></img>
                <Input disableUnderline="true" placeholder="Search" inputProps={{ 'aria-label': 'description' }} style={{ marginBottom: "20px", underlineColor: "black"}} />

                <table className="table">
                    <tbody>
                    <tr>
                        <td>Name of supplier:</td>
                        <td>Destination:</td>
                        <td>Details:</td>
                        <td>Delete:</td>
                    </tr>

                    {this.state. deliveries &&
                    this.state. deliveries.map(( delivery, index) =>
                            <tr>
                                <td>{ /*delivery.supplier*/ "supplier"}</td>
                                <td>{ delivery.destination}</td>
                                <td>
                                <Link
                                    to={{
                                        pathname: `/deliveries/${delivery.id}`,
                                        state: {  deliveries:  delivery }
                                    }}
                                >
                                <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Details</button>
                                </Link>
                                </td>
                                <td><button className="btn btn-outline-danger ml-4" value={delivery.id} onClick={() => this.handleDeliveryDelete(delivery.id)}>Delete</button></td>

                            </tr>
                    )}

                    </tbody>
                </table>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    //const { products } = state.products;
    return {
        user,
        message,
        //   products
    };
}


export default connect(mapStateToProps)(Deliveries);