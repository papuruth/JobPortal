import React from 'react';
import { Link } from 'react-router-dom';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import isLoggedIn from '../isLoggedIn';
import userActions from '../redux/user/userActions';
import alertActions from '../redux/alert/alertActions';
import Label from './generalComponents/label';

class Signup extends React.Component {
  isLoggedIn;
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
      formErrors: { Email: '', Password: '', Phone: '', Fullname: '', Gender: '' },
      emailValid: false,
      userExists: '',
      passwordValid: false,
      nameValid: false,
      phoneValid: false,
      genderValid: false,
      signupValid: false,
      pswdType: true,
      pswdClass: 'fa fa-eye-slash'
    }
  }

  componentDidMount() {
    window.addEventListener('online', (event) => {
      this.register(event);
    })

    setTimeout(() => {
      document.getElementById('register').style.display = 'none';
    }, 0)
  }

  componentWillUnmount() {
    try {
      document.getElementById('register').style.display = 'block';
    } catch (error) {
      console.log(error.message)
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
    let nameValid = this.state.nameValid;
    let genderValid = this.state.genderValid;
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
        fieldValidationErrors.Password = passwordValid ? '' : ' is too short and must be of length 8 and must conatain a lowercase an uppercase a number and a special character';
        break;
      case 'fullname':
        nameValid = value.match(/^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.Fullname = nameValid ? '' : 'must contain only alphabets'
        break;
      case 'phone':
        phoneValid = value.length === 10 && value.match(/^[0-9]+$/);
        fieldValidationErrors.Phone = phoneValid ? '' : 'must be only numbers and 10 digits only'
        break;
      case 'gender':
        genderValid = !!this.state.gender;
        fieldValidationErrors.Gender = genderValid ? '' : 'please select one'
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      genderValid: genderValid,
      passwordValid: passwordValid,
      nameValid: nameValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      signupValid: this.state.emailValid && this.state.genderValid && this.state.passwordValid && this.state.nameValid && this.state.phoneValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  register = (event) => {
    event.preventDefault();
    const { fullname, email, password, phone, gender } = this.state;
    const { dispatch } = this.props
    if (navigator.onLine) {
      dispatch(userActions.register(fullname, email, password, phone, gender))
    } else {
      dispatch(alertActions.error('Network Down. Form will be auto submitted once online!'))
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
      <div className="col-md-4 col-md-offset-4">
        <h1 className="underline">Register</h1>
        <form onSubmit={this.register} method="POST">
          <div className={`form-group row ${this.errorClass(this.state.formErrors.Fullname)}`}>
            <Label
              className={'col-sm-2 col-form-label'}
              htmlFor={'fullname'}
              title={'Fullname'}
            />
            <div className='col-sm-10'>
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                inputType={'text'}
                name={'fullname'}
                id={'fullname'}
                value={this.state.fullname}
                placeholder="Enter fullname"
                required
              />
              {this.errorClass(this.state.formErrors.Fullname) && <span className="formErrors">Name must be only in alphabets</span>}
            </div>
          </div>
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
              {this.errorClass(this.state.formErrors.Email) && <span className="formErrors">Email should be a valid email address e.g., example@domain.com</span>}
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
              {this.errorClass(this.state.formErrors.Password) && <span className="formErrors">Password is too short and must be of length 8 and must conatain a lowercase an uppercase a number and a special character</span>}
            </div>
          </div>
          <div className={`form-group row ${this.errorClass(this.state.formErrors.Phone)}`}>
            <Label
              className={'col-sm-2 col-form-label'}
              htmlFor={'phone'}
              title={'Phone'}
            />
            <div className="col-sm-10">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'phone'}
                inputType={'number'}
                name={'phone'}
                value={this.state.phone}
                placeholder="+91"
                required
              />
              {this.errorClass(this.state.formErrors.Phone) && <span className="formErrors">Phone must be only in numbers</span>}
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <Label
                className={'col-sm-2 col-form-label pt-0'}
                htmlFor={'phone'}
                title={'Gender'}
              />
              <div className="col-sm-10">
                <div className="form-check">
                  <Input
                    className={'form-check-input'}
                    inputType="radio"
                    name="gender"
                    id="male"
                    checked={this.state.gender === 'Male'}
                    onChange={this.handleUserInput}
                    value={'Male'}
                    placeholder="Male"
                  />
                  &nbsp;
                  <Label
                    className={'form-check-label'}
                    htmlFor={'male'}
                    title={'Male'}
                  />
                </div>
                <div className="form-check">
                  <Input
                    className={'form-check-input'}
                    inputType="radio"
                    name="gender"
                    id="female"
                    checked={this.state.gender === 'Female'}
                    onChange={this.handleUserInput}
                    value={'Female'}
                    placeholder="Female"
                  />
                  &nbsp;
                  <Label
                    className={'form-check-label'}
                    htmlFor={'female'}
                    title={'Female'}
                  />
                </div>
                {this.errorClass(this.state.formErrors.Gender) && <span className="formErrors">Please select one.</span>}
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <div className="col-sm-10">
              <Button
                title={'Register'}
                action={'submit'}
                className="btn btn-primary"
                disabled={this.state.signupValid}
              />
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
          </div>
        </form>
      </div >
    )
  }
}

export default Signup;