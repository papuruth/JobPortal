/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Smile } from 'react-feather';
import { Picker, NimblePicker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
export default class ChatInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showEmojiPicker: false
    };
  }

  toggleEmojiPicker = () => {
    this.setState((state) => {
      return {
        showEmojiPicker: !state.showEmojiPicker
      };
    });
  };

  addEmoji = (emoji) => {
    this.messageInput.value = `${this.messageInput.value}${emoji.native}`;
    this.setState({
      showEmojiPicker: false
    });
    this.messageInput.focus();
  };

  handleSendMessage = (event) => {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if (this.messageInput.value.length > 0) {
      this.props.sendMessageLoading(
        this.ownerInput.value,
        this.ownerAvatarInput.value,
        this.messageInput.value
      );
      /* Reset input after send */
      this.messageInput.value = '';
      this.messageInput.focus();
    }
  };

  handleTyping = (event) => {
    /* Tell users when another user has at least started to write */
    if (this.messageInput.value.length > 0) {
      this.props.typing(this.ownerInput.value);
    } else {
      /* When there is no more character, the user no longer writes */
      this.props.resetTyping(this.ownerInput.value);
    }
  };

  render() {
    /* If the chatbox state is loading, loading class for display */
    const loadingClass = this.props.isLoading
      ? 'chatApp__convButton--loading'
      : '';
    const sendButtonIcon = (
      <i className="fa fa-send" style={{ fontSize: '20px' }}></i>
    );
    const { showEmojiPicker } = this.state;
    return (
      <form onSubmit={this.handleSendMessage}>
        <ul className="chat-messages">
          {showEmojiPicker ? (
            <Picker set="emojione" onSelect={this.addEmoji} />
          ) : null}
        </ul>
        <input
          type="hidden"
          ref={(owner) => (this.ownerInput = owner)}
          value={this.props.owner}
        />
        <input
          type="hidden"
          ref={(ownerAvatar) => (this.ownerAvatarInput = ownerAvatar)}
          value={this.props.ownerAvatar}
        />
        <button
          type="button"
          className="toggle-emoji"
          onClick={this.toggleEmojiPicker}
        >
          <Smile />
        </button>
        <input
          type="text"
          ref={(message) => (this.messageInput = message)}
          className="chatApp__convInput"
          placeholder="Type a message"
          onKeyDown={this.handleTyping}
          onKeyUp={this.handleTyping}
          tabIndex="0"
        />
        <div
          role="button"
          tabIndex={0}
          className={`chatApp__convButton ${loadingClass}`}
          onClick={this.handleSendMessage}
        >
          {sendButtonIcon}
        </div>
      </form>
    );
  }
}
