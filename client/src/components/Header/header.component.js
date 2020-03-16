import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Notifications from '@material-ui/icons/Notifications';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import ChatIcon from '@material-ui/icons/Chat';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import config from '../../config';
import female from '../../images/female.png';
import male from '../../images/male.jpg';
import isLoggedIn from '../../isLoggedIn';
import NotificationFactory from '../../redux-containers/notificationFactory';
import userActions from '../../redux/user/userActions';

const { $ } = window;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      lengthMail: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { currentUser } = props;
    if (currentUser !== state.currentUser) {
      return {
        currentUser
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  notificationCounter = (props) => {
    this.setState({
      lengthMail: props
    });
  };

  hideCollapse = () => {
    $('.collapse').collapse('hide');
  };

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
    const { currentUser, isMounted } = this.state;
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
              {currentUser && isMounted && (
                <NotificationFactory
                  currentUser={currentUser}
                  updateNotificationCount={this.notificationCounter}
                />
              )}
            </div>
            <footer className="w3-container w3-teal">
              <p></p>
            </footer>
          </div>
        </div>
        <div className="container-fluid mobile-container-fluid">
          <div>
            <div>
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
                <Link
                  to="/"
                  className="navbar-brand"
                  onClick={this.hideCollapse}
                >
                  <i className="fab fa-free-code-camp" aria-hidden="true"></i>{' '}
                  jobportal
                </Link>
              </div>
              <div
                className="collapse navbar-collapse"
                id="myNavbar"
                onClick={this.hideCollapse}
                role="button"
                tabIndex={0}
                onKeyPress={this.hideCollapse}
              >
                <ul className="nav navbar-nav">
                  {history.location.pathname !== '/' && (
                    <li>
                      <Link to="/" title="Home">
                        <HomeSharpIcon style={{ fontSize: 25 }} />
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 1 &&
                    history.location.pathname !== '/appliedlist' && (
                      <li>
                        <Link
                          to="/appliedlist"
                          title="Toggle applied jobs panel"
                        >
                          <ListAltIcon style={{ fontSize: 25 }} />
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 2 &&
                    history.location.pathname !== '/appliedlist' && (
                      <li title="Toggle applied jobs panel">
                        <Link to="/appliedlist">
                          <ListAltIcon style={{ fontSize: 25 }} />
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() && this.state.currentUser.role === 2 && (
                    <li title="Toggle notification panel">
                      <Link to="#" onClick={this.showMail}>
                        <Badge
                          badgeContent={this.state.lengthMail}
                          color="secondary"
                        >
                          <Notifications style={{ fontSize: 25 }} />
                        </Badge>
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() && history.location.pathname !== '/chat' && (
                    <li>
                      <Link to="/chat" title="Toggle chat panel">
                        <ChatIcon style={{ fontSize: 25 }} />
                      </Link>
                    </li>
                  )}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  {!isLoggedIn() && history.location.pathname !== '/register' && (
                    <li title="Toggle signup panel">
                      <Link to="/register">
                        <PersonIcon style={{ fontSize: 25 }} />
                      </Link>
                    </li>
                  )}
                  {!isLoggedIn() && history.location.pathname !== '/login' && (
                    <li title="Toggle login panel">
                      <Link to="/login">
                        <LockIcon style={{ fontSize: 25 }} />
                      </Link>
                    </li>
                  )}
                  {isLoggedIn() &&
                    this.state.currentUser.role !== 2 &&
                    history.location.pathname !== '/addjob' && (
                      <li id="addjob" title="Toggle add new job panel">
                        <Link to="/addjob">
                          <AddBoxIcon style={{ fontSize: 25 }} />
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() &&
                    this.state.currentUser.role === 0 &&
                    history.location.pathname !== '/manageusers' && (
                      <li id="manageuser" title="Toggle user management panel">
                        <Link to="/manageusers" onClick={this.fetchAllUser}>
                          <SupervisorAccountIcon style={{ fontSize: 25 }} />
                        </Link>
                      </li>
                    )}
                  {isLoggedIn() && (
                    <li title="Logout">
                      <button
                        type="button"
                        className="btn btn-link logout"
                        onClick={this.logout}
                      >
                        <ExitToAppIcon style={{ fontSize: 25 }} />
                      </button>
                    </li>
                  )}
                  <li title="Github repository">
                    <a
                      href="https://github.com/papuruth/JobPortal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon style={{ fontSize: 25 }} />
                    </a>
                  </li>
                  {isLoggedIn() && (
                    <li title={`${this.state.currentUser.name} profile`}>
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
                      </Link>
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
  currentUser: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

Header.defaultProps = {
  currentUser: {}
};

export default withRouter(Header);
