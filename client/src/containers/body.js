import { connect } from 'react-redux';
import Body from '../components/body.component';

function mapStateToProps(state) {
  const { jobs, pager } = state.jobs;
  return {
    jobs,
    pager,
  };
}

const connectedBody = connect(mapStateToProps)(Body);

export default connectedBody;
