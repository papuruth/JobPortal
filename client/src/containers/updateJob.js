import { connect } from 'react-redux';
import UpdateJobForm from '../components/updateJobs';

function mapStateToProps(state) {
  const { editjobs } = state.editJob;
  return {
    editjobs,
  };
}

const connectedUpdateForm = connect(mapStateToProps)(UpdateJobForm);
export default connectedUpdateForm;
