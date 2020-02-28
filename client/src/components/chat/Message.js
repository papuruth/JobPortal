/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
// This component displays an individual message.
// We should have logic to display it on the right if the user sent the
// message, or on the left if it was received from someone else.
export default class MessageItem extends React.Component {
  render() {
    /* message position formatting - right if I'm the author */
    const messagePosition =
      this.props.owner === this.props.sender
        ? 'chatApp__convMessageItem--right'
        : 'chatApp__convMessageItem--left';
    return (
      <div className={`chatApp__convMessageItem ${messagePosition} clearfix`}>
        {this.props.owner !== this.props.sender && (
          <img
            src={this.props.senderAvatar}
            alt={this.props.sender}
            className="chatApp__convMessageAvatar"
          />
        )}
        <div className="chatApp__convMessageValue">
          {this.props.message}
          <br />
          <span className="chatApp__senderTime">{this.props.date}</span>
        </div>
      </div>
    );
  }
}
