import React from 'react'
import Loader from '../../node_modules/react-loader-spinner/index'
import { userActions } from '../redux/user/userActions'
import male from '../images/male.jpg'
import female from '../images/female.png'
import Input from './generalComponents/input.component'
import Button from './generalComponents/button.component'
import Label from './generalComponents/label';

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      candidate: [],
      company: [],
      candidateShow: true,
      companyShow: '',
      name: '',
      emailId: '',
      password: '',
      phone: '',
      formErrors: { Email: '', Password: '', Phone: '', Fullname: '' },
      emailValid: true,
      passwordValid: true,
      nameValid: true,
      phoneValid: true,
      formValid: true
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers());
    setTimeout(() => {
      document.getElementById('manageuser').style.display = 'none';
    }, 1000)
  }

  componentWillUnmount() {
    document.getElementById('manageuser').style.display = 'block';
  }
  componentWillReceiveProps(newProps) {
    try {
      const { users } = newProps;
      let company = [];
      let candidate = [];
      let headings = ['Id', 'Fullname', 'Email', 'Password', 'Gender', 'Role', 'Actions'];
      console.log(headings)
      users.filter((item, index) => {
        if (item.role === 1) {
          company.push(item)
        }

        if (item.role === 2) {
          candidate.push(item);
        }
        return false;
      })
      this.setState({
        allUser: users,
        headings: headings,
        candidate: candidate,
        company: company
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  showUserDetails = (event) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const oneUser = this.state.allUser.filter((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    })

    this.setState({
      clickedUser: oneUser
    }, () => {
      document.getElementById('showUserDetail').style.display = 'block'
    })
  }

  closeUserDetail = (e) => {
    document.getElementById('showUserDetail').style.display = 'none'
  }

  candidateShow = (e) => {
    e.preventDefault();
    this.setState({
      candidateShow: true,
      companyShow: ''
    })
  }

  companyShow = (e) => {
    e.preventDefault();
    this.setState({
      candidateShow: '',
      companyShow: true
    })
  }

  editUser = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const oneUser = this.state.allUser.filter((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    })

    this.setState({
      editUser: oneUser,
      _id: id,
      name: oneUser[0].name,
      emailId: oneUser[0].emailId,
      password: oneUser[0].password,
      phone: oneUser[0].phone
    }, () => {
      document.getElementById('editUserDetail').style.display = 'block'
    })
  }

  deleteUser = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const { dispatch } = this.props;
    dispatch(userActions.deleteUser(id));
  }

  banUser = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const oneUser = this.state.allUser.filter((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    })
    const userStatus = oneUser[0].userStatus;
    if (userStatus === 1) {
      const { dispatch } = this.props;
      dispatch(userActions.banUser(id, 0));
    } else {
      const { dispatch } = this.props;
      dispatch(userActions.banUser(id, 1));
    }
  }

  closeEditUserDetail = (e) => {
    document.getElementById('editUserDetail').style.display = 'none'
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
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case 'emailId':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
        fieldValidationErrors.Password = passwordValid ? '' : ' is too short and must be of length 8 and must conatain a lowercase an uppercase a number and a special character';
        break;
      case 'name':
        nameValid = value.match(/^[a-z][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
        fieldValidationErrors.Fullname = nameValid ? '' : 'must contain only alphabets'
        break;
      case 'phone':
        phoneValid = value.length === 10 && value.match(/^[0-9]+$/);
        fieldValidationErrors.Phone = phoneValid ? '' : 'must be only numbers and 10 digits only'
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      nameValid: nameValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid && this.state.phoneValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  submitDetails = (event) => {
    event.preventDefault();
    const { name, emailId, password, phone, _id } = this.state;
    const { dispatch } = this.props
    dispatch(userActions.editUser(name, emailId, password, phone, _id))
  }

  render() {
    if (this.state.allUser.length === 0) {
      return (
        // <p className="fa fa-spinner fa-spin"></p>
        <div className="spinner">
          <Loader
            type="Puff"
            color="#00BFFF"
            height="80"
            width="80"
          />
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row tabs">
          <div className="col-sm-6">
            <div className="list-group" id="list-tab" role="tablist">
              <button onClick={this.candidateShow} id="candidate" className="list-group-item list-group-item-action active" role="tab">Manage Candidates</button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="list-group" id="list-tab" role="tablist">
              <button onClick={this.companyShow} id="company" className="list-group-item list-group-item-action active" role="tab">Manage Companies</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="listing-table table-dark">
              <thead>
                <tr>
                  {
                    this.state.headings.map((item) => {
                      return (
                        <th key={item}>{item}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  this.state.candidateShow && this.state.candidate.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item['_id']}</td>
                        <td>{item['name']}</td>
                        <td>{item['emailId']}</td>
                        <td>{item['password']}</td>
                        <td>{item['gender']}</td>
                        <td>{item['role']}</td>
                        <td>
                          <div className="btn-group">
                            <button id={item._id} className="btn btn-primary" onClick={this.showUserDetails}><i className="fa fa-info-circle"></i> Info</button>
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="fa fa-caret-down" title="Toggle dropdown menu"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.editUser}><i className="fa fa-pencil fa-fw"></i> Edit</button></li>
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.deleteUser}><i className="fa fa-trash-o fa-fw"></i> Delete</button></li>
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.banUser}><i className="fa fa-ban fa-fw"></i> {item.userStatus === 1 ? 'Ban' : 'Unban'}</button></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  this.state.companyShow && this.state.company.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item['_id']}</td>
                        <td>{item['name']}</td>
                        <td>{item['emailId']}</td>
                        <td>{item['password']}</td>
                        <td>{item['gender']}</td>
                        <td>{item['role']}</td>
                        <td>
                          <div className="btn-group">
                            <button id={item._id} className="btn btn-primary" onClick={this.showUserDetails}><i className="fa fa-info-circle"></i> Info</button>
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="fa fa-caret-down" title="Toggle dropdown menu"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.editUser}><i className="fa fa-pencil fa-fw"></i> Edit Company</button></li>
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.deleteUser}><i className="fa fa-trash-o fa-fw"></i> Delete Company</button></li>
                              <li><button id={item._id} type="button" className="btn btn-link" onClick={this.banUser}><i className="fa fa-ban fa-fw"></i> {item.userStatus === 1 ? 'Ban COmpany' : 'Unban Company'}</button></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div id="showUserDetail" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.closeUserDetail}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>User Details</h3>
            </header>
            <div className="panel panel-primary w3-container">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    {
                      this.state.clickedUser && !this.state.clickedUser[0].image && this.state.clickedUser[0].gender === 'Male' && <img className="img-circle" src={male} alt="Upload Pic" />
                    }
                    {
                      this.state.clickedUser && !this.state.clickedUser[0].image && this.state.clickedUser[0].gender === 'Female' && <img className="img-circle" src={female} alt="Upload Pic" />
                    }
                    {
                      this.state.clickedUser && this.state.clickedUser[0].image && <img key={new Date()} className="img-circle" src={`http://localhost:4000${this.state.clickedUser[0].image}?${this.state.imageHash}`} alt="Upload Pic" />
                    }
                  </div>
                  <div className="col-md-8 col-lg-8">
                    {this.state.clickedUser && <strong>{this.state.clickedUser[0].name} </strong>}<br />
                    {
                      this.state.clickedUser && <div>
                        <dl>
                          <dt>UID</dt>
                          <dd>{this.state.clickedUser[0]._id}</dd>
                        </dl>
                        <dl>
                          <dt>Fullname</dt>
                          <dd>{this.state.clickedUser[0].name}</dd>
                        </dl>
                        <dl>
                          <dt>Email</dt>
                          <dd>{this.state.clickedUser[0].emailId}</dd>
                        </dl>
                        <dl>
                          <dt>Mobile No.</dt>
                          <dd>{this.state.clickedUser[0].phone}</dd>
                        </dl>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="editUserDetail" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.closeEditUserDetail}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>Edit User Details</h3>
            </header>
            <div className="w3-container">
              <div className="row">
                <div className="col-sm-12">
                  <br />
                  <div className="col-md-offset=4">
                    <form onSubmit={this.submitDetails}>
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
                            input_type={'text'}
                            name={'name'}
                            id={'fullname'}
                            value={this.state.name}
                            placeholder="Enter fullname"
                            required
                          />
                          {this.errorClass(this.state.formErrors.Fullname) && <span className="formErrors">Name must be only in alphabets</span>}
                        </div>
                      </div>
                      <div className={`form-group row ${this.errorClass(this.state.formErrors.Email)}`}>
                        <Label
                          className={'col-sm-2 col-form-label'}
                          htmlFor={'emailId'}
                          title={'Email'}
                        />
                        <div className="col-sm-10">
                          <Input
                            onChange={this.handleUserInput}
                            className={'form-control'}
                            id={'emailId'}
                            input_type={'text'}
                            name={'emailId'}
                            value={this.state.emailId}
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
                        <div className="col-sm-10">
                          <Input
                            onChange={this.handleUserInput}
                            className={'form-control'}
                            id={'password'}
                            input_type={'password'}
                            name={'password'}
                            value={this.state.password}
                            placeholder="Password"
                            required
                          />
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
                            input_type={'number'}
                            name={'phone'}
                            value={this.state.phone}
                            placeholder="+91"
                            required
                          />
                          {this.errorClass(this.state.formErrors.Phone) && <span className="formErrors">Phone must be only in numbers</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10">
                          <Button
                            title={'Save'}
                            action={'submit'}
                            className="btn btn-primary"
                            disabled={this.state.formValid}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ManageUser;