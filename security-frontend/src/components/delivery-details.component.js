import React, {Component} from "react";
import axios from "axios";
import Form from "react-validation/build/form";


class DeliveryDetails extends Component {


    constructor(props) {
        super(props);
        this.updateInputValueP= this.updateInputValueP.bind(this);
        this.updateInputValueE= this.updateInputValueE.bind(this);

        this.state = {
            destination:'',
            is_paid_up_clicked: false,
            paid_up:'',
            dateOfPlace:'',
            is_executed_clicked:false,
            executed: '',
            amount:'',
        };


    }

    updateInputValueP(e) {
        this.setState({paid_up: e.target.value,});
        this.setState({is_paid_up_clicked:true})
    }

    updateInputValueE(e) {
        this.setState({executed: e.target.value,});
        this.setState({is_executed_clicked:true})
    }


    handleChangeValue = id => {
        //this.setState({ is_paid_up_clicked: !this.state.is_paid_up_clicked });
        const url = `http://localhost:8080/deliveries/${id}`;
        let col='';
        let val='';
        //let button='';
        if(this.state.is_paid_up_clicked) {
            this.setState({ is_paid_up_clicked: !this.state.is_paid_up_clicked });
            col = 'paid_up';
            val=this.state.paid_up;
        }
        else if(this.state.is_executed_clicked)
        {
            this.setState({ is_executed_clicked: !this.state.is_executed_clicked });
            col = 'executed';
            val=this.state.executed;
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
        const { is_paid_up_clicked } = this.state;
        const { is_executed_clicked } = this.state;

        return (

            <div className="container">
                  <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        DELIVERY DETAILS
                    </h2>
                </header>


                <div>
                    <div className="form-group">
                        <label htmlFor={location.state.deliveries.paid_up}><strong>Payment status</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.deliveries.paid_up || ''}
                            //  value={this.state.description}
                            name="deliverypaid"
                            placeholder="false"
                            onChange={this. updateInputValueP}

                        />

                        <div className="form-group">
                            { is_paid_up_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.deliveries.id} onClick={() => this.handleChangeValue(location.state.deliveries.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>


                    <div>
                    <div className="form-group">
                        <label htmlFor={location.state.deliveries.executed}><strong>Execution status</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={location.state.deliveries.executed || ''}
                            //  value={this.state.description}
                            name="executed"
                            placeholder="false"
                            onChange={this. updateInputValueE}

                        />

                        <div className="form-group">
                            { is_executed_clicked
                                ?   <button className="btn btn-outline-info ml-4" value={location.state.deliveries.id} onClick={() => this.handleChangeValue(location.state.deliveries.id)}>Save</button>
                                : null
                            }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={location.state.deliveries.destination}><strong>Destination: </strong>{location.state.deliveries.destination}</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor={location.state.deliveries.dateOfPlace}><strong>Date of place: </strong>{location.state.deliveries.dateOfPlace}</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor={location.state.deliveries.amount}><strong>Amount: </strong>{location.state.deliveries.amount}</label>

                    </div>

                    </div>
                </div>
                
            </div>
            
        );
    };
}

export default  DeliveryDetails ;
