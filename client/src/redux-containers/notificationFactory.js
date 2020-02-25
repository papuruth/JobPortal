import { connect } from 'react-redux';
import NotificationFactory from '../components/generalComponents/notification.factory';

function mapStateToProps(state) {
  const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'));
  const { notifications } = state.getNotifications;
  return {
    appliedjobs,
    notifications
  };
}

const connectedNotificationFactory = connect(mapStateToProps)(NotificationFactory);
export default connectedNotificationFactory;
