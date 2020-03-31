import axios from 'axios';
import config from '../../config';

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for fetching jobs updated for candidate
 * @async
 * @function getNotifications
 */
async function getNotifications(name) {
  try {
    const mails = await axios.get(`${config.nodeBaseUrl}/api/v1/mails`, {
      params: {
        name
      }
    });
    localStorage.setItem('mails', JSON.stringify(mails.data));
    return mails.data;
  } catch (error) {
    return error.message;
  }
}

const notifService = {
  getNotifications
};

export default notifService;
