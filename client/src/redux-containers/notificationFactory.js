import { connect } from 'react-redux';
import NotificationFactory from '../components/generalComponents/notification.factory';

function mapStateToProps(state) {
  const { notifications } = state.getNotifications;
  const { user, authenticated } = state.session;
  return {
    notifications,
    user,
    authenticated
  };
}

const connectedNotificationFactory = connect(mapStateToProps)(NotificationFactory);
export default connectedNotificationFactory;
