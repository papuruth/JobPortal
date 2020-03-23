import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import jobAction from '../redux/addJob/jobActions';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component';
import Label from './generalComponents/label';
import userActions from '../redux/user/userActions';

class JobForm extends React.Component {
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
        company: ''
      },
      profileValid: false,
      designationValid: false,
      salaryValid: false,
      cityValid: false,
      companyValid: false,
      addJobValid: false,
      photoValid: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers(null));
  }

  componentWillReceiveProps(props) {
    try {
      const { users } = props;
      const compList = [];
      users.filter((item) => {
        if (item.role === 1) {
          return compList.push(item.name);
        }
        return false;
      });
      const optionsComp = compList.map((item) => {
        return { label: item, value: item };
      });
      this.setState({
        optionsComp
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    if (name === 'photo') {
      this.setState({
        file: event.target.files[0]
      });
    }
  };

  handleChangeComp = (selectedOption) => {
    const name = 'company';
    let value = '';
    try {
      value = selectedOption.value;
    } catch (error) {
      console.log(error.message);
    }
    this.setState(
      {
        company: selectedOption
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  addJob = (event) => {
    const { user } = this.props;
    event.preventDefault();
    let company = '';
    if (user.role === 0) {
      company = this.state.company.value;
    } else {
      company = user.name;
    }
    const { profile, designation, salary, city } = this.state;
    const data = new FormData();
    data.append('filename', company);
    data.append('file', this.state.file);
    const { dispatch } = this.props;
    if (company && profile && designation && salary && city && data) {
      dispatch(
        jobAction.addJob(company, profile, designation, salary, city, data)
      );
    }
  };

  errorClass = (error) => {
    return error.length === 0 ? '' : 'has-error';
  };

  validateForm() {
    this.setState((state) => {
      return {
        addJobValid:
          state.companyValid &&
          state.profileValid &&
          state.designationValid &&
          state.salaryValid &&
          state.cityValid &&
          state.photoValid
      };
    });
  }

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    const { user } = this.props;
    console.log(user)
    const fieldValidationErrors = formErrors;
    let {
      profileValid,
      designationValid,
      salaryValid,
      cityValid,
      photoValid,
      companyValid
    } = this.state;

    switch (fieldName) {
      case 'profile':
        profileValid = value.match(
          /^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
        );
        fieldValidationErrors.profile = profileValid ? '' : ' is invalid';
        break;
      case 'designation':
        designationValid = value.match(
          /^[a-z.][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
        );
        fieldValidationErrors.designation = designationValid
          ? ''
          : ' is invalid';
        break;
      case 'salary':
        salaryValid = value.match(/^([0-9]{1}\s[A-Z]{3})(\s-\s(\d+)\s[A-Z]{3})|(?<!\s|\d+|-|\s)([0-9]{1}\s[A-Z]{3})$/);
        fieldValidationErrors.salary = salaryValid ? '' : 'must be valid';
        break;
      case 'city':
        cityValid = value.match(/^[a-z][^!¡?÷?¿\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.city = cityValid
          ? ''
          : 'can be a comb. of a-zA-Z0-9.,-_()';
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
        fieldValidationErrors.company = companyValid ? '' : 'select one';
        break;
      default:
        break;
    }

    if (user.role === 1) {
      this.setState(
        {
          formErrors: fieldValidationErrors,
          profileValid,
          photoValid,
          designationValid,
          salaryValid,
          cityValid,
          companyValid: true
        },
        this.validateForm
      );
    } else {
      this.setState(
        {
          formErrors: fieldValidationErrors,
          profileValid,
          photoValid,
          designationValid,
          salaryValid,
          cityValid,
          companyValid
        },
        this.validateForm
      );
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="col-md-4 col-md-offset-4" id="addJob">
        <h1 className="underline">Add New Job</h1>
        <form onSubmit={this.addJob} method="POST">
          {user.role === 0 && (
            <div
              className={`form-group row ${this.errorClass(
                this.state.formErrors.profile
              )}`}
            >
              <Label
                className="col-sm-3 col-form-label"
                htmlFor="company"
                title="Company"
              />
              <div className="col-sm-9">
                <Select
                  options={this.state.optionsComp}
                  value={this.state.company}
                  onChange={this.handleChangeComp}
                  placeholder="Choose company"
                  isClearable
                  required
                />
                {this.errorClass(this.state.formErrors.company) && (
                  <span className="nameright formErrors">
                    Please select one.
                  </span>
                )}
              </div>
            </div>
          )}
          <div
            className={`form-group row ${this.errorClass(
              this.state.formErrors.profile
            )}`}
          >
            <Label
              className="col-sm-3 col-form-label"
              htmlFor="profile"
              title="Profile"
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className="form-control"
                id="profile"
                inputType="text"
                name="profile"
                value={this.state.profile}
                placeholder="IT Service/Sales/Tester"
                required
              />
              {this.errorClass(this.state.formErrors.profile) && (
                <span className="nameright formErrors">
                  Profile name must be valid
                </span>
              )}
            </div>
          </div>
          <div
            className={`form-group row ${this.errorClass(
              this.state.formErrors.designation
            )}`}
          >
            <Label
              className="col-sm-3 col-form-label"
              htmlFor="designation"
              title="Designation"
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className="form-control"
                id="designation"
                inputType="text"
                name="designation"
                value={this.state.designation}
                placeholder="Software Engineer"
                required
              />
              {this.errorClass(this.state.formErrors.designation) && (
                <span className="emailright formErrors">
                  Invalid designation
                </span>
              )}
            </div>
          </div>
          <div
            className={`form-group row ${this.errorClass(
              this.state.formErrors.salary
            )}`}
          >
            <Label
              className="col-sm-3 col-form-label"
              htmlFor="salary"
              title="Salary"
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className="form-control"
                id="salary"
                inputType="text"
                name="salary"
                value={this.state.salary}
                placeholder="7 LPA"
                required
              />
              {this.errorClass(this.state.formErrors.salary) && (
                <span className="pswderrright formErrors">Invalid Salary</span>
              )}
            </div>
          </div>
          <div
            className={`form-group row ${this.errorClass(
              this.state.formErrors.city
            )}`}
          >
            <Label
              className="col-sm-3 col-form-label"
              htmlFor="city"
              title="City"
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className="form-control"
                id="city"
                inputType="text"
                name="city"
                value={this.state.city}
                placeholder="Delhi"
                required
              />
              {this.errorClass(this.state.formErrors.city) && (
                <span className="phoneright formErrors">
                  City name must be only in a-zA-Z_-0-9()
                </span>
              )}
            </div>
          </div>
          <div
            className={`form-group row ${this.errorClass(
              this.state.formErrors.city
            )}`}
          >
            <Label
              className="col-sm-3 col-form-label"
              htmlFor="photo"
              title="Job Photo"
            />
            <div className="col-sm-9">
              <Input
                onChange={this.handleUserInput}
                className="form-control"
                id="photo"
                inputType="file"
                name="photo"
                value={this.state.photo}
                required
              />
              {this.errorClass(this.state.formErrors.photo) && (
                <span className="phoneright formErrors">
                  Photo not valid only .jpg and .png
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9">
              <Button
                title="Add"
                action="submit"
                className="btn btn-success"
                btnDisabled={this.state.addJobValid}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

JobForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default JobForm;
