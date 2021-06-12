import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
//import  add_product  from "../actions/auth";
import { Redirect, Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ProductService from "../services/product.service";
import axios from "axios";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.state = {
            name: "",
            price: "",
            size: ["m"],
            category: ["skirt"],
            type: ["men"],
            successful: false,
            //currentUser: undefined,
            loading: false,
        };
    }

    /*componentDidMount() {
      const user = this.props.user;
      if (user) {
        this.setState({
          currentUser: user,
          //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          //handleRegister: user.roles.includes("ROLE_ADMIN"),
        });
      }
    }*/

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    onChangeSize(e) {
        this.setState({
            size: [e.target.value],
        });
    }

    onChangeCategory(e) {
        this.setState({
           category: [e.target.value],
        });
    }

    onChangeType(e) {
        this.setState({
            type: [e.target.value],
        });
    }

    /*
    handleAddProduct(e) {
      e.preventDefault();
      this.setState({
        successful: false,
      });
      this.form.validateAll();
      if (this.checkBtn.context._errors.length === 0) {
        this.props
          .dispatch(
            add_product(this.state.name, this.state.price, this.state.size, this.state.category, this.state.type)
          )
          .then(() => {
            this.setState({
              successful: true,
            });
          })
          .catch(() => {
            this.setState({
              successful: false,
            });
          });
      }
    }
    */
    async handleAddProduct(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {

            axios.post("http://localhost:8080/add-product", JSON.stringify({
                    name: this.state.name,
                    price: this.state.price,
                    size: this.state.size,
                    category: this.state.category,
                    type: this.state.type}),
                {headers: {
                        // Accept: 'application/json',
                        'Content-Type': 'application/json;charset=utf-8',
                        //   'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    this.setState({
                        successful: true,
                        //responseMessage: response.data.message,
                        name: "",
                        price: "",
                        size: [],
                        category: [],
                        type: [],
                    });
                })
                .catch(response => {
                    this.setState({
                        successful: false,
                       // message: response.data.message
                    });
                });

        }
        else {
            this.setState({
                loading: false,
                name: "",
                price: "",
                size: [],
                category: [],
                type: [],
            });
        }
    }


    render() {
        const { message, user: currentUser } = this.props;

        /*
        let isAdmin = 0;
        if(currentUser!=null)
          currentUser.roles.forEach(role => {
            if(role === "ROLE_ADMIN")
              isAdmin = 1;
          });

        if (!isAdmin) {
          return <Redirect to="/" />;
        }
        */
        return (
            <div className="col-md-12">
                <div className="card card-container" style={{ backgroundColor: 'white'}}>

                    <Form
                        onSubmit={this.handleAddProduct}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        //validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price </label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.onChangePrice}
                                        //validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="size">Size:
                                        <select value={this.state.size} onChange={this.onChangeSize} className="form-control">
                                            <option value="xs">XS</option>
                                            <option value="s">S</option>
                                            <option value="m">M</option>
                                            <option value="l">L</option>
                                            <option value="xl">XL</option>
                                            <option value="one_size">ONE SIZE</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category:
                                        <select value={this.state.category} onChange={this.onChangeCategory} className="form-control">
                                            <option value="shirt">shirt</option>
                                            <option value="skirt">skirt</option>
                                            <option value="jeans">jeans</option>
                                            <option value="accessories">accessories</option>
                                            <option value="shoes">shoes</option>
                                            <option value="dress">dress</option>
                                            <option value="overall">overall</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type">Type:
                                        <select value={this.state.type} onChange={this.onChangeType} className="form-control">
                                            <option value="men">men</option>
                                            <option value="women">women</option>
                                            <option value="children">children</option>
                                            <option value="babies">babies</option>
                                            <option value="overall">overall</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="form-group">

                                    <button className="btn btn-primary btn-block" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Add product</button>

                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
/*
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
};
*/
function mapStateToProps(state) {
    //const { user } = state.auth;
    const { message } = state.message;
    return {
        //user,
        message
    };
}



export default connect(mapStateToProps)(AddProduct);