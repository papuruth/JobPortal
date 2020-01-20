import { connect } from 'react-redux';
import ManageUser from '../components/manageuser.component';

function mapStateToProps(state) {
  const { users } = state.Users;
  return {
    users,
  };
}
const connectedManageUser = connect(mapStateToProps)(ManageUser);
export default connectedManageUser;
