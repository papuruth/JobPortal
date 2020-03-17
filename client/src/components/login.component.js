import PropsTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import isLoggedIn from '../isLoggedIn';
import userActions from '../redux/user/userActions';
import Button from './generalComponents/button.component';
import Input from './generalComponents/input.component';
import Label from './generalComponents/label';
import googleButton from '../images/btn_google_signin_dark_normal_web.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  login = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
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
    const { history } = this.props;
    if (isLoggedIn()) {
      history.push('/');
    }
    return (
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="col-md-4 col-md-offset-4">
            <h1>Login</h1>
            <form onSubmit={this.login} method="POST">
              <div
                className={`form-group row ${this.errorClass(
                  this.state.formErrors.Username
                )}`}
              >
                <Label
                  className="col-sm-2 col-form-label"
                  htmlFor="email"
                  title="Email"
                />
                <div className="col-sm-10">
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
                  className="col-sm-2 col-form-label"
                  htmlFor="password"
                  title="Password"
                />
                <div className="input-group col-sm-10">
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
                <div className="col-sm-10">
                  <Button
                    title="Login"
                    className="btn btn-primary"
                    btnDisabled={this.state.signinValid}
                  />
                  <a href="/google">
                    {/* <GoogleButton /> */}
                    <img src={googleButton} alt="sign into Google Button" />
                  </a>
                  <Link to="/register" className="btn btn-link">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropsTypes.oneOfType([PropsTypes.object]).isRequired,
  dispatch: PropsTypes.func.isRequired
};

export default Login;
