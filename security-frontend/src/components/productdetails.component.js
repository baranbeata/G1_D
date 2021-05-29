import React, {Component} from "react";
import axios from "axios";


class ProductDetails extends Component {


    constructor(props) {
        super(props);
        this.updateInputValue= this.updateInputValue.bind(this);

        this.state = {
            description:'',
            is_des_clicked: false,
        };


    }

    updateInputValue(e) {
        this.setState({description: e.target.value,});
        this.setState({is_des_clicked:true})
    }


    handleChangeValue = id => {
        this.setState({ is_des_clicked: !this.state.is_des_clicked });
        const url = `http://localhost:8080/products/${id}`;
        axios.post(url, null, { params: {
                value:this.state.description,
                column:'description'
            }})
            .then(response => response.status)
            .catch(err => console.warn(err));
    }

    render() {
        const {  location } = this.props;
        const { is_des_clicked } = this.state;

        return (

            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Product details page</strong>
                    </h3>
                </header>


                <div>
                    <p>
                        <strong>Name:</strong> {location.state.products.name}
                    </p>
                    <p>
                        <strong>Size:</strong> {location.state.products.size}
                    </p>
                    <p>
                        <strong>Category:</strong> {location.state.products.categories.name}
                    </p>
                    <p>
                        <strong>Type:</strong> {location.state.products.types.name}
                    </p>
                    <p>
                        <strong>Price:</strong> {location.state.products.price}
                    </p>
                    <div className="form-group">
                        <label htmlFor={location.state.products.description}><strong>Product description</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.products.description || ''}
                            //  value={this.state.description}
                            name="productdescription"
                            placeholder="Click to add product description"
                            onChange={this. updateInputValue}

                        />

                        <div className="form-group">
                            { is_des_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.products.id} onClick={() => this.handleChangeValue(location.state.products.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/img/product/product-1.jpg"} alt="image"/>
                </div>
            </div>
        );
    };
}
/*
function mapStateToProps(state) {
    const { description } = state.auth;
    return {
        description
    };
}

export default connect(mapStateToProps)(ProductDetails );
*/
export default  ProductDetails ;
