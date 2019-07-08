import React from 'react';
import { Link } from 'react-router-dom'
import male from '../images/male.jpg'
import female from '../images/female.png'
import isLoggedIn from '../isLoggedIn'
import { userActions } from '../redux/user/userActions'
import { jobAction } from '../redux/addJob/jobActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      mails: [],  // List of all shortlisted jobs of all companies
      appliedJobs: [], // List of all applied jobs by all user
      mailList: [] // Store mails by filtering on company and user details
    }
  }

  getAppliedList = (event) => {
    event.preventDefault();
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(jobAction.getAppliedJob(this.state.currentUser.name));
    const { currentUser, mails, appliedjobs } = this.props;
    this.setState({
      currentUser: currentUser,
      mails: mails,
      appliedJobs: appliedjobs
    }, () => {
      let lengthMail = 0;
      try {
        this.state.appliedJobs.map((job) => {
          this.state.mails.map((item) => {
            if (item.company === job.jobDetails.company && item.name === this.state.currentUser.name && item.jobId === job._id) {
              this.setState({
                lengthMail: ++lengthMail
              })
            }
            return true;
          })
          return true;
        })
      } catch (error) {
        console.log(error.message)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, mails, appliedjobs } = nextProps
    this.setState({
      currentUser: currentUser,
      mails: mails,
      appliedJobs: appliedjobs
    }, () => {
      let lengthMail = 0;
      try {
        this.state.appliedJobs.map((job) => {
          this.state.mails.map((item) => {
            if (item.company === job.jobDetails.company && item.name === this.state.currentUser.name && item.jobId === job._id) {
              this.setState({
                lengthMail: ++lengthMail,
                imageHash: Date.now()
              })
            }
            return true;
          })
          return true;
        })
      } catch (error) {
        console.log(error.message)
      }
    })
  }

  // currentUser = JSON.parse(localStorage.getItem('currentUser'));
  logout = () => {
    userActions.logout()
    this.props.history.push('/')
  }

  showMail = () => {
    document.getElementById('mail').style.display = 'block'
  }

  hideMail = () => {
    document.getElementById('mail').style.display = 'none'
  }

  fetchAllUser = (e) => {
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers());
  }

  render() {
    let imageUrl;
    if (isLoggedIn()) {
      imageUrl = 'https://jobportalmern.herokuapp.com'.concat(this.state.currentUser.image)
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div id="mail" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.hideMail}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>Notifications</h3>
            </header>
            <div className="w3-container mail">
              {
                isLoggedIn() && this.state.appliedJobs !== null && this.state.mails && this.state.appliedJobs.map((job) => {
                  return (
                    this.state.mails.map((item, index) => {
                      if (item.company === job.jobDetails.company && item.name === this.state.currentUser.name && item.jobId === job._id && item.status === 'Shortlisted') {
                        return (
                          <p key={index} className="mail">Hi! {this.state.currentUser.name}, you have been {item.status + ' '}
                            in {item.company} for the position of {item.designation}. So, we are pleased to inform
                            you to be prepared for the interview which is going to be held at {item.company},
                             {item.city} office on {item.date}.
                          </p>
                        );
                      }
                      if (item.company === job.jobDetails.company && item.name === this.state.currentUser.name && item.jobId === job._id && item.status === 'Selected') {
                        return (
                          <p key={index} className="mail">Hi! {this.state.currentUser.name}, your application has been {item.status + ' '}
                            for the position of {item.designation} in {item.company}. So, please sit back
                           and wait for further notification.
                          </p>
                        );
                      }
                      return false;
                    })
                  )
                })
              }
            </div>
            <footer className="w3-container w3-teal">
              <p></p>
            </footer>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand"><i className="fa fa-free-code-camp" aria-hidden="true"></i> jobportal</Link>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li className="active"><Link to="/">Home</Link></li>
                  {
                    isLoggedIn() && this.state.currentUser.role === 1 && <li id="applied"><Link to="/appliedlist">Applied List</Link></li>
                  }
                  {
                    isLoggedIn() && this.state.currentUser.role === 2 && <li id="applied"><Link to="/appliedlist">Applied List</Link></li>
                  }
                  {
                    isLoggedIn() && this.state.currentUser.role === 2 &&
                    <li onClick={this.showMail}>
                      <Link to="#">
                        <i className="fa fa-bell" aria-hidden="true" style={{ fontSize: '20px' }}></i>
                        {this.state.lengthMail > 0 &&
                          <span className="button__badge">
                            {this.state.lengthMail}
                          </span>
                        }
                      </Link>
                    </li>
                  }
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  {

                    !isLoggedIn() && <li id="register"><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                  }
                  {
                    !isLoggedIn() && <li id="login"><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                  }
                  {
                    isLoggedIn() && this.state.currentUser.role !== 2 &&
                    <li id="addjob"><Link to="/addjob"><i className="fa fa-plus" aria-hidden="true" style={{ fontSize: '25px' }}></i></Link></li>
                  }
                  {
                    isLoggedIn() && this.state.currentUser.role === 0 &&
                    <li id="manageuser"><Link to="/manageusers" onClick={this.fetchAllUser}><i className="fa fa-users" aria-hidden="true" style={{ fontSize: '25px' }}></i></Link></li>
                  }
                  {isLoggedIn() &&
                    <li>
                      <Link to="/profile">
                        {
                          !this.state.currentUser.image && this.state.currentUser.gender === 'Male' && <img className="headImage" src={male} alt="Upload Pic" />
                        }
                        {
                          !this.state.currentUser.image && this.state.currentUser.gender === 'Female' && <img className="headImage" src={female} alt="Upload Pic" />
                        }
                        {
                          this.state.currentUser.image && <img className="headImage" src={`${imageUrl}?${this.state.imageHash}`} alt="Upload Pic" />
                        }
                        &nbsp;Hi! {this.state.currentUser.name}
                      </Link>
                    </li>
                  }
                  {
                    isLoggedIn() && <li><Link to="/" onClick={this.logout}><i className="fa fa-sign-out"></i> Logout</Link></li>
                  }
                </ul>
              </div >
            </div>
          </div>
        </div>
      </nav >

    );
  }
}

export default Header