import PropsTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Divider } from '@material-ui/core';
import userActions from '../redux/user/userActions';
import GeneralButton from './generalComponents/button.component';
import Input from './generalComponents/input.component';
import Label from './generalComponents/label';
import googleButton from '../images/loginGoogle.png';
import facebookButton from '../images/loginFb.png';
import config from '../config';
import fetchJobByCompany from '../redux/fetchJobByCompany/fetchJobByCompanyAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.mount,
      username: '',
      password: '',
      formErrors: { Username: '', Password: '' },
      usernameValid: false,
      passwordValid: false,
      signinValid: false,
      pswdType: true,
      pswdClass: 'fa fa-eye-slash'
    };
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    }, () => {
      setTimeout(() => {
        this.props.handleLoginComponent(false);
      }, 200);
    });
  };

  handleSignupComponent = () => {
    this.setState({
      open: false
    }, () => {
      setTimeout(() => {
        this.props.handleLoginComponent(false);
        this.props.handleSignupComponent(true);
      }, 200);
    });
  }

  login = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
      setTimeout(() => {
        dispatch(fetchJobByCompany(true));
      }, 1000);
    }
  };

  showHidePassword = (e) => {
    e.preventDefault();
    if (document.getElementById('password').type === 'password') {
      this.setState((state) => {
        return {
          pswdClass: 'fa fa-eye',
          pswdType: !state.pswdType
        };
      });
    } else {
      this.setState((state) => {
        return {
          pswdClass: 'fa fa-eye-slash',
          pswdType: !state.pswdType
        };
      });
    }
  };

  errorClass = (error) => {
    return error.length === 0 ? '' : 'has-error';
  };

  validateForm() {
    const { usernameValid, passwordValid } = this.state;
    if (usernameValid && passwordValid) {
      this.setState({
        signinValid: usernameValid && passwordValid
      });
    }
  }

  validateField(fieldName, value) {
    const { formErrors, usernameValid, passwordValid } = this.state;
    const fieldValidationErrors = formErrors;
    let usernameCheck = usernameValid;
    let passwordCheck = passwordValid;

    switch (fieldName) {
      case 'username':
        usernameCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        fieldValidationErrors.Username = usernameCheck ? '' : ' is invalid';
        break;
      case 'password':
        passwordCheck =
          value.length >= 8 &&
          /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
            value
          );
        fieldValidationErrors.Password = passwordCheck
          ? ''
          : ' is too short and must be of length 8 and must conatain a lowercase an uppercase a number and a special character';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameCheck,
        passwordValid: passwordCheck
      },
      this.validateForm
    );
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            LOGIN TO EXPLORE MORE
            <Divider />
          </DialogTitle>
          <DialogContent>
            <div className="login_Social">
              <a href={`${config.nodeBaseUrl}/google`}>
                {/* <GoogleButton /> */}
                <img
                  src={googleButton}
                  alt="Sign in with Google"
                  title="Sign in with Google"
                />
              </a>
              <a href={`${config.nodeBaseUrl}/facebook`}>
                <img
                  src={facebookButton}
                  alt="Sign in with Facebook"
                  title="Sign in with Facebook"
                />
              </a>
            </div>
            <div className="login_orSec">
              <span className="login_ortextNew">or</span>
            </div>
            <form onSubmit={this.login} method="POST">
              <div
                className={`form-group row ${this.errorClass(
                  this.state.formErrors.Username
                )}`}
              >
                <Label
                  className="col-sm-12 col-form-label"
                  htmlFor="email"
                  title="Email"
                />
                <div className="col-sm-12">
                  <Input
                    onChange={this.handleUserInput}
                    className="form-control"
                    id="username"
                    inputType="text"
                    name="username"
                    value={this.state.username}
                    placeholder="@"
                    required
                  />
                  <div>
                    <small id="emailHelp" className="form-text text-muted">
                      We&apos;ll never share your email with anyone else.
                    </small>
                  </div>
                </div>
              </div>
              <div
                className={`form-group row ${this.errorClass(
                  this.state.formErrors.Password
                )}`}
              >
                <Label
                  className="col-sm-12 col-form-label"
                  htmlFor="password"
                  title="Password"
                />
                <div className="input-group col-sm-12">
                  <Input
                    onChange={this.handleUserInput}
                    className="form-control"
                    id="password"
                    inputType={this.state.pswdType ? 'password' : 'text'}
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    required
                  />
                  <div
                    className="input-group-addon"
                    onClick={this.showHidePassword}
                    role="button"
                    tabIndex={0}
                    onKeyPress={this.onKeyPress}
                  >
                    <i className={this.state.pswdClass} aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12">
                  <div className="login_Default">
                    <GeneralButton
                      title="Login"
                      className="btn btn-primary loginBtn"
                      btnDisabled={this.state.signinValid}
                    />
                  </div>
                  <div className="login_orSec">
                    <span className="login_ortextNew">or</span>
                  </div>
                  <div className="login_regSec">
                    Not a member as yet?
                    <Link to="#" onClick={this.handleSignupComponent}> Register</Link>
                  </div>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropsTypes.func.isRequired,
  mount: PropsTypes.bool.isRequired,
  handleLoginComponent: PropsTypes.func.isRequired,
  handleSignupComponent: PropsTypes.func.isRequired
};

export default Login;
