import JobForm from '../components/job.form'
import {connect} from 'react-redux'

function mapStateToProps (state) {

       return {}
}

const connectedForm = connect(mapStateToProps)(JobForm);
export { connectedForm as JobForm }