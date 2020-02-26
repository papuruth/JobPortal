import axios from 'axios';
import config from '../../config';

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for fetching jobs updated for candidate
 * @async
 * @function getNotifications
 */
async function getNotifications() {
  try {
    const mails = await axios.get(`${config.nodeBaseUrl}/mails`);
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
