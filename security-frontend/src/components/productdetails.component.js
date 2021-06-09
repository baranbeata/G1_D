import React, {Component} from "react";
import axios from "axios";


class ProductDetails extends Component {


    constructor(props) {
        super(props);
        this.updateInputValue= this.updateInputValue.bind(this);
        this.updateInputValue2= this.updateInputValue2.bind(this);

        this.state = {
            description:'',
            is_des_clicked: false,
            name:'',
            is_name_clicked: false,
        };


    }

    updateInputValue(e) {
        this.setState({description: e.target.value,});
        this.setState({is_des_clicked:true})
    }

    updateInputValue2(e) {
        this.setState({name: e.target.value,});
        this.setState({is_name_clicked:true})
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

    handleChangeValue2 = id => {
        this.setState({ is_name_clicked: !this.state.is_name_clicked });
        const url = `http://localhost:8080/products/${id}`;
        axios.post(url, null, { params: {
                value:this.state.name,
                column:'name'
            }})
            .then(response => response.status)
            .catch(err => console.warn(err));
    }

    render() {
        const {  location } = this.props;
        const { is_des_clicked } = this.state;
        const { is_name_clicked } = this.state;

        return (

            <div className="container">
                  <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        PRODUCT DETAILS
                    </h2>
                </header>


                <div>
                    <div className="form-group">
                        <label htmlFor={location.state.products.name}><strong>Name</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.products.name || ''}
                            //  value={this.state.description}
                            name="productname"
                            placeholder="Click to add product name"
                            onChange={this. updateInputValue2}

                        />

                        <div className="form-group">
                            { is_name_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.products.id} onClick={() => this.handleChangeValue2(location.state.products.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>
                    <p>
                        <strong>Size:</strong>
                        <ul>
                            {location.state.products.sizes &&
                            location.state.products.sizes.map((size, index) => <li key={index}>{size}</li>)}
                        </ul>

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
