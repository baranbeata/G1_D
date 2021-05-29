import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ProductService from "../services/product.service";
import axios from "axios"


import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    handleProductDelete = id => {
        console.log(id);
      const url = `http://localhost:8080/products/${id}`;
      axios.delete(url)
      .then(response => {
        this.setState(previousState => {
              return {
                  products: previousState.products.filter(p => p.id !== id)
              };
          });
    })
    .catch(response => {
        console.log(response);
    });
    }

    componentDidMount() {
        ProductService.getProducts().then(
            response => {
                this.setState({
                    products: response.data
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
        const { user: currentUser,  products } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        PRODUCTS
                    </h2>
                </header>
                <Link
                    to={{
                        pathname: `/add-product`,
                        //state: {  products:  product }
                    }}
                >
                <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Add product</button>
                </Link>

                <img src="/img/search.png"></img>
                <Input disableUnderline="true" placeholder="Search" inputProps={{ 'aria-label': 'description' }} style={{ marginBottom: "20px", underlineColor: "black"}} />

                <table className="table">
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>Price:</td>
                        <td>Details:</td>
                        <td>Delete:</td>
                    </tr>

                    {this.state. products &&
                    this.state. products.map(( product, index) =>
                            <tr>
                                <td>{ product.name}</td>
                                <td>{ product.price}</td>
                                <td>
                                <Link
                                    to={{
                                        pathname: `/products/${product.id}`,
                                        state: {  products:  product }
                                    }}
                                >
                                <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Details</button>
                                </Link>
                                </td>
                                <td><button className="btn btn-outline-danger ml-4" value={product.id} onClick={() => this.handleProductDelete(product.id)}>Delete</button></td>

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


export default connect(mapStateToProps)(Products);


/*
{this.state.products.map((product, index) => {
  return(
    <tr>
      <td>{product.name}</td>
      <td>{product.size}</td>

    </tr>
  );
})}
*/