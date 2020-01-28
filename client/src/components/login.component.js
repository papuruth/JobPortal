import React from 'react';
import { Link } from 'react-router-dom';
import userActions from '../redux/user/userActions';
import isLoggedIn from '../isLoggedIn';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import Label from './generalComponents/label';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { Email: '', Password: '' },
      checkUserValid: '',
      emailValid: false,
      passwordValid: false,
      signinValid: false,
      pswdType: true,
      pswdClass: 'fa fa-eye-slash'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('login').style.display = 'none';
    }, 0)
  }

  componentWillUnmount() {
    try {
      document.getElementById('login').style.display = 'block';
    } catch (error) {
      console.log(error.message);
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && (/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/).test(value);
        fieldValidationErrors.Password = passwordValid ? '' : ' is too short and must be of length 8 and must conatain a lowercase an uppercase a number and a special character';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    if (this.state.emailValid && this.state.passwordValid) {
      this.setState({
        signinValid: this.state.emailValid && this.state.passwordValid
      });
    }
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  login = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  showHidePassword = (e) => {
    e.preventDefault();
    if (document.getElementById('password').type === 'password') {
      this.setState({
        pswdClass: 'fa fa-eye',
        pswdType: !this.state.pswdType
      })
    } else {
      this.setState({
        pswdClass: 'fa fa-eye-slash',
        pswdType: !this.state.pswdType
      })
    }
  }
  render() {
    if (isLoggedIn()) {
      this.props.history.push('/');
    }
    return (
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="col-md-4 col-md-offset-4">
            <h1>Login</h1>
            <form onSubmit={this.login} method="POST">
              <div className={`form-group row ${this.errorClass(this.state.formErrors.Email)}`}>
                <Label
                  className={'col-sm-2 col-form-label'}
                  htmlFor={'email'}
                  title={'Email'}
                />
                <div className="col-sm-10">
                  <Input
                    onChange={this.handleUserInput}
                    className={'form-control'}
                    id={'email'}
                    inputType={'text'}
                    name={'email'}
                    value={this.state.email}
                    placeholder="@"
                    required
                  />
                  <div><small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small></div>
                </div>
              </div>
              <div className={`form-group row ${this.errorClass(this.state.formErrors.Password)}`}>
                <Label
                  className={'col-sm-2 col-form-label'}
                  htmlFor={'password'}
                  title={'Password'}
                />
                <div className="input-group col-sm-10">
                  <Input
                    onChange={this.handleUserInput}
                    className={'form-control'}
                    id={'password'}
                    inputType={this.state.pswdType ? 'password' : 'text'}
                    name={'password'}
                    value={this.state.password}
                    placeholder="Password"
                    required
                  />
                  <div className="input-group-addon" onClick={this.showHidePassword}>
                    <i className={this.state.pswdClass} aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <Button
                    title={'Login'}
                    className="btn btn-primary"
                    btnDisabled={this.state.signinValid}
                  />
                  <Link to="/register" className="btn btn-link">Register</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;