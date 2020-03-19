import { connect } from 'react-redux';
import Header from '../components/Header/header.component';

const mapStateToProps= ({ session }) => ({
  currentUser: session.user,
  checked: session.checked,
  authenticated: session.authenticated
});

const connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;
