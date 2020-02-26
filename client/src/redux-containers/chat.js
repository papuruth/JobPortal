import { connect } from 'react-redux';
import ChatApp from '../components/chat/ChatApp';

function mapStateToProps(state) {
  const { message } = state.saveMessage;
  const { chats } = state.getMessage;
  return {
    message,
    chats
  };
}

const connectedChatApp = connect(mapStateToProps)(ChatApp);
export default connectedChatApp;
