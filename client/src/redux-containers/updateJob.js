import { connect } from 'react-redux';
import UpdateJobForm from '../components/updateJobs';

function mapStateToProps(state) {
  const { editjobs } = state.editJob;
  const { user } = state.session;
  return {
    editjobs,
    user
  };
}

const connectedUpdateForm = connect(mapStateToProps)(UpdateJobForm);
export default connectedUpdateForm;
