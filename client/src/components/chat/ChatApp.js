import React from 'react';
import io from 'socket.io-client';
import config from '../../config';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { chatActions } from '../../redux/chat/chatActions';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      messages: []
    })
    // set the initial state of messages so that it is not undefined on load
    this.state = {
      messages: [],
      user: JSON.parse(localStorage.getItem('currentUser'))
    };
    // Connect to the server
    this.socket = io(config.api, { query: `username=${this.state.user.name}` }, { transports: ['websocket', 'polling'] }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });

    const sender = this.state.user.name;
    const receiver = this.props.username;
    const { dispatch } = this.props;
    dispatch(chatActions.getMessages(sender, receiver))
  }

  componentWillReceiveProps(props) {
    try {
      const { chats } = props;
      const sender = this.state.user.name;
      const receiver = this.props.username;
      let senderMessage = [];
      let receiverMessage = []
      chats.filter((item, index) => {
        if (item.sender === sender && item.receiver === receiver) {
          item.messages.map((chat, innerIndex) => {
            senderMessage[innerIndex] = { 'username': sender, 'to': receiver, 'message': chat[sender], 'date': chat['date'], 'fromMe': true };
            this.addMessage(senderMessage[innerIndex])
            return true;
          })
        }
        if (item.sender === receiver && item.receiver === sender) {
          item.messages.map((chat, innerIndex) => {
            receiverMessage[innerIndex] = { 'username': receiver, 'to': sender, 'date': chat['date'], 'message': chat[receiver] };
            this.addMessage(receiverMessage[innerIndex])
            return true;
          })
        }
        return false;
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  sendHandler = (message) => {
    if (message === true) {
      this.socket.emit('typing')
      this.socket.on('typing', data => {
        this.props.handleTyping(message, data)
        return () => {
          this.socket.disconnect();
        };
      })
    } else {
      const messageObject = {
        username: this.state.user.name,
        to: this.props.username,
        message
      };

      // Dispatch the messages to redux action to be saved into db
      const sender = this.state.user.name;
      const receiver = this.props.username;
      const date = new Date().toString();
      const { dispatch } = this.props;
      dispatch(chatActions.saveMessage(sender, receiver, message, date))
      // Emit the message to the server
      this.socket.emit('client:message', messageObject);

      messageObject.fromMe = true;
      this.addMessage(messageObject);
    }
  }

  addMessage = (message) => {
    // Append the message to the component state
    const messages = this.state.messages;
    const oldMessageLength = messages.length;
    messages.push(message);
    messages.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    this.setState({ messages });
    this.props.handleTyping(false, false)
    return true;
  }

  render() {
    // Here we want to render the main chat application components
    return (
      <div className="container chat">
        <h3 className="chatTitle">{this.props.username}</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}

export default ChatApp;
