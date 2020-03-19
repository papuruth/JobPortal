import { connect } from 'react-redux';
import JobForm from '../components/job.form';

function mapStateToProps(state) {
  const { users } = state.Users;
  const { user } = state.session;
  return {
    users,
    user
  };
}

const connectedForm = connect(mapStateToProps)(JobForm);
export default connectedForm;
