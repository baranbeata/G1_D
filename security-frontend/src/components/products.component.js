import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ProductService from "../services/product.service";
import axios from "axios"



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
                <header className="jumbotron">
                    <h3>
                        <strong>Our products</strong>
                    </h3>
                </header>

                <table className="table">
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>Address:</td>
                        <td>City:</td>
                        <td>Delete</td>
                    </tr>

                    {this.state. products &&
                    this.state. products.map(( product, index) =>
                            <tr>
                                <td>{ product.name}</td>
                                <td>{ product.type}</td>

                                <Link
                                    to={{
                                        pathname: `/products/${product.id}`,
                                        state: {  products:  product }
                                    }}
                                >
                                    <td><button className="btn btn-info btn-sm">Details</button></td>
                                </Link>
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