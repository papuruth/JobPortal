import axios from 'axios';
import config from '../../config';

async function updateProfile(id, data, emailId) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/upload`, data);
    const image = `/${response.data}`;
    let updatedData;
    await axios.put(`${config.nodeBaseUrl}/updateuser/`.concat(id), { image, emailId })
      .then(async () => {
        await axios.get(`${config.nodeBaseUrl}/getoneuser/`.concat(id))
          .then((user) => {
            if (user.data !== null) {
              localStorage.setItem('currentUser', JSON.stringify(user.data));
              updatedData = user.data;
            }
          });
      })
      .catch((err) => err);
    return updatedData;
  } catch (error) {
    return error;
  }
}

async function sendMail(fullname, email, subject, message) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/sendmail`, {
      fullname, email, subject, message,
    });
    return response.data.msg;
  } catch (error) {
    return error;
  }
}

const profileService = {
  updateProfile,
  sendMail,
};

export default profileService;
