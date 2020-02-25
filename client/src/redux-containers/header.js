import { connect } from 'react-redux';
import Header from '../components/Header/header.component';

function mapStateToProps(state) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return {
    currentUser
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;
