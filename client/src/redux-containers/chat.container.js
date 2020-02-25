import { connect } from 'react-redux';
import ChatContainer from '../components/chat/chat.container';

function mapStatToProps(state) {
  const { appliedjobs } = state.getAppliedJobs;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return {
    appliedjobs,
    currentUser
  };
}

const connectedChatContainer = connect(mapStatToProps)(ChatContainer);
export default connectedChatContainer;
