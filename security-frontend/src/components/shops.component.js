import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ShopService from "../services/shop.service";


class Shops extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops: []
        };
    }

    componentDidMount() {
        ShopService.getShops().then(
            response => {
                this.setState({
                    shops: response.data
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
        const { user: currentUser, shops } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Our shops</strong>
                    </h3>
                </header>

                <table className="table">
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>Address:</td>
                        <td>City:</td>

                    </tr>

                    {this.state.shops &&
                    this.state.shops.map((shop, index) =>
                            <div className="styled" >
                                <tr>
                                    <td>{shop.name}</td>
                                    <td>{shop.address}</td>
                                    <td>{shop.city}</td>

                                        <Link
                                            to={{
                                                pathname: `/shops/${shop.id}`,
                                                state: { shops: shop }
                                            }}
                                        >
                                    <td><button className="btn btn-info btn-sm">Details</button></td>
                                    </Link>

                                </tr>
                            </div>
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


export default connect(mapStateToProps)(Shops);


/*
{this.state.shops.map((shop, index) => {
  return(
    <tr>
      <td>{shop.name}</td>
      <td>{shop.address}</td>
      <td>{shop.city}</td>
    </tr>
  );
})}
*/