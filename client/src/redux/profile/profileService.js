import axios from 'axios';
import { sessionService } from 'redux-react-session';
import config from '../../config';

async function updateProfile(id, data, emailId) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/api/v1/upload`, data);
    const image = `/${response.data}`;
    let updatedData;
    await axios
      .put(`${config.nodeBaseUrl}/api/v1/updateuser/`.concat(id), { image, emailId })
      .then(async () => {
        await axios
          .get(`${config.nodeBaseUrl}/api/v1/getoneuser/`.concat(id))
          .then(async (user) => {
            if (user.data !== null) {
              await sessionService.saveUser(user.data);
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
    const response = await axios.post(`${config.nodeBaseUrl}/api/v1/sendmail`, {
      fullname,
      email,
      subject,
      message
    });
    return response.data.msg;
  } catch (error) {
    return error;
  }
}

const profileService = {
  updateProfile,
  sendMail
};

export default profileService;
