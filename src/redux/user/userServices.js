import axios from 'axios'

export const userService = {
  login,
  logout,
  register,
  getAllUsers,
  editUser,
  deleteUser,
  banUser,
  // promoteUser
};

async function login(email, password) {
  password = btoa(password)
  return await axios.post('http://localhost:4000/authenticate', { email, password })
    .then(user => {
      const isLoggedIn = user.data.status
      if (isLoggedIn === true) {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.data.data));
        return user.data.data;
      }
      else {
        return isLoggedIn;
      }
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  return true;
}

async function register(fullname, email, password, phone, gender) {
  return await axios.post('http://localhost:4000/register', {fullname, email, password, phone, gender})
      .then((res) => {
        console.log(res.data)
        const isSignup = res.data.isSignup;
        if(isSignup === true) {
          return res.data
        } else {
          return 'User exists'
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
}

async function getAllUsers() {
  return await axios.get('http://localhost:4000/users')
      .then((res) => {
        return res.data.reverse();
      })
      .catch((err) => {
        console.log(err.message);
      });
}

async function editUser(name, emailId, password, phone, _id) {
  return await axios.put('http://localhost:4000/updateuser/'.concat(_id), {name, emailId, password, phone})
      .then((res) => {
        if (res.data.status === true) {
          return true;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
}

async function deleteUser(_id) {
  return await axios.delete('http://localhost:4000/deleteuser/'.concat(_id))
      .then((res) => {
        if (res.data.status === true) {
          return true;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
}

async function banUser(_id, userStatus) {
  return await axios.put('http://localhost:4000/updateuser/'.concat(_id), {userStatus})
      .then((res) => {
        return res.data.status;
      })
      .catch((err) => {
        console.log(err.message);
      });
}
