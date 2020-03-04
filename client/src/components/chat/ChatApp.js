/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import chatActions from '../../redux/chat/chatActions';
import ChatBox from './ChatBox';
import detectURL from './detectURL';
import userActions from '../../redux/user/userActions';

export default class ChatApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chats: [],
      onlineUser: [],
      messages: [],
      isTyping: [],
      user: JSON.parse(localStorage.getItem('currentUser'))
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chats !== prevState.chats) {
      return {
        chats: nextProps.chats
      };
    }
    return null;
  }

  componentDidMount() {
    const { user } = this.props;
    const sender = this.state.user.name;
    const receiver = user;
    const { dispatch } = this.props;

    // // Connect to the server
    // this.socket = io.connect(
    //   config.nodeBaseUrl,
    //   { query: `username=${this.state.user.name}` },
    //   { transports: ['websocket'] },
    //   {
    //     reconnection: true,
    //     reconnectionDelay: 1000,
    //     reconnectionDelayMax: 5000,
    //     reconnectionAttempts: 99999
    //   }
    // );

    // Listen for messages from the server
    this.props.socket.on('server:message', (message) => {
      this.addMessage(message);
    });

    // Get active status of receiver
    this.defaultTimer = setTimeout(() => {
      dispatch(chatActions.getOnlineUser(this.props.user));
    }, 100);

    // Get all messages for the sender and receiver
    dispatch(chatActions.getMessages(sender, receiver));

    // Get the details of receiver
    dispatch(userActions.getAllUsers(user));
    this.props.socket.on('isonline', (data) => {
      if (data) {
        this.onlineTimer = setTimeout(() => {
          dispatch(chatActions.getOnlineUser(this.props.user));
        }, 0);
      }
    });
    this.props.socket.on('isoffline', (data) => {
      if (data) {
        this.offlineTimer = setTimeout(() => {
          dispatch(chatActions.getOnlineUser(this.props.user));
        }, 0);
      }
    });
  }

  componentDidUpdate(prevProps) {
    try {
      const { chats, user } = this.props;
      const sender = this.state.user.name;
      const receiver = user;
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

  componentWillUnmount() {
    if (this.onlineTimer) {
      clearTimeout(this.onlineTimer);
    }

    if (this.offlineTimer) {
      clearTimeout(this.offlineTimer);
    }

    if(this.defaultTimer) {
      clearTimeout(this.defaultTimer);
    }
  }

  /* adds a new message to the chatroom */
  sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      const messageFormat = detectURL(message);
      const newMessageItem = {
        id: this.state.messages.length + 1,
        sender,
        receiver: this.props.user,
        senderAvatar,
        message: messageFormat,
        date: new Date().toString()
      };
      this.addMessage(newMessageItem);
      // Dispatch the messages to redux action to be saved into db
      const { dispatch } = this.props;
      dispatch(chatActions.saveMessage(newMessageItem));
      // Emit the message to the server
      this.props.socket.emit('client:message', newMessageItem);
      this.resetTyping(sender);
    }, 400);
  };

  /* updates the writing indicator if not already displayed */
  typing = (writer) => {
    if (!this.state.isTyping[writer]) {
      const stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      this.props.socket.emit('typing', true);
      this.props.socket.on('typing', (data) => {
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
    this.props.socket.emit('typing', false);
  };

  render() {
    const { user } = this.state;
    const { name, image } = user;
    const { messages } = this.state;
    const { isTyping } = this.state;
    /* creation of a chatbox for each user present in the chatroom */
    return (
      <div className="chatApp__room">
        {this.props.chats && this.props.users && (
          <ChatBox
            key={name}
            owner={name}
            receiver={this.props.user}
            ownerAvatar={image}
            sendMessage={this.sendMessage}
            typing={this.typing}
            resetTyping={this.resetTyping}
            messages={messages}
            isTyping={isTyping}
          />
        )}
      </div>
    );
  }
}
