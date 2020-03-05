import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jobAction from '../../redux/addJob/jobActions';
import notifAction from '../../redux/notifications/notifAction';
import isLoggedIn from '../../isLoggedIn';

export default class NotificationFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mails: [], // List of all shortlisted jobs of all companies
      appliedJobs: [] // List of all applied jobs by all user
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.notifications !== nextState.mails) {
      return {
        mails: nextProps.notifications
      };
    }
    if (nextProps.appliedjobs !== nextState.appliedJobs) {
      return {
        appliedJobs: nextProps.appliedjobs
      };
    }
  }

  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    const { name } = currentUser;
    dispatch(jobAction.getAppliedJob(name));
    dispatch(notifAction.getNotifications());
  }

  updateNotificationCount = (count) => {
    this.props.updateNotificationCount(count)
  }

  render() {
    const { appliedJobs, mails } = this.state;
    const { currentUser } = this.props;
    let count = 0;
    return (
      <div>
        {isLoggedIn() &&
          appliedJobs &&
          mails &&
          appliedJobs.map((job) => {
            return mails.map((item, index) => {
              if (
                item.company === job.jobDetails.company &&
                item.name === currentUser.name &&
                item.jobId === job._id &&
                item.status === 'Shortlisted'
              ) {
                count =+ 1;
                return (
                  <p key={item.toString()} className="mail">
                    Hi! {currentUser.name}, you have been {`${item.status} `}
                    in {item.company} for the position of {item.designation}.
                    So, we are pleased to inform you to be prepared for the
                    interview which is going to be held at {item.company},
                    {item.city} office on {item.date} {count}.
                  </p>
                );
              }
              if (
                item.company === job.jobDetails.company &&
                item.name === currentUser.name &&
                item.jobId === job._id &&
                item.status === 'Selected'
              ) {
                count =+ 1;
                this.updateNotificationCount(count)
                return (
                  <p key={item.toString()} className="mail">
                    Hi! {currentUser.name}, your application has been{' '}
                    {`${item.status} `}
                    for the position of {item.designation} in {item.company}.
                    So, please sit back and wait for further notification. {count}
                  </p>
                );
              }
              return false;
            });
          })}
      </div>
    );
  }
}

NotificationFactory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.oneOfType([PropTypes.object]).isRequired,
  appliedjobs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateNotificationCount: PropTypes.func.isRequired
};
