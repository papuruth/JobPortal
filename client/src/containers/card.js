import { connect } from 'react-redux';
import Card from '../components/card.component';

function mapStateToProps(state) {
  const { appliedjobs } = state.getAppliedJobs;
  const { apply } = state.applyJob
  return {
    appliedjobs,
    apply
  };
}

const connectedCard = connect(mapStateToProps)(Card);

export default connectedCard;
