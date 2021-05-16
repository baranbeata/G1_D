import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ProductService from "../services/product.service";
import Products from "./products.component";

class ProductDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          product: []
        };
      }
    
      componentDidMount() {
        ProductService.getProductDetails().then(
          response => {
            this.setState({
              product: response.data
            });
          },
          error => {
            this.setState({
              product:
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
        const { user: currentUser, product } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Product details page</strong>
                    </h3>
                </header>

                <p>
                    <strong>Name:</strong> {product.name}
                </p>
                <p>
                    <strong>Size:</strong> {product.size}
                </p>
                <p>
                    <strong>Price:</strong> {product.price}
                </p>
                <p>
                    <strong>Category:</strong> {product.categories.name}
                </p>
                <p>
                    <strong>Type:</strong> {product.types.name}
                </p>

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


export default connect(mapStateToProps)(ProductDetails);
