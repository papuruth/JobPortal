import JobForm from '../components/job.form'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const { users } = state.Users;
  return {
    users
  }
}

const connectedForm = connect(mapStateToProps)(JobForm);
export { connectedForm as JobForm }