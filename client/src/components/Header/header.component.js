import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import male from '../../images/male.jpg';
import female from '../../images/female.png';
import jobAction from '../../redux/addJob/jobActions';
import config from '../../config';
import isLoggedIn from '../../isLoggedIn';
import userActions from '../../redux/user/userActions';
import ChatApp from '../../redux-containers/chat';
import notifAction from '../../redux/notifications/notifAction';
import NotificationFactory from '../../redux-containers/notificationFactory';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      lengthMail: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    this.setState({
      currentUser
    });
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  };

  showMail = (e) => {
    e.preventDefault();
    document.getElementById('mail').style.display = 'block';
  };

  hideMail = (e) => {
    e.preventDefault();
    document.getElementById('mail').style.display = 'none';
  };

  render() {
    const { currentUser } = this.state;
    const { history } = this.props;
    let imageUrl;
    if (isLoggedIn()) {
      imageUrl = config.firebase_url.concat(currentUser.image);
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div id="mail" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span
                onKeyPress={this.onKeyPress}
                role="button"
                tabIndex={0}
                onClick={this.hideMail}
                className="w3-button w3-large w3-display-topright"
              >
                &times;
              </span>
              <h3>Notifications</h3>
            </header>
            <div className="w3-container mail">
              {currentUser && <NotificationFactory currentUser={currentUser} />}
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
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#myNavbar"
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand">
                  <i className="fab fa-free-code-camp" aria-hidden="true"></i>{' '}
                  jobportal
                </Link>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  {history.location.pathname !== '/' && (
                    <li className="active">
                      <Link to="/">Home</Link>
                    </li>
                  )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 1 &&
                    history.location.pathname !== '/appliedlist' && (
                      <li>
                        <Link to="/appliedlist">Applied List</Link>
                      </li>
                    )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 2 &&
                    history.location.pathname !== '/appliedlist' && (
                      <li>
                        <Link to="/appliedlist">Applied List</Link>
                      </li>
                    )}
                  {isLoggedIn() && this.state.currentUser.role === 2 && (
                    <li>
                      <Link to="#">
                        <i
                          onClick={this.showMail}
                          className="fa fa-bell"
                          aria-hidden="true"
                          style={{ fontSize: '20px' }}
                        >
                        </i>
                        {this.state.lengthMail > 0 && (
                          <span className="button__badge">
                            {this.state.lengthMail}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() && history.location.pathname !== '/chat' && (
                    <li>
                      <Link to="/chat">
                        <i
                          className="far fa-comment-alt"
                          style={{ fontSize: '20px' }}
                        />
                      </Link>
                    </li>
                  )}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  {!isLoggedIn() && history.location.pathname !== '/register' && (
                    <li id="register">
                      <Link to="/register">
                        <span className="glyphicon glyphicon-user"></span> Sign
                        Up
                      </Link>
                    </li>
                  )}
                  {!isLoggedIn() && history.location.pathname !== '/login' && (
                    <li id="login">
                      <Link to="/login">
                        <span className="glyphicon glyphicon-log-in"></span>{' '}
                        Login
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() &&
                    this.state.currentUser.role !== 2 &&
                    history.location.pathname !== '/addjob' && (
                      <li id="addjob">
                        <Link to="/addjob">
                          <i
                            className="fa fa-plus"
                            aria-hidden="true"
                            style={{ fontSize: '25px' }}
                          >
                          </i>
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 0 &&
                    history.location.pathname !== '/manageusers' && (
                      <li id="manageuser">
                        <Link to="/manageusers" onClick={this.fetchAllUser}>
                          <i
                            className="fa fa-users"
                            aria-hidden="true"
                            style={{ fontSize: '25px' }}
                          >
                          </i>
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() && (
                    <li>
                      <Link to="/profile">
                        {!this.state.currentUser.image &&
                          this.state.currentUser.gender === 'Male' && (
                            <img
                              className="headImage"
                              src={male}
                              alt="Upload Pic"
                            />
                          )}
                        {!this.state.currentUser.image &&
                          this.state.currentUser.gender === 'Female' && (
                            <img
                              className="headImage"
                              src={female}
                              alt="Upload Pic"
                            />
                          )}
                        {this.state.currentUser.image && (
                          <img
                            className="headImage"
                            src={`${imageUrl}?alt=media&${Date.now()}`}
                            alt="Upload Pic"
                          />
                        )}
                        &nbsp;Hi! {this.state.currentUser.name}
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() && (
                    <li>
                      <button
                        type="button"
                        className="btn btn-link logout"
                        onClick={this.logout}
                      >
                        <i className="fa fa-sign-out"></i> Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default withRouter(Header);
