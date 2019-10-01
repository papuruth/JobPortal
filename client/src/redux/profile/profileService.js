import axios from 'axios'

export const profileService = {
  updateProfile,
  sendMail
};

async function updateProfile(id, data, emailId) {
  return await axios.post('https://jobportalmern.herokuapp.com/upload', data)
    .then(async (response) => {
      const imageUrl = '/' + response.data
      var updatedData;
      await axios.put('https://jobportalmern.herokuapp.com/updateuser/'.concat(id), { imageUrl, emailId })
        .then(async (res) => {
          await axios.get('https://jobportalmern.herokuapp.com/getoneuser/'.concat(id))
            .then((user) => {
              if (user.data !== null) {
                localStorage.setItem('currentUser', JSON.stringify(user.data))
                updatedData = user.data;
              }
            })
        })
        .catch((err) => {
          return err;
        });
      return updatedData;
    })
    .catch((error) => {
      return error
    })
}

async function sendMail(fullname, email, subject, message) {
  return await axios.post('https://jobportalmern.herokuapp.com/sendmail', { fullname, email, subject, message })
    .then((response) => {
      return response.data.msg;
    })
    .catch((error) => {
      return error
    })
}