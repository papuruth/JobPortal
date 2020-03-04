import { connect } from 'react-redux';
import Title from '../components/chat/Title';

function mapStateToProps(state) {
  const { users } = state.Users;
  const { onlineUser } = state.getOnlineUser;
  return {
    users,
    onlineUser
  };
}

const connectedChatTitle = connect(mapStateToProps)(Title);
export default connectedChatTitle;
