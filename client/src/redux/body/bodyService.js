import axios from 'axios';
import config from '../../config';

async function getJobs(page) {
  const jobs = await axios.get(`${config.nodeBaseUrl}/jobs`, {
    params: {
      page,
    },
  });
  if (jobs.data) {
    return jobs.data;
  }
  return false;
}

const bodyService = {
  getJobs,
};

export default bodyService;
