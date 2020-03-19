import { connect } from 'react-redux';
import ChatContainer from '../components/chat/chat.container';

function mapStatToProps(state) {
  const { appliedjobs } = state.getAppliedJobs;
  const {user} = state.session;
  return {
    appliedjobs,
    user
  };
}

const connectedChatContainer = connect(mapStatToProps)(ChatContainer);
export default connectedChatContainer;
