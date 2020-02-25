import { connect } from 'react-redux';
import JobForm from '../components/job.form';

function mapStateToProps(state) {
  const { users } = state.Users;
  return {
    users
  };
}

const connectedForm = connect(mapStateToProps)(JobForm);
export default connectedForm;
