import React, {Component} from "react";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {InfoService} from "../services/info.service";
import CheckButton from "react-validation/build/button";
import {infoedit} from "../actions/auth";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


class infoEdit_form extends Component {


    constructor(props) {
        super(props);
         this.handleName= this.handleName.bind(this);
         this.handleSurname=this.handleSurname.bind(this);
         this.handlePesel=this.handlePesel.bind(this);
         this.handleTel=this.handleTel.bind(this);
         this.handleinfoedit = this.handleinfoedit.bind(this);

        this.state = {
            name:'',
            surname:'',
            pesel:'',
            tel:'',
            errors: '',
            info: '',
            loading: false,
            currentUser: undefined,
            successful: false,
            items: [],
            errorMessage: ''
        };


    }

    handleName(e) {
        this.setState({name: e.target.value,});
    }

    handleSurname(e) {
        this.setState({surname: e.target.value});
    }

    handlePesel(e) {
        this.setState({pesel: e.target.value});
    }

    handleTel(e) {
        this.setState({tel: e.target.value});
    }

    handleinfoedit(e) {

        e.preventDefault();
        let errors = '';

        this.setState({
            loading: true,
        });

        this.setState({
            successful: false,
        });


        this.form.validateAll();
        this.setState({info:''});
       if (this.state.name.length===0 || this.state.surname.length===0 || this.state.pesel.length===0 || this.state.tel.length===0)
            errors += 'fields must be filled';

        if (errors.length > 0) {
            return;
        }


        if (errors.length === 0 ) {
            this.props
                .dispatch(
                    infoedit(localStorage.getItem("username_fk"), this.state.name, this.state.surname, this.state.pesel, this.state.tel)
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
        else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {

        const { message} = this.props;

        return (
            <div className="col-md-12">
                <div className="card card-container">

                    <Form
                        onSubmit={this.handleinfoedit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name"> Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleName}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="surname"
                                value={this.state.surname}
                                onChange={this.handleSurname}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pesel">PESEL</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="pesel"
                                onChange={this.handlePesel}
                                value={this.state.pesel}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tel">Telephone</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="tel"
                                value={this.state.tel}
                                onChange={this.handleTel}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button>
                                EDIT
                            </button>
                        </div>

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

// function mapStateToProps(state) {
//     const { password } = state.auth;
//     const {newpassword}=state.auth;
//     const { message } = state.message;
//     return {
//         password,
//         message,
//         newpassword
//     };
//}

// export default(infoEdit_form );
function mapStateToProps(state) {
    const { name } = state.auth;
    const { surname } = state.auth;
    const { pesel } = state.auth;
    const { tel } = state.auth;
    const { message } = state.message;
    return {
        name,
        surname,
        pesel,
        tel,
        message,

    };
}

export default connect(mapStateToProps)(infoEdit_form );