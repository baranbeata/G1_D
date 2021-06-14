import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect} from "react-router-dom";
//import InfoService from "../services/info.service";
import AuthService from "../services/auth.service";
import axios from "axios";



class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      infos: [],
         // {name:'Ania', surname:'Kowal', pesel:'123456789',tel:"111222333"},]
    };
  }

  componentDidMount() {
      //alert(`after incrementing, counts value is ${localStorage.getItem("username")}.`);
   AuthService.getInfo(localStorage.getItem("username")).then(
      response => {
        this.setState({
          infos: response.data
        });
      },
      /* error => {
         this.setState({
           infos:
             (error.response &&
               error.response.data &&
               error.response.data.message) ||
             error.message ||
             error.toString()
         });
       }
*/
    );
                
  }

    render() {
        const {  location } = this.props;
        const { user: currentUser, infos} = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
            <header className="jumbotron">
              <h3>
               Information about: <strong>{localStorage.getItem("username")}</strong>
              </h3>
            </header>


                {this.state.infos &&
               (
                    <div>
                        <p>
                            <strong>Name: {this.state.infos.name} </strong>
                        </p>
                        <p>
                            <strong>Surname: {this.state.infos.surname} </strong>
                        </p>
                        <p>
                            <strong>Pesel: {this.state.infos.pesel} </strong>
                        </p>
                        <p>
                            <strong>Telephone number: {this.state.infos.tel} </strong>
                        </p>

                    </div>
                )
                }
                 
                <p>
                  <table>
                   <td> <Link to="/user/infoEdit-form" className="btn btn-lg btn-outline-danger ml-4">Edit information</Link> </td>
                    </table>
                </p>
          </div>
                       
        );
      }
    }

function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    return {
        user,
        message
    };
}

export default connect(mapStateToProps)(User);