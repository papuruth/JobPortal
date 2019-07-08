import React from 'react';

// This component displays an individual message.
// We should have logic to display it on the right if the user sent the
// message, or on the left if it was received from someone else.
class Message extends React.Component {
  render() {
    // Display the message text and sender's name
    const fromMe = this.props.fromMe ? 'from-me' : '';
    return (
      <div className="row">
        <div className="col-sm-9">
          <div className={`message ${fromMe}`}>
            <div className='username'>
              {this.props.username}
            </div>
            <div className='message-body'>
              {this.props.message}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
};

export default Message;
