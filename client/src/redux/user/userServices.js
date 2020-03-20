import axios from 'axios';
import config from '../../config';

async function login(username, passwd) {
  const password = btoa(passwd);
  const response = await axios.post(`${config.nodeBaseUrl}/authenticate`, {
    username,
    password
  });
  return response;
}

async function logout() {
  const res = await axios.post(`${config.nodeBaseUrl}/logout`);
  return res;
}

async function register(fullname, email, password, phone, gender) {
  try {
    const passwd = btoa(password);
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
