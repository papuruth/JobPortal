import { connect } from 'react-redux';
import Card from '../components/card.component';

function mapStateToProps(state) {
  const { appliedjobs } = state.getAppliedJobs;
  const { apply } = state.applyJob;
  const { loaderStatus } = state.loaderReducer;
  const { user, authenticated } = state.session;
  return {
    appliedjobs,
    apply,
    loaderStatus,
    user,
    authenticated
  };
}

const connectedCard = connect(mapStateToProps)(Card);

export default connectedCard;
