/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jobAction from '../../redux/addJob/jobActions';
import notifAction from '../../redux/notifications/notifAction';

export default class NotificationFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mails: [] // List of all shortlisted jobs of all companies
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.notifications !== nextState.mails) {
      return {
        mails: nextProps.notifications
      };
    }
    return null;
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { name } = user;
    dispatch(notifAction.getNotifications(name));
  }

  componentDidUpdate(prevProps) {
    const { notifications } = this.props;
    if (notifications !== prevProps.notifications) {
      this.props.updateNotificationCount(notifications.length);
    }
  }

  render() {
    const { mails } = this.state;
    const { user, authenticated } = this.props;
    return (
      <div>
        {authenticated &&
          mails &&
          mails.map((item) => {
            if (item.status === 'Shortlisted') {
              return (
                <p key={item.date.toString()} className="mail">
                  Hi! {user.name}, you have been {`${item.status} `}
                  in {item.company} for the position of {item.designation}. So,
                  we are pleased to inform you to be prepared for the interview
                  which is going to be held at {item.company},{item.city} office
                  on {item.date}.
                </p>
              );
            }
            if (item.status === 'Selected') {
              return (
                <p key={item.date.toString()} className="mail">
                  Hi! {user.name}, your application has been {`${item.status} `}
                  for the position of {item.designation} in {item.company}. So,
                  please sit back and wait for further notification
                </p>
              );
            }
          })}
      </div>
    );
  }
}

NotificationFactory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.oneOfType([PropTypes.array]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateNotificationCount: PropTypes.func.isRequired
};
