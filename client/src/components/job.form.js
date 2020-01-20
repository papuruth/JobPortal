import React from 'react';
import Select from 'react-select';
import jobAction from '../redux/addJob/jobActions';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import Label from './generalComponents/label';
import userActions from '../redux/user/userActions';

class JobForm extends React.Component {
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(props) {
    super(props);
    this.state = {
      file: [],
      profile: '',
      designation: '',
      company: '',
      salary: '',
      city: '',
      photo: '',
      optionsComp: [],
      formErrors: {
        profile: '',
        designation: '',
        salary: '',
        city: '',
        photo: '',
        company: '',
      },
      profileValid: false,
      designationValid: false,
      salaryValid: false,
      cityValid: false,
      companyValid: false,
      addJobValid: false,
      photoValid: false,
    }
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers());
  }

  componentDidMount() {
    try {
      setTimeout(() => {
        document.getElementById('addjob').style.display = 'none';
      }, 1000)
    } catch (error) {
      console.log(error.message)
    }
  }

  componentWillUnmount() {
    try {
      document.getElementById('addjob').style.display = 'block';
    } catch (error) {
      console.log(error.message);
    }
  }

  componentWillReceiveProps(props) {
    try {
      const { users } = props;
      var compList = [];
      users.filter((item) => {
        if (item.role === 1) {
          return (compList.push(item.name))
        }
        return false;
      })
      const optionsComp = compList.map((item) => {
        return { 'label': item, 'value': item }
      })
      this.setState({
        optionsComp: optionsComp
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
    if (name === 'photo') {
      this.setState({
        file: event.target.files[0]
      })
    }
  }

  handleChangeComp = (selectedOption) => {
    const name = 'company'
    let value = '';
    try {
      value = selectedOption.value;
    } catch (error) {
      console.log(error.message)
    }
    this.setState({
      company: selectedOption
    }, () => {
      this.validateField(name, value)
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let profileValid = this.state.profileValid;
    let designationValid = this.state.designationValid;
    let salaryValid = this.state.salaryValid;
    let cityValid = this.state.cityValid;
    let photoValid = this.state.photoValid;
    let companyValid = this.state.companyValid;

    switch (fieldName) {
      case 'profile':
        profileValid = value.match(/^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.profile = profileValid ? '' : ' is invalid';
        break;
      case 'designation':
        designationValid = value.match(/^[a-z.][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.designation = designationValid ? '' : ' is invalid';
        break;
      case 'salary':
        salaryValid = value.match(/^[0-9]+( [a-zA-Z]+)*$/);
        fieldValidationErrors.salary = salaryValid ? '' : 'must be valid'
        break;
      case 'city':
        cityValid = value.match(/^[a-z][^!¡?÷?¿\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.city = cityValid ? '' : 'can be a comb. of a-zA-Z0-9.,-_()'
        break;
      case 'photo':
        if (value.match(/\.[0-9a-z]+$/i)[0] === '.jpg') {
          photoValid = true;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        } else if (value.match(/\.[0-9a-z]+$/i)[0] === '.png') {
          photoValid = true;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        } else {
          photoValid = null;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        }
        break;
      case 'company':
        companyValid = !!this.state.company;
        fieldValidationErrors.company = companyValid ? '' : 'select one'
        break;
      default:
        break;
    }

    if (this.user.role === 1) {
      this.setState({
        formErrors: fieldValidationErrors,
        profileValid: profileValid,
        photoValid: photoValid,
        designationValid: designationValid,
        salaryValid: salaryValid,
        cityValid: cityValid,
        companyValid: true
      }, this.validateForm);
    } else {
      this.setState({
        formErrors: fieldValidationErrors,
        profileValid: profileValid,
        photoValid: photoValid,
        designationValid: designationValid,
        salaryValid: salaryValid,
        cityValid: cityValid,
        companyValid: companyValid
      }, this.validateForm);
    }
  }

  validateForm() {
    this.setState({
      addJobValid: this.state.companyValid && this.state.profileValid && this.state.designationValid && this.state.salaryValid && this.state.cityValid && this.state.photoValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  addJob = (event) => {
    event.preventDefault();
    let company = '';
    if (this.user.role === 0) {
      company = this.state.company.value;
    } else {
      company = this.user.name;
    }
    const { profile, designation, salary, city } = this.state;
    const data = new FormData();
    data.append('filename', company)
    data.append('file', this.state.file);
    const { dispatch } = this.props
    if (company && profile && designation && salary && city && data) {
      dispatch(jobAction.addJob(company, profile, designation, salary, city, data))
    }
    setTimeout(() => {
      document.getElementById('addjob').style.display = 'block';
    }, 1000)
  }

  render() {
    if (this.user.role === 2) {
      this.props.history.push('/')
    }

    return (
      <div className="col-md-4 col-md-offset-4" id="addJob">
        <h1 className="underline">Add New Job</h1>
        <form onSubmit={this.addJob} method="POST">
          {this.user.role === 0 && <div className={`form-group row ${this.errorClass(this.state.formErrors.profile)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'company'}
              title={'Company'}
            />
            <div className="col-sm-9">
              <Select options={this.state.optionsComp} value={this.state.company} onChange={this.handleChangeComp} placeholder="Choose company" isClearable={true} required />
              {this.errorClass(this.state.formErrors.company) && <span className="nameright formErrors">Please select one.</span>}
            </div>
          </div>}
          <div className={`form-group row ${this.errorClass(this.state.formErrors.profile)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'profile'}
              title={'Profile'}
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'profile'}
                input_type={'text'}
                name={'profile'}
                value={this.state.profile}
                placeholder="IT Service/Sales/Tester"
                required
              />
              {this.errorClass(this.state.formErrors.profile) && <span className="nameright formErrors">Profile name must be valid</span>}
            </div>
          </div>
          <div className={`form-group row ${this.errorClass(this.state.formErrors.designation)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'designation'}
              title={'Designation'}
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'designation'}
                input_type={'text'}
                name={'designation'}
                value={this.state.designation}
                placeholder="Software Engineer"
                required
              />
              {this.errorClass(this.state.formErrors.designation) && <span className="emailright formErrors">Invalid designation</span>}
            </div>
          </div>
          <div className={`form-group row ${this.errorClass(this.state.formErrors.salary)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'salary'}
              title={'Salary'}
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'salary'}
                input_type={'text'}
                name={'salary'}
                value={this.state.salary}
                placeholder="7 LPA"
                required
              />
              {this.errorClass(this.state.formErrors.salary) && <span className="pswderrright formErrors">Invalid Salary</span>}
            </div>
          </div>
          <div className={`form-group row ${this.errorClass(this.state.formErrors.city)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'city'}
              title={'City'}
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'city'}
                input_type={'text'}
                name={'city'}
                value={this.state.city}
                placeholder="Delhi"
                required
              />
              {this.errorClass(this.state.formErrors.city) && <span className="phoneright formErrors">City name must be only in a-zA-Z_-0-9()</span>}
            </div>
          </div>
          <div className={`form-group row ${this.errorClass(this.state.formErrors.city)}`}>
            <Label
              className={'col-sm-3 col-form-label'}
              htmlFor={'photo'}
              title={'Job Photo'}
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className={'form-control'}
                id={'photo'}
                input_type={'file'}
                name={'photo'}
                value={this.state.photo}
                required
              />
              {this.errorClass(this.state.formErrors.photo) && <span className="phoneright formErrors">Photo not valid only .jpg and .png</span>}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9">
              <Button
                title={'Add'}
                action={'submit'}
                className="btn btn-success"
                disabled={this.state.addJobValid}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default JobForm;