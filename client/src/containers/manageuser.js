import ManageUser from "../components/manageuser.component";
import { connect } from 'react-redux'

function mapStateToProps (state) {
    const {users} = state.Users
    return {
        users
    }
}
const connectedManageUser = connect(mapStateToProps)(ManageUser);
export {
    connectedManageUser as ManageUser
}