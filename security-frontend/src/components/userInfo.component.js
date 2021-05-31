import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route, Link, Redirect} from "react-router-dom";
//import InfoService from "../services/info.service";
import AuthService from "../services/auth.service";



class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      infos: []
    };
  }

  componentDidMount() {
    AuthService.getInfo(localStorage.getItem("username")).then(
      response => {
        this.setState({
          infos: response.data
        });
      },
      // error => {
      //   this.setState({
      //     infos:
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString()
      //   });
      // }
      //           )
    );
                
  }

    render() {
        const { user: currentUser, infos} = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
            <header className="jumbotron">
              <h3>
               Information about: <strong>{currentUser.username}</strong>
              </h3>
            </header>

            {this.state.infos &&
                        this.state.infos.map( info =>       
                        <div> 
            <p>
              <strong>Name: {info.name} </strong>
            </p>
            <p>
            <strong>Surname: {info.surname}</strong>
                </p>
                <p>
                <strong>PESEL: {info.pesel}</strong>
               </p>
                <p>
                <strong>Telephone: {info.tel} </strong>
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