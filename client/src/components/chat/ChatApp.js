/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import io from 'socket.io-client';
import config from '../../config';
import chatActions from '../../redux/chat/chatActions';
import ChatBox from './ChatBox';
import detectURL from './detectURL';

export default class ChatApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chats: [],
      messages: [],
      isTyping: [],
      user: JSON.parse(localStorage.getItem('currentUser'))
    };
    // Connect to the server
    this.socket = io(
      config.nodeBaseUrl,
      { query: `username=${this.state.user.name}` },
      { transports: ['websocket', 'polling'] }
    ).connect();

    // Listen for messages from the server
    this.socket.on('server:message', (message) => {
      this.addMessage(message);
    });
    const { username } = this.props;
    const sender = this.state.user.name;
    const receiver = username;
    const { dispatch } = this.props;
    dispatch(chatActions.getMessages(sender, receiver));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chats !== prevState.chats) {
      return {
        chats: nextProps.chats
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    try {
      const { chats, username } = this.props;
      const sender = this.state.user.name;
      const receiver = username;
      if (prevProps.chats !== chats) {
        chats.forEach((chat, index) => {
          if (
            (chat.sender === sender && chat.receiver === receiver) ||
            (chat.sender === receiver && chat.receiver === sender)
          ) {
            const { messages } = chat;
            messages.forEach((msg) => this.addMessage(msg));
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /* adds a new message to the chatroom */
  sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      const messageFormat = detectURL(message);
      const newMessageItem = {
        id: this.state.messages.length + 1,
        sender,
        receiver: this.props.username,
        senderAvatar,
        message: messageFormat,
        date: new Date().toString()
      };
      this.addMessage(newMessageItem);
      // Dispatch the messages to redux action to be saved into db
      const { dispatch } = this.props;
      dispatch(chatActions.saveMessage(newMessageItem));
      // Emit the message to the server
      this.socket.emit('client:message', newMessageItem);
      this.resetTyping(sender);
    }, 400);
  };

  /* updates the writing indicator if not already displayed */
  typing = (writer) => {
    if (!this.state.isTyping[writer]) {
      const stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      this.socket.emit('typing', true);
      this.socket.on('typing', (data) => {
        stateTyping[data.owner] = data.isTyping;
        this.setState({ isTyping: stateTyping });
      });
    }
  };

  addMessage = (message) => {
    this.setState((state) => {
      return {
        messages: [...state.messages, message]
      };
    });
  };

  /* hide the writing indicator */
  resetTyping = (writer) => {
    const stateTyping = this.state.isTyping;
    stateTyping[writer] = false;
    this.setState({ isTyping: stateTyping });
    this.socket.emit('typing', false);
  };

  render() {
    const { user } = this.state;
    const { name, image } = user;
    const chatBoxes = [];
    const { messages } = this.state;
    const { isTyping } = this.state;

    /* user details - can add as many users as desired */
    const users = [{ name, avatar: image }];
    /* creation of a chatbox for each user present in the chatroom */
    this.props.chats &&
      Object.keys(users).map((key) => {
        const chatUser = users[key];
        chatBoxes.push(
          <ChatBox
            key={key}
            owner={chatUser.name}
            receiver={this.props.username}
            ownerAvatar={chatUser.avatar}
            sendMessage={this.sendMessage}
            typing={this.typing}
            resetTyping={this.resetTyping}
            messages={messages}
            isTyping={isTyping}
          />
        );
      });
    return <div className="chatApp__room">{this.props.chats && chatBoxes}</div>;
  }
}
