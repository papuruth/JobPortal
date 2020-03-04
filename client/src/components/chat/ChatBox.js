/* eslint-disable react/prop-types */
import React from 'react';
import Title from '../../redux-containers/chattitle';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
// import PropTypes from 'prop-types';

/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
    const timeout = null;
  }

  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  sendMessageLoading(sender, senderAvatar, message) {
    this.setState({ isLoading: true });
    this.props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 400);
  }

  render() {
    return (
      <div className="chatApp__conv">
        <Title receiver={this.props.receiver} />
        <MessageList owner={this.props.owner} messages={this.props.messages} />
        <div className="chatApp__convSendMessage clearfix">
          <TypingIndicator
            owner={this.props.owner}
            isTyping={this.props.isTyping}
          />
          <ChatInput
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            ownerAvatar={this.props.ownerAvatar}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
            typing={this.props.typing}
            resetTyping={this.props.resetTyping}
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
