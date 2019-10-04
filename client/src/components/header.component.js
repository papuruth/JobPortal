import React from 'react';
import { Link } from 'react-router-dom'
import male from '../images/male.jpg'
import female from '../images/female.png'
import isLoggedIn from '../isLoggedIn'
import { userActions } from '../redux/user/userActions'
import { jobAction } from '../redux/addJob/jobActions';
import config from '../config';
import { ChatApp } from '../containers/chat';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      mails: [],  // List of all shortlisted jobs of all companies
      appliedJobs: [], // List of all applied jobs by all user
      lengthMail: 0,
      visibleChat: false
    }
  }

  componentDidMount() {
    console.log('incdm')
    const { dispatch } = this.props
    dispatch(jobAction.getAppliedJob(this.state.currentUser.name));
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

  logout = () => {
    userActions.logout()
    this.props.history.push('/')
  }

  showMail = (e) => {
    e.preventDefault();
    document.getElementById('mail').style.display = 'block'
  }

  hideMail = (e) => {
    e.preventDefault();
    document.getElementById('mail').style.display = 'none'
  }

  fetchAllUser = (e) => {
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers());
  }

  renderUserList = (props) => {
    var usersArray = [];
    props.data.map((job) => {
      if (job.userDetails.name === this.state.currentUser.name) {
        usersArray.push(job.jobDetails.company)
      } else {
        if(job.jobDetails.company === this.state.currentUser.name) {
          usersArray.push(job.userDetails.name)
        }
      }
    })
    usersArray = [... new Set(usersArray)]
    return usersArray.map((user, index) => {
      return <li className="chatUsers list-group-item" key={index} title={user} onClick={this.openChat}>{user}<span className="messages-count" id={user}>{this.state.lengthMail}</span></li>
    })
  }

  handleTypingData = (message, data) => {
    if (message === false && data === false) {
      this.setState({
        message: false
      })
    } else {
      this.setState({
        message: message,
        userTyping: data
      })
    }
  }
  openChat = (e) => {
    e.preventDefault();
    const username = e.currentTarget.title;
    this.setState((state) => {
      return {
        username: state.usename = username,
        visibleChat: !state.visibleChat
      }
    }, () => {
      document.getElementById('chatBox').style.display = 'block';
    })
  }

  closeChat = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        visibleChat: false
      }
    }, () => {
      document.getElementById('chatBox').style.display = 'none';
    })
  }


  render() {
    let imageUrl;
    if (isLoggedIn()) {
      imageUrl = config.firebase_url.concat(this.state.currentUser.image)
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div id="chatBox" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.closeChat}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>Chat</h3>
              {this.state.message && <i><p>{this.state.userTyping.username} is typing...</p></i>}
            </header>
            <div className="w3-container mail">
              {this.state.username && this.state.visibleChat ? <ChatApp handleTyping={this.handleTypingData} username={this.state.username} /> : ''}
            </div>
          </div>
        </div>
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
                <Link to="/" className="navbar-brand"><i className="fab fa-free-code-camp" aria-hidden="true"></i> jobportal</Link>
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
                  {
                    isLoggedIn() &&
                    <li class="dropdown">
                      <span class="far fa-comment-alt dropdown-toggle" data-toggle="dropdown" style={{ fontSize: '20px' }}><span class="caret"></span></span>
                      <ul class="dropdown-menu1 list-group">
                        <this.renderUserList data={this.state.appliedJobs} />
                      </ul>
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
                          this.state.currentUser.image && <img className="headImage" src={`${imageUrl}?alt=media&${Date.now()}`} alt="Upload Pic" />
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