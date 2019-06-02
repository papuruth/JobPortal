import axios from 'axios'

export const userService = {
  login,
  logout,
  register,
  getAllUsers
};

async function login(email, password) {
  password = btoa(password)
  return await axios.post('http://localhost:4000/authenticate', { email, password })
    .then(user => {
      const isLoggedIn = user.data.isLoggedIn
      if (isLoggedIn === true) {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.data.data));
        return user.data.data;
      }
      else {
        return 'Credential not valid'
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
