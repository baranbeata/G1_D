import React, {Component} from "react";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {changePassword} from "../actions/auth";
import CheckButton from "react-validation/build/button";
import Button from '@material-ui/core/Button';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class change_Password extends Component {


    constructor(props) {
        super(props);
         this.handleOldPassword= this.handleOldPassword.bind(this);
         this.handleChangedPassword=this.handleChangedPassword.bind(this);
         this.handleNewPassword=this.handleNewPassword.bind(this);
         this.handleNewPasswordRepeated=this.handleNewPasswordRepeated.bind(this);

        this.state = {
            password:'',
            newpassword:'',
            new_password_repeated:'',
            errors: '',
            info: '',
            loading: false,
            currentUser: undefined,
            successful: false,
            items: [],
            errorMessage: ''
        };


    }

    handleOldPassword(e) {
        this.setState({password: e.target.value,});
    }

    handleNewPassword(e) {
        this.setState({newpassword: e.target.value});
    }

    handleNewPasswordRepeated(e) {
        this.setState({new_password_repeated: e.target.value});
    }



    handleChangedPassword(e) {

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
        if (this.state.new_password_repeated !== this.state.newpassword) {
            errors += 'Fields "New password" and "Repeat new password" must be equal';
            this.setState({info:"Passwords don't match"});
        }
        else if (this.state.password.length===0 || this.state.newpassword.length===0 || this.state.new_password_repeated.length===0)
            errors += 'fields must be filled';

        if (errors.length > 0) {
            return;
        }

     //   alert(`after incrementing, counts value is ${localStorage.getItem("username")}.`);
        if (errors.length === 0 ) {
            this.props
                .dispatch(
                    changePassword(localStorage.getItem("username"), this.state.newpassword, this.state.password)
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
                <div className="card card-container" style={{ backgroundColor: 'white'}}>

                    <Form
                        onSubmit={this.handleChangedPassword}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="password">Old password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleOldPassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newpassword">New password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="newpassword"
                                value={this.state.newpassword}
                                onChange={this.handleNewPassword}
                                validations={[required,vpassword]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_repeat">Repeat new password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="new_password_repeated"
                                onChange={this.handleNewPasswordRepeated}
                                value={this.state.new_password_repeated}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" style={{ backgroundColor: 'rgb(207,16,26)', borderStyle: 'none'}}>
                                Change
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

function mapStateToProps(state) {
    const { password } = state.auth;
    const {newpassword}=state.auth;
    const { message } = state.message;
    return {
        password,
        message,
        newpassword
    };
}

export default connect(mapStateToProps)(change_Password );

