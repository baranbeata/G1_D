import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile_form extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Changes: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
        <div className="col-md-12">
            <div className="card card-container">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name: 
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              Surname: 
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              PESEL: 
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
           Telephone:
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
            <input type="submit" value="Confirm" />
            </label>
          </form>
          </div>
          </div>
        );
      }
    }
  
  function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  
  export default connect(mapStateToProps)(Profile_form);