import React from 'react'
import { profileActions } from '../redux/profile/profileActions';
import Input from './generalComponents/input.component';
import Button from './generalComponents/button.component'
import male from '../images/male.jpg'
import female from '../images/female.png'
import Label from './generalComponents/label'
import Textarea from './generalComponents/textarea';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      subject: '',
      message: '',
      photo: '',
      formErrors: { photo: '', fullname: '', email: '', subject: '', message: '' },
      profileValid: false,
      photoValid: false
    }
  }

  componentWillReceiveProps(props) {
    const { user, profile } = props;
    this.setState({
      userData: user,
      profile: profile,
      imageHash: Date.now()
    })
  }

  componentWillMount() {
    const { user,  profile } = this.props;
    this.setState({
      userData: user,
      profile: profile
    })
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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let photoValid = this.state.photoValid

    switch (fieldName) {
      case 'photo':
        if (value.match(/\.[0-9a-z]+$/i)[0] === '.jpg' || value.match(/\.[0-9a-z]+$/i)[0] === '.JPG') {
          photoValid = true;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        } else if (value.match(/\.[0-9a-z]+$/i)[0] === '.png' || value.match(/\.[0-9a-z]+$/i)[0] === '.PNG') {
          photoValid = true;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        } else if (value.match(/\.[0-9a-z]+$/i)[0] === '.svg' || value.match(/\.[0-9a-z]+$/i)[0] === '.SVG') {
          photoValid = true;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        } else {
          photoValid = null;
          fieldValidationErrors.photo = photoValid ? '' : ' is invalid';
        }
        break;
      case 'fullname':
        document.getElementById('fullname').onkeydown = onkeyup = onkeypress = () => {
          fieldValidationErrors.fullname = false ? '' : 'read only';
        }
        break;
      case 'email':
        document.getElementById('email').onkeydown = onkeyup = onkeypress = () => {
          fieldValidationErrors.email = false ? '' : 'read only';
        }
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      photoValid: photoValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      profileValid: this.state.photoValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  sendMail = (event) => {
    event.preventDefault();
    const { subject, message } = this.state
    const { name, emailId } = this.state.userData
    const { dispatch } = this.props;
    dispatch(profileActions.sendMail(name, emailId, subject, message))
    document.getElementById('contactForm').style.display = 'none';
    this.setState({
      subject: '',
      message: ''
    })
  }

  submitDetails = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const id = this.state.userData._id
    const { emailId } = this.state.userData
    const data = new FormData();
    data.append('filename', this.state.userData.emailId)
    data.append('file', this.state.file)
    dispatch(profileActions.updateProfile(id, data, emailId))
    document.getElementById('photoupdate').reset();
    document.getElementById('updateDetails').style.display = 'none';

  }

  mailFlag;
  mailForm = (event) => {
    event.preventDefault();
    const tempFlag = !this.mailFlag;
    if (tempFlag) {
      document.getElementById('contactForm').style.display = 'block';
      this.mailFlag = true;
    } else {
      this.mailFlag = false;
      document.getElementById('contactForm').style.display = 'none';
    }
  }

  updateFlag;
  updateDetails = (event) => {
    event.preventDefault()
    const tempFlag = !this.updateFlag;
    if (tempFlag) {
      document.getElementById('updateDetails').style.display = 'block';
      this.updateFlag = true;
    } else {
      this.updateFlag = false;
      document.getElementById('updateDetails').style.display = 'none';
    }
  }
  render() {
    let imageUrl = '';
    try {
      if (this.state.profile) {
        imageUrl = 'http://localhost:4000'.concat(this.state.profile.image)
      } else {
        imageUrl = 'http://localhost:4000'.concat(this.state.userData.image)
      }
    } catch (error) {
      console.log(error.message)
    }
    return (
      <div className="panel panel-primary profile">
        <div className="panel-heading">
          <h3 className="panel-title">User information</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3 col-lg-3">
              {
                !this.state.userData.image && this.state.userData.gender === 'Male' && <img className="img-circle" src={male} alt="Upload Pic" />
              }
              {
                !this.state.userData.image && this.state.userData.gender === 'Female' && <img className="img-circle" src={female} alt="Upload Pic" />
              }
              {
                this.state.userData.image && <img key={new Date()} className="img-circle" src={`${imageUrl}?${this.state.imageHash}`} alt="Upload Pic" />
              }
            </div>
            <div className="col-md-9 col-lg-9">
              <strong>{this.state.userData.name} </strong><br />
              <div>
                <dl>
                  <dt>UID:</dt>
                  <dd>{this.state.userData._id}</dd>
                </dl>
                <dl>
                  <dt>Fullname:</dt>
                  <dd>{this.state.userData.name}</dd>
                </dl>
                <dl>
                  <dt>Email:</dt>
                  <dd>{this.state.userData.emailId}</dd>
                </dl>
                <dl>
                  <dt>Mobile No.:</dt>
                  <dd>{this.state.userData.phone}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-body update" id="updateDetails">
          <form onSubmit={this.submitDetails} className="form-horizontal" id="photoupdate" method="post" encType="multipart/form-data">
            <hr />
            <h3 className="panel-title">Update Details!</h3>
            <div className="panel-body">
              <div className="form-group row">
                <Label
                  htmlFor={'photo'}
                  title={'Profile Photo'}
                  className={'col-form-label col-sm-3'}
                />
                <div className="col-sm-9">
                  <Input
                    className={'form-control'}
                    input_type={'file'}
                    onChange={this.handleUserInput}
                    name={'photo'}
                    required
                  />
                  {this.errorClass(this.state.formErrors.photo) && <span className="phoneright formErrors">Photo not valid only .jpg and .png</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-9">
                  <Button
                    type={'submit'}
                    className={'btn btn-primary button'}
                    disabled={this.state.profileValid}
                    title={'Update'}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="panel-body update" id="contactForm">
          <form id="contact-form" onSubmit={this.sendMail} method="POST">
            <div className="form-group row">
              <Label
                htmlFor="fullname"
                title={'Fullname'}
                className={'col-form-label col-sm-2'}
              />
              <div className="col-sm-10">
                <Input
                  input_type={'text'}
                  value={this.state.userData.name}
                  onChange={this.handleUserInput}
                  readOnly
                  name={'fullname'}
                  className="form-control"
                  id="fullname"
                />
                {this.errorClass(this.state.formErrors.fullname) && <span className="phoneright formErrors">Read Only Field!</span>}
              </div>
            </div>
            <div className="form-group row">
              <Label
                htmlFor="email"
                title={'Email'}
                className={'col-form-label col-sm-2'}
              />
              <div className="col-sm-10">
                <Input
                  input_type={'text'}
                  value={this.state.userData.emailId}
                  onChange={this.handleUserInput}
                  readOnly
                  name={'email'}
                  className="form-control"
                  id="email"
                />
                {this.errorClass(this.state.formErrors.email) && <span className="phoneright formErrors">Read Only Field!</span>}
              </div>
            </div>
            <div className="form-group row">
              <Label
                htmlFor="subject"
                title={'Subject'}
                className={'col-form-label col-sm-2'}
              />
              <div className="col-sm-10">
                <Input
                  input_type={'text'}
                  value={this.state.subject}
                  onChange={this.handleUserInput}
                  readOnly
                  name={'subject'}
                  className="form-control"
                  id="subject"
                />
              </div>
            </div>
            <div className="form-group row">
              <Label
                htmlFor={'message'}
                title={'Message'}
                className={'col-sm-2 col-form-label'}
              />
              <div className="col-sm-10">
                <Textarea
                  className="form-control"
                  rows="5"
                  onChange={this.handleUserInput}
                  value={this.state.message}
                  id="message"
                  name="message"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-9">
                <Button
                  type={'submit'}
                  className={'btn btn-primary button'}
                  title={'Send Mail'}
                  disabled={true}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="panel-footer">
          <button onClick={this.mailForm} className="btn btn-sm btn-primary" type="button" data-toggle="tooltip"
            data-original-title="Send message to user"><i className="glyphicon glyphicon-envelope"></i></button>
          <span className="pull-right">
            <button onClick={this.updateDetails} className="btn btn-sm btn-warning" type="button" data-toggle="tooltip"
              data-original-title="Edit this user"><i className="glyphicon glyphicon-edit"></i></button>
            <button className="space btn btn-sm btn-danger" type="button" data-toggle="tooltip"
              data-original-title="Remove this user"><i className="glyphicon glyphicon-remove"></i></button>
          </span>
        </div>
      </div >
    )
  }
}

export default Profile;