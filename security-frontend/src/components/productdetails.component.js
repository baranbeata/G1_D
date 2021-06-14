import React, {Component} from "react";
import axios from "axios";
import Form from "react-validation/build/form";


class ProductDetails extends Component {


    constructor(props) {
        super(props);
        this.updateInputValue= this.updateInputValue.bind(this);
        this.updateInputValueName= this.updateInputValueName.bind(this);
        this.updateInputValuePrice= this.updateInputValuePrice.bind(this);

        this.state = {
            description:'',
            is_des_clicked: false,
            name:'',
            is_name_clicked: false,
            price:'',
            is_price_clicked:false,
        };


    }

    updateInputValue(e) {
        this.setState({description: e.target.value,});
        this.setState({is_des_clicked:true})
    }

    updateInputValueName(e) {
        this.setState({name: e.target.value,});
        this.setState({is_name_clicked:true})
    }

    updateInputValuePrice(e) {
        this.setState({price: e.target.value,});
        this.setState({is_price_clicked:true})
    }


    handleChangeValue = id => {
        //this.setState({ is_des_clicked: !this.state.is_des_clicked });
        const url = `http://localhost:8080/products/${id}`;
        let col='';
        let val='';
        //let button='';
        if(this.state.is_des_clicked) {
            this.setState({ is_des_clicked: !this.state.is_des_clicked });
            col = 'description';
            val=this.state.description;
        }
        else if(this.state.is_name_clicked)
        {
            this.setState({ is_name_clicked: !this.state.is_name_clicked });
            col = 'name';
            val=this.state.name;
        }
        else if(this.state.is_price_clicked)
        {
            this.setState({ is_price_clicked: !this.state.is_price_clicked });
            col = 'price';
            val=this.state.price;
        }

        axios.post(url, null, { params: {
                value:val,
                column:col
            }})
            .then(response => response.status)
            .catch(err => console.warn(err));
    }

    handleChangeValueName = id => {
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
        const { is_price_clicked } = this.state;

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
                            onChange={this. updateInputValueName}

                        />

                        <div className="form-group">
                            { is_name_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.products.id} onClick={() => this.handleChangeValue(location.state.products.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.products.name}><strong>Size</strong></label>
                        <ul>
                            {location.state.products.sizes.map(size => <div>{size.name}</div>)}
                        </ul>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.products.name}><strong>Category</strong></label>
                        <ul>
                            {location.state.products.categories.map(cat => <div>{cat.name}</div>)}

                        </ul>

                    </div>



                    <div className="form-group">
                        <label htmlFor={location.state.products.name}><strong>Type</strong></label>
                        <ul>
                            {location.state.products.types.map(type => <div>{type.name}</div>)}
                        </ul>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.products.price}><strong>Price</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.products.price || ''}
                            //  value={this.state.description}
                            name="productprice"
                            placeholder="Click to change product price"
                            onChange={this. updateInputValuePrice}

                        />
                        <div className="form-group">
                            { is_price_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.products.id} onClick={() => this.handleChangeValue(location.state.products.id)}>Save</button>
                                : null
                            }
                        </div>


                    </div>


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

export default  ProductDetails ;
