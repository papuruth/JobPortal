import {connect} from 'react-redux'
import Header from '../components/header.component'
function mapStateToProps(state) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const mails = JSON.parse(localStorage.getItem('mails')) || state.updateStatus
    const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'))
    return {
        currentUser,
        mails,
        appliedjobs
    };
  }
  
  const connectedHeader = connect(mapStateToProps)(Header);
  export { connectedHeader as Header }; 