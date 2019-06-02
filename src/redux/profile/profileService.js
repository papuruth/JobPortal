import axios from 'axios'

export const profileService = {
  updateProfile,
  sendMail
};

async function updateProfile(id, data, emailId) {
  return await axios.post('http://localhost:4000/upload', data)
    .then(async (response) => {
      const url = '/' + response.data
      const image = url
      var updatedData;
      await axios.put('http://localhost:4000/updateuser/'.concat(id), { image, emailId })
        .then(async (res) => {
          await axios.get('http://localhost:4000/getoneuser/'.concat(id))
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
  return await axios.post('http://localhost:4000/sendmail', { fullname, email, subject, message })
    .then((response) => {
      return response.data.msg;
    })
    .catch((error) => {
      return error
    })
}