import { connect } from 'react-redux';
import ChatApp from '../components/chat/ChatApp';

function mapStateToProps(state) {
  const { chats } = state.getMessage;
  const { users } = state.Users;
  const { user } = state.session;
  const { onlineUser } = state.getOnlineUser;
  return {
    chats,
    users,
    user,
    onlineUser
  };
}

const connectedChatApp = connect(mapStateToProps)(ChatApp);
export default connectedChatApp;
