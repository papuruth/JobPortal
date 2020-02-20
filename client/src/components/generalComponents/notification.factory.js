import React from 'react';

import React, { Component } from 'react';

export class NotificationFactory extends Component {
  render() {
    return (
      <div>
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
    );
  }
}

export default NotificationFactory;
