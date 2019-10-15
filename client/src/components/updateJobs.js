import React from 'react';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import jobAction from '../redux/addJob/jobActions';

class UpdateJobForm extends React.Component {
  editjob = JSON.parse(localStorage.getItem('editjob'))
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      profile: '',
      designation: '',
      salary: '',
      city: '',
      formErrors: { profile: '', designation: '', salary: '', city: '' },
      profileValid: true,
      designationValid: true,
      salaryValid: true,
      cityValid: true,
      addJobValid: true,
    }
  }

  componentDidMount(){
    const {editjobs} = this.props
    console.log(editjobs)
      const { profileType, company, designation, annualSalary, city, _id } = editjobs
    this.setState({
      profile: profileType,
      company: company,
      designation: designation,
      salary: annualSalary,
      city: city,
      id: _id
    })
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let profileValid = this.state.profileValid;
    let designationValid = this.state.designationValid;
    let salaryValid = this.state.salaryValid;
    let cityValid = this.state.cityValid;

    switch (fieldName) {
      case 'profile':
        profileValid = value.match(/^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.profile = profileValid ? '' : ' is invalid';
        break;
      case 'designation':
        designationValid = value.match(/^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.designation = designationValid ? '' : ' is invalid';
        break;
      case 'salary':
        salaryValid = value.match(/^[0-9]+( [a-zA-Z]+)*$/);
        fieldValidationErrors.salary = salaryValid ? '' : 'must be valid'
        break;
      case 'city':
        cityValid = value.match(/^[a-z][^!¡?÷?¿\\+=@#$%ˆ&*{}|~<>;:[\]]{5,}$/i);
        fieldValidationErrors.city = cityValid ? '' : 'can be a comb. of a-zA-Z0-9.,-_()'
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      profileValid: profileValid,
      designationValid: designationValid,
      salaryValid: salaryValid,
      cityValid: cityValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      addJobValid: this.state.profileValid && this.state.designationValid && this.state.salaryValid && this.state.cityValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  updateJob = (event) => {
    event.preventDefault();
    const id = this.state.id;
    const { company, designation, city } = this.state;
    const profileType = this.state.profile;
    const annualSalary = this.state.salary;
    const { dispatch } = this.props;
    if (company && profileType && designation && annualSalary && city) {
      dispatch(jobAction.updateJob(id, company, profileType, designation, annualSalary, city));
    }
  }

  render() {
    if (this.user.role === 2) {
      this.props.history.push('/')
    }
    return (
      <div className="col-md-4 col-md-offset-4">
        <h1 className="underline">Update Job</h1>
        <form onSubmit={this.updateJob} method="POST">
          <div className={`form-group ${this.errorClass(this.state.formErrors.profile)}`}>
            <Input
              title={'Profile'}
              onChange={this.handleUserInput}
              className={'form-control'}
              id={this.state.profile}
              input_type={'text'}
              name={'profile'}
              value={this.state.profile}
              placeholder="IT Services/Sales/Tester"
              required
            />
            {this.errorClass(this.state.formErrors.profile) && <span className="nameright formErrors">Profile name must be valid</span>}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.designation)}`}>
            <Input
              title={'Designation'}
              onChange={this.handleUserInput}
              className={'form-control'}
              id={this.state.designation}
              input_type={'text'}
              name={'designation'}
              value={this.state.designation}
              placeholder="Software Engineer"
              required
            />
            {this.errorClass(this.state.formErrors.designation) && <span className="emailright formErrors">Invalid designation</span>}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.salary)}`}>
            <Input
              title={'Salary'}
              onChange={this.handleUserInput}
              className={'form-control'}
              id={this.state.salary}
              input_type={'text'}
              name={'salary'}
              value={this.state.salary}
              placeholder="7 LPA"
              required
            />
            {this.errorClass(this.state.formErrors.salary) && <span className="pswderrright formErrors">Invalid Salary</span>}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}>
            <Input
              title={'City'}
              onChange={this.handleUserInput}
              className={'form-control'}
              id={this.state.city}
              input_type={'text'}
              name={'city'}
              value={this.state.city}
              placeholder="Delhi"
              required
            />
            {this.errorClass(this.state.formErrors.city) && <span className="phoneright formErrors">City name must be only in a-zA-Z_-0-9()</span>}
          </div>
          <div className="form-group">
            <Button
              title={'Add'}
              action={'submit'}
              className="btn btn-success"
              disabled={this.state.addJobValid}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateJobForm;