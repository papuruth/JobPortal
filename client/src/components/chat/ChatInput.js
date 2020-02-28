/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Smile } from 'react-feather';
// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
export default class ChatInput extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}

	handleSendMessage(event) {
		event.preventDefault();
		/* Disable sendMessage if the message is empty */
		if( this.messageInput.value.length > 0 ) {
			this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
			/* Reset input after send */
			this.messageInput.value = '';
		}
	}

	handleTyping(event) {
		/* Tell users when another user has at least started to write */
		if( this.messageInput.value.length > 0 ) {
			this.props.typing(this.ownerInput.value);
		}
		else {
			/* When there is no more character, the user no longer writes */
			this.props.resetTyping(this.ownerInput.value);
		}
	}

	render() {
		/* If the chatbox state is loading, loading class for display */
		const loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
		const sendButtonIcon = <i className="fa fa-send" style={{fontSize: '20px'}}></i>;
		return (
  <form onSubmit={this.handleSendMessage}>
    <input
      type="hidden"
      ref={owner => (this.ownerInput = owner)}
      value={this.props.owner}
    />
    <input
      type="hidden"
      ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
      value={this.props.ownerAvatar}
    />
    <button type="button" className="toggle-emoji">
      <Smile />
    </button>
    <input
      type="text"
      ref={message => (this.messageInput = message)}
      className="chatApp__convInput"
      placeholder="Type a message"
      onKeyDown={this.handleTyping}
      onKeyUp={this.handleTyping}
      tabIndex="0"
    />
    <div className={`chatApp__convButton ${  loadingClass}`} onClick={this.handleSendMessage}>
      {sendButtonIcon}
    </div>
  </form>
		);
	}
}