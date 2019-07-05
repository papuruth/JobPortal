import { connect } from 'react-redux'
import AppliedList from '../components/appliedList'
function mapStateToProps(state) {
    const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'))
    const { mails } = state.updateStatus
    return {
        appliedjobs,
        mails
    };
}

const connectedApplied = connect(mapStateToProps)(AppliedList);
export { connectedApplied as AppliedList }; 