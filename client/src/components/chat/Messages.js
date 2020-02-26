import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
    window.scrollTo(0, objDiv.scrollHeight);
  }

  render() {
    const { messages } = this.props;
    // Loop through all the messages in the state and create a Message component
    const messagesComponent = messages.map((message) => (
      <div key={message.message.concat(new Date())}>
        <Message
          key={message.message}
          username={message.username}
          message={message.message}
          fromMe={message.fromMe}
        />
      </div>
    ));

    return (
      <div className="messages" id="messageList">
        {messagesComponent}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
    .isRequired
};

export default Messages;
