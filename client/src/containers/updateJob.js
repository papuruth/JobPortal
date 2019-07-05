import UpdateJobForm from '../components/updateJobs'
import {connect} from 'react-redux'

function mapStateToProps (state) {
    const {editjobs} = state.editJob
       return {
           editjobs
    }
}

const connectedUpdateForm = connect(mapStateToProps)(UpdateJobForm);
export { connectedUpdateForm as UpdateJobForm }