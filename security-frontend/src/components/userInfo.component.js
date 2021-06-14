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
            <header style={{ paddingTop: "50px"}}>
              <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
               INFORMATION ABOUT:  <strong>{localStorage.getItem("username")}</strong>
              </h2>
            </header>


                {this.state.infos &&
               (
                    <div>
                        <p>
                            <strong>Name: </strong> {this.state.infos.name}
                        </p>
                        <p>
                            <strong>Surname: </strong> {this.state.infos.surname}
                        </p>
                        <p>
                            <strong>Pesel: </strong> {this.state.infos.pesel}
                        </p>
                        <p>
                            <strong>Telephone number: </strong> {this.state.infos.tel}
                        </p>

                    </div>
                )
                }
                 
                <p>
                  <table>
                   <td> <Link to="/user/infoEdit-form"><button className="btn btn-info btn-sm" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>Edit information</button></Link> </td>
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