import React, {Component} from "react";
import axios from "axios";


class ShopDetails extends Component {


    constructor(props) {
        super(props);
        this.updateInputValueAddress= this.updateInputValueAddress.bind(this);
        this.updateInputValueName= this.updateInputValueName.bind(this);
        this.updateInputValueHours= this.updateInputValueHours.bind(this);
        this.updateInputValueCity= this.updateInputValueCity.bind(this);

        this.state = {
            city:'',
            is_city_clicked: false,
            name:'',
            is_name_clicked: false,
            address:'',
            is_address_clicked:false,
            hours:'',
            is_hours_clicked:false,
        };


    }

    updateInputValueCity(e) {
        this.setState({city: e.target.value,});
        this.setState({is_city_clicked:true})
    }

    updateInputValueName(e) {
        this.setState({name: e.target.value,});
        this.setState({is_name_clicked:true})
    }

    updateInputValueAddress(e) {
        this.setState({address: e.target.value,});
        this.setState({is_address_clicked:true})
    }

    updateInputValueHours(e) {
        this.setState({hours: e.target.value,});
        this.setState({is_hours_clicked:true})
    }

    handleChangeValue = id => {
        //this.setState({ is_des_clicked: !this.state.is_des_clicked });
        const url = `http://localhost:8080/shops/${id}`;
        let col='';
        let val='';
        //let button='';
        if(this.state.is_name_clicked) {
            this.setState({ is_name_clicked: !this.state.is_name_clicked });
            col = 'name';
            val=this.state.name;
        }
        else if(this.state.is_city_clicked)
        {
            this.setState({ is_city_clicked: !this.state.is_city_clicked });
            col = 'city';
            val=this.state.city;
        }
        else if(this.state.is_address_clicked)
        {
            this.setState({ is_address_clicked: !this.state.is_address_clicked });
            col = 'address';
            val=this.state.address;
        }
        else if(this.state.is_hours_clicked)
        {
            this.setState({ is_hours_clicked: !this.state.is_hours_clicked });
            col = 'hours';
            val=this.state.hours;
        }

        axios.post(url, null, { params: {
                value:val,
                column:col
            }})
            .then(response => response.status)
            .catch(err => console.warn(err));
    }


    render() {
        const {  location } = this.props;
        const { is_address_clicked } = this.state;
        const { is_name_clicked } = this.state;
        const { is_hours_clicked } = this.state;
        const { is_city_clicked } = this.state;

        return (

            <div className="container">
                <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        SHOP DETAILS
                    </h2>
                </header>


                <div>
                    <div className="form-group">
                        <label htmlFor={location.state.shops.name}><strong>Name</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.shops.name || ''}
                            //  value={this.state.description}
                            name="shopname"
                            placeholder="Click to add shop name"
                            onChange={this. updateInputValueName}

                        />

                        <div className="form-group">
                            { is_name_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.shops.id} onClick={() => this.handleChangeValue(location.state.shops.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.shops.address}><strong>Address</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.shops.address || ''}
                            //  value={this.state.description}
                            name="shopaddress"
                            placeholder="Click to add shop address"
                            onChange={this. updateInputValueAddress}

                        />

                        <div className="form-group">
                            { is_address_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.shops.id} onClick={() => this.handleChangeValue(location.state.shops.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.shops.city}><strong>City</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.shops.city || ''}
                            //  value={this.state.description}
                            name="shopcity"
                            placeholder="Click to add shop city"
                            onChange={this. updateInputValueCity}

                        />

                        <div className="form-group">
                            { is_city_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.shops.id} onClick={() => this.handleChangeValue(location.state.shops.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor={location.state.shops.hours}><strong>Open hours</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.shops.hours || ''}
                            //  value={this.state.description}
                            name="shophours"
                            placeholder="Click to add shop open hours"
                            onChange={this. updateInputValueHours}

                        />

                        <div className="form-group">
                            { is_hours_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.shops.id} onClick={() => this.handleChangeValue(location.state.shops.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>

                </div>


            </div>
        );
    };
}

export default  ShopDetails ;
