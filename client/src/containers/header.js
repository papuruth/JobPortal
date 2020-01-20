import { connect } from 'react-redux';
import Header from '../components/Header/header.component';

function mapStateToProps(state) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const mails = JSON.parse(localStorage.getItem('mails')) || state.updateStatus;
  const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'));
  return {
    currentUser,
    mails,
    appliedjobs,
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;
