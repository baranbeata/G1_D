import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ShopService from "../services/shop.service";
import axios from "axios";


class Shops extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops: []
        };
    }

    handleShopDelete = id => {
       // console.log(id);
        const url = `http://localhost:8080/shops/${id}`;
        axios.delete(url)
            .then(response => {
                this.setState(previousState => {
                    return {
                        shops: previousState.shops.filter(p => p.id !== id)
                    };
                });
            })
            .catch(response => {
                console.log(response);
            });
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
                <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        SHOPS
                    </h2>
                </header>

                <table className="table">
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>Address:</td>
                        <td>City:</td>
                        <td>Details:</td>
                        <td>Delete:</td>
                    </tr>

                    {this.state.shops &&
                    this.state.shops.map((shop, index) =>
                            //<div className="styled" >
                                <tr>
                                    <td>{shop.name}</td>
                                    <td>{shop.address}</td>
                                    <td>{shop.city}</td>
<td>
                                        <Link
                                            to={{
                                                pathname: `/shops/${shop.id}`,
                                                state: { shops: shop }
                                            }}
                                        >
                                    <button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Details</button>
                                    </Link>
</td>
                                          <td><button className="btn btn-outline-danger ml-4" value={shop.id} onClick={() => this.handleShopDelete(shop.id)}>Delete</button></td>
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