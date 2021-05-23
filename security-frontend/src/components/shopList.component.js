import { connect } from "react-redux";
import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ShopsService from "../services/shops.service";


class Shops extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          shops: []
        };
      }
    
      componentDidMount() {
        ShopsService.getShops().then(
          response => {
            this.setState({
                shops: response.data
            });
          },
          error => {
            this.setState({
              shops:
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
        const { user: currentUser, shops } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Shops</strong>
                    </h3>
                </header>
                
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            
                        </tr>

                        {this.state.shops &&
                        this.state.shops.map((shop, index) =>                       
                          <div className="styled" >
                          <tr>
                              <td>{shop.name}</td>
                              <td>{shop.address}</td>
                              <td>{shop.hours}</td>                       
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
    return {
        user,
        message,
    };
}


export default connect(mapStateToProps)(Shops);