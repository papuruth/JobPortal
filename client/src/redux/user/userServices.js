import axios from 'axios';
import config from '../../config';
import history from '../../_helpers/history';

async function login(email, password) {
  const passwd = btoa(password);
  const user = await axios.post(`${config.nodeBaseUrl}/authenticate`, {
    email,
    passwd
  });
  const isLoggedIn = user.data.status;
  if (isLoggedIn) {
    // store user details in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user.data.data));
    return user.data.data;
  }
  return isLoggedIn;
}

const logout = () =>
  new Promise((resolve, reject) => {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    resolve(true);
    history.push('/')
  });

async function register(fullname, email, password, phone, gender) {
  try {
    const passwd = btoa(password)
    const res = await axios.post(`${config.nodeBaseUrl}/register`, {
      fullname,
      email,
      passwd,
      phone,
      gender
    });
    const { isSignup } = res.data;
    if (isSignup === true) {
      return res.data;
    }
    return 'User exists';
  } catch (err) {
    return err.message;
  }
}

async function getAllUsers(user = null) {
  try {
    const res = await axios.get(`${config.nodeBaseUrl}/users`, {
      params: {
        user
      }
    });
    return res.data.reverse();
  } catch (err) {
    return err.message;
  }
}

async function editUser(name, emailId, password, phone, _id) {
  try {
    const res = await axios.put(
      `${config.nodeBaseUrl}/updateuser/`.concat(_id),
      {
        name,
        emailId,
        password,
        phone
      }
    );
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return err.message;
  }
}

async function deleteUser(_id) {
  try {
    const res = await axios.delete(
      `${config.nodeBaseUrl}/deleteuser/`.concat(_id)
    );
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return err.message;
  }
}

async function banUser(_id, userStatus) {
  try {
    const res = await axios.put(
      `${config.nodeBaseUrl}/updateuser/`.concat(_id),
      { userStatus }
    );
    return res.data.status;
  } catch (err) {
    return err.message;
  }
}

const userService = {
  login,
  logout,
  register,
  getAllUsers,
  editUser,
  deleteUser,
  banUser
};

export default userService;
