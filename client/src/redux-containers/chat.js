import { connect } from 'react-redux';
import ChatApp from '../components/chat/ChatApp';

function mapStateToProps(state) {
  const { chats } = state.getMessage;
  return {
    chats
  };
}

const connectedChatApp = connect(mapStateToProps)(ChatApp);
export default connectedChatApp;
