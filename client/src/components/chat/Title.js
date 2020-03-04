/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';
import npp from '../../images/npp.png';

export default class Title extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTime: '',
      lastSeenMinutes: 0,
      lastSeenHours: 0,
      lastSeenSeconds: 0,
      lastSeenDays: 0,
      lastSeenWeeks: 0,
      lastSeenMonths: 0,
      lastSeenYears: 0,
      lastSeenTime: ''
    };
  }

  componentDidMount() {
    this.setState((stste) => {
      return {
        activeTime: moment(new Date(), 'HH:mm')
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { onlineUser } = this.props;
    try {
      if (onlineUser !== prevProps.onlineUser) {
        const newTime = moment(new Date(), 'HH:mm');
        const duration = moment.duration(
          newTime.diff(onlineUser[0].disconnectTime)
        );

        const durationInYears = parseInt(duration.years(), 10);
        const durationInMonths = parseInt(duration.months(), 10);
        const durationInDays = parseInt(duration.days(), 10);
        const durationInWeeks = parseInt(duration.asWeeks(), 10);
        const durationInHours = parseInt(duration.hours(), 10);
        const durationInMinutes = parseInt(duration.minutes(), 10);
        const durationInSeconds = parseInt(duration.seconds(), 10);
        const durationInTime = durationInHours > 1 ? moment(onlineUser[0].disconnectTime).format('HH:mm') : '';
        this.setState({
          activeTime: moment(onlineUser[0].disconnectTime, 'HH:mm'),
          lastSeenSeconds: durationInSeconds,
          lastSeenMinutes: durationInMinutes,
          lastSeenHours: durationInHours,
          lastSeenDays: durationInDays,
          lastSeenWeeks: durationInWeeks,
          lastSeenMonths: durationInMonths,
          lastSeenYears: durationInYears,
          lastSeenTime: durationInTime
        });
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  showUserInfo = () => {
    const { users } = this.props;
    document.getElementById('showUserDetail').style.display = 'block';
  };

  closeUserDetail = () => {
    document.getElementById('showUserDetail').style.display = 'none';
  };

  lastSeen = () => {
    const {
      lastSeenMinutes,
      lastSeenSeconds,
      lastSeenYears,
      lastSeenHours,
      lastSeenDays,
      lastSeenMonths,
      lastSeenWeeks,
      lastSeenTime
    } = this.state;
    if (lastSeenHours > 0 && lastSeenMinutes < 59) {
      return `last seen ${
        lastSeenHours > 1 ? `today at ${lastSeenTime}` : 'an hour'
      } ago`;
    }
    if (lastSeenMinutes > 0 && lastSeenSeconds < 59) {
      return `last seen ${
        lastSeenMinutes > 1 ? `today ${lastSeenMinutes} minutes` : 'a minute'
      } ago`;
    }
    if (!lastSeenHours && !lastSeenMinutes && lastSeenSeconds) {
      return `last seen ${
        lastSeenSeconds > 1 ? `today ${lastSeenSeconds} seconds` : 'a second'
      } ago`;
    }
    return 'last seen recently';
  };

  render() {
    const { users } = this.props;
    return (
      <div className="chatApp__convTitle">
        <img
          src={
            users
              ? config.firebase_url.concat(users[0].image).concat('?alt=media')
              : npp
          }
          height="40px"
          width="40px"
          alt=""
          className="chatApp__TitleAvatar"
        />
        <div
          onClick={this.showUserInfo}
          role="button"
          tabIndex={0}
          onKeyDown={this.updateStatus}
          style={{ display: 'inline' }}
        >
          <span className="chatApp_Title">{this.props.receiver}</span>
          <span className="chatApp_activeStatus">
            {this.props.onlineUser.length &&
            this.props.onlineUser[0].status === 'Online' ? (
              this.props.onlineUser[0].status
            ) : (
              <this.lastSeen />
            )}
          </span>
        </div>
        {/* Show User Detail Block Begin */}
        <div
          id="showUserDetail"
          className="chatApp_w3-modal w3-animate-opacity"
        >
          <div className="chatApp_w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span
                onClick={this.closeUserDetail}
                onKeyPress={this.onKeyPress}
                role="button"
                tabIndex={0}
                className="w3-button w3-large w3-display-topright"
              >
                &times;
              </span>
              <h3>User Details</h3>
            </header>
            <div className="panel chatApp_panel-primary w3-container">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    {this.props.users &&
                      !this.props.users[0].image &&
                      this.props.users[0].gender === 'Male' && (
                        <img
                          className="img-circle"
                          src={npp}
                          alt="Upload Pic"
                        />
                      )}
                    {this.props.users &&
                      !this.props.users[0].image &&
                      this.props.users[0].gender === 'Female' && (
                        <img
                          className="img-circle"
                          src={npp}
                          alt="Upload Pic"
                        />
                      )}
                    {this.props.users && this.props.users[0].image && (
                      <img
                        className="img-circle"
                        src={`${config.firebase_url +
                          this.props.users[0].image}?alt=media&`}
                        alt="Upload Pic"
                      />
                    )}
                  </div>
                  <div className="col-md-8 col-lg-8">
                    {this.props.users && (
                      <strong>{this.props.users[0].name} </strong>
                    )}
                    <br />
                    {this.props.users && (
                      <div>
                        <dl>
                          <dt>UID</dt>
                          <dd>{this.props.users[0]._id}</dd>
                        </dl>
                        <dl>
                          <dt>Fullname</dt>
                          <dd>{this.props.users[0].name}</dd>
                        </dl>
                        <dl>
                          <dt>Email</dt>
                          <dd>{this.props.users[0].emailId}</dd>
                        </dl>
                        <dl>
                          <dt>Mobile No.</dt>
                          <dd>{this.props.users[0].phone}</dd>
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  receiver: PropTypes.string.isRequired
};
