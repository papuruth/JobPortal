import React from 'react';
import PropTypes from 'prop-types';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import jobAction from '../redux/addJob/jobActions';

class UpdateJobForm extends React.Component {
  editjob = JSON.parse(localStorage.getItem('editjob'));

  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      profile: '',
      designation: '',
      salary: '',
      city: '',
      status: '',
      formErrors: {
        profile: '',
        designation: '',
        salary: '',
        city: '',
        status: ''
      },
      profileValid: true,
      designationValid: true,
      salaryValid: true,
      cityValid: true,
      addJobValid: true,
      statusValid: true
    };
  }

  componentDidMount() {
    const { editjobs } = this.props;
    const {
      profileType,
      company,
      designation,
      annualSalary,
      city,
      _id,
      status
    } = editjobs;
    this.setState({
      profile: profileType,
      company,
      designation,
      salary: annualSalary,
      city,
      status,
      id: _id
    });
  }

  handleUserInput = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  updateJob = (event) => {
    event.preventDefault();
    const { id, company, designation, city, profile, salary, status } = this.state;
    const profileType = profile;
    const annualSalary = salary;
    const { dispatch } = this.props;
    if (
      company &&
      profileType &&
      designation &&
      annualSalary &&
      city &&
      status
    ) {
      dispatch(
        jobAction.updateJob(
          id,
          company,
          profileType,
          designation,
          annualSalary,
          city,
          status
        )
      );
    }
  };

  validateForm = () => {
    const {
      profileValid,
      designationValid,
      salaryValid,
      cityValid,
      statusValid
    } = this.state;
    this.setState({
      addJobValid:
        profileValid &&
        designationValid &&
        salaryValid &&
        cityValid &&
        statusValid
    });
  };

  errorClass = (error) => (error.length === 0 ? '' : 'has-error');

  validateField = (fieldName, value) => {
    const { formErrors } = this.state;
    const fieldValidationErrors = formErrors;
    let { profileValid } = this.state;
    let { designationValid } = this.state;
    let { salaryValid } = this.state;
    let { cityValid } = this.state;
    let { statusValid } = this.state;

    switch (fieldName) {
      case 'profile':
        profileValid = value.match(
          /^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
        );
        fieldValidationErrors.profile = profileValid ? '' : ' is invalid';
        break;
      case 'designation':
        designationValid = value.match(
          /^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
        );
        fieldValidationErrors.designation = designationValid
          ? ''
          : ' is invalid';
        break;
      case 'salary':
        salaryValid = value.match(/^[0-9]+( [a-zA-Z]+)*$/);
        fieldValidationErrors.salary = salaryValid ? '' : 'must be valid';
        break;
      case 'city':
        cityValid = value.match(/^[a-z][^!¡?÷?¿\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.city = cityValid
          ? ''
          : 'can be a comb. of a-zA-Z0-9.,-_()';
        break;
      case 'status':
        statusValid = !!value;
        fieldValidationErrors.status = statusValid ? '' : 'must be selected atleast one';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        profileValid,
        designationValid,
        salaryValid,
        cityValid,
        statusValid
      },
      this.validateForm
    );
  };

  render() {
    const { history } = this.props;
    const {
      city,
      designation,
      profile,
      salary,
      formErrors,
      addJobValid,
      status
    } = this.state;
    if (this.user.role === 2) {
      history.push('/');
    }
    return (
      <div className="col-md-4 col-md-offset-4">
        <h1 className="underline">Update Job</h1>
        <form onSubmit={this.updateJob} method="POST">
          <div className={`form-group ${this.errorClass(formErrors.profile)}`}>
            <Input
              title="Profile"
              onChange={this.handleUserInput}
              className="form-control"
              id={profile}
              inputType="text"
              name="profile"
              value={profile}
              placeholder="IT Services/Sales/Tester"
              required
            />
            {this.errorClass(formErrors.profile) && (
              <span className="nameright formErrors">
                Profile name must be valid
              </span>
            )}
          </div>
          <div
            className={`form-group ${this.errorClass(formErrors.designation)}`}
          >
            <Input
              title="Designation"
              onChange={this.handleUserInput}
              className="form-control"
              id={designation}
              inputType="text"
              name="designation"
              value={designation}
              placeholder="Software Engineer"
              required
            />
            {this.errorClass(formErrors.designation) && (
              <span className="emailright formErrors">Invalid designation</span>
            )}
          </div>
          <div className={`form-group ${this.errorClass(formErrors.salary)}`}>
            <Input
              title="Salary"
              onChange={this.handleUserInput}
              className="form-control"
              id={salary}
              inputType="text"
              name="salary"
              value={salary}
              placeholder="7 LPA"
              required
            />
            {this.errorClass(formErrors.salary) && (
              <span className="pswderrright formErrors">Invalid Salary</span>
            )}
          </div>
          <div className={`form-group ${this.errorClass(formErrors.city)}`}>
            <Input
              title="City"
              onChange={this.handleUserInput}
              className="form-control"
              id={city}
              inputType="text"
              name="city"
              value={city}
              placeholder="Delhi"
              required
            />
            {this.errorClass(formErrors.city) && (
              <span className="phoneright formErrors">
                City name must be only in a-zA-Z_-0-9()
              </span>
            )}
          </div>
          <div className={`form-group ${this.errorClass(formErrors.status)}`}>
            <select value={status} name="status" className="form-control" onChange={this.handleUserInput}>
              <option value="">Select Status of Job</option>
              <option value="New">New</option>
              <option value="Closed">Closed</option>
            </select>
            {this.errorClass(formErrors.status) && (
              <span className="phoneright formErrors">
                Please select a job status!
              </span>
            )}
          </div>
          <div className="form-group">
            <Button
              title="Add"
              action="submit"
              className="btn btn-success"
              btnDisabled={addJobValid}
            />
          </div>
        </form>
      </div>
    );
  }
}

UpdateJobForm.propTypes = {
  editjobs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default UpdateJobForm;
