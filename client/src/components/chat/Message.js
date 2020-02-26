import React from 'react';
import PropTypes from 'prop-types';
// This component displays an individual message.
// We should have logic to display it on the right if the user sent the
// message, or on the left if it was received from someone else.
class Message extends React.PureComponent {
  render() {
    // Display the message text and sender's name
    const { fromMe, username, message } = this.props;

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className={`message ${fromMe ? 'from-me' : ''}`}>
            <div className="username">{username}</div>
            <div className="message-body">{message}</div>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  fromMe: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default Message;
