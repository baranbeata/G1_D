import React, {Component} from "react";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { infoedit } from "../actions/auth";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


class Profile_form extends Component {

  constructor(props) {
    super(props);
     this.onChangeName= this.onChangeName.bind(this);
     this.onChangeSurname= this.onChangeSurname.bind(this);
     this.handleInfoEdit=this.handleInfoEdit.bind(this);
     this.onChangePesel=this.onChangePesel.bind(this);
     this.onChangeTel=this.onChangeTel.bind(this);

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

componentDidMount() {
  const user_info = this.props.user_info;

  if (user_info) {
    this.setState({
      currentUser_info: user_info,
    });
  }
}

onChangeName(e) {
    this.setState({Name: e.target.value,});
}

onChangeSurname(e) {
    this.setState({surname: e.target.value});
}

onChangePesel(e) {
    this.setState({pesel: e.target.value});
}

onChangeTel(e) {
  this.setState({tel: e.target.value});
}


handleInfoEdit(e) {

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
                infoedit(localStorage.getItem("user_info"), this.state.name, this.state.surname,this.state.pesel,this.state.tel)
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
                    onSubmit={this.handleInfoEdit}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Surname:</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={this.state.surname}
                            onChange={this.onChangeSurname}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pesel">PESEL:</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="pesel"
                            onChange={this.onChangePesel}
                            value={this.state.pesel}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tel">Telephone:</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="tel"
                            onChange={this.onChangeTel}
                            value={this.state.tel}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button>
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
  const { user_info } = state.auth;
  const { name } = state.auth;
  const {surname}=state.auth;
  const { pesel } = state.auth;
  const { tel } = state.auth;
  const { message } = state.message;
  return {
    user_info,
    name,
    surname,
    pesel,
    tel
  };
}
  
  export default connect(mapStateToProps)(Profile_form);